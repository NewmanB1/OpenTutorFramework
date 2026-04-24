/**
 * AST-based Documentation Drift Detector (V2.2 - Crash-Proof)
 * Enforces a 1:1 mapping between IMPLEMENTATION_STATUS.md and actual specs.
 */

const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({ html: false, linkify: true });

const STATUS_PATH = "docs/IMPLEMENTATION_STATUS.md";
const DOCS_DIR = "docs/";

// Load files with safety check to prevent EISDIR
function load(filePath) {
  if (!fs.existsSync(filePath)) return null;
  // If it's a directory, return null to avoid crashing readFileSync
  if (fs.lstatSync(filePath).isDirectory()) return null;
  return fs.readFileSync(filePath, "utf-8");
}

function parse(content) {
  if (!content) return [];
  return md.parse(content, {});
}

function extractTableRows(tokens) {
  const rows = [];
  let currentRow = [];
  for (const t of tokens) {
    if (t.type === "tr_open") currentRow = [];
    if (t.type === "inline" && t.children) {
      const cellText = t.children
        .filter(c => c.type === "text" || c.type === "code_inline")
        .map(c => c.content)
        .join(" ")
        .trim();
      currentRow.push(cellText);
    }
    if (t.type === "tr_close" && currentRow.length) rows.push(currentRow);
  }
  return rows;
}

function extractHeadings(tokens) {
  const headings = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === "heading_open") {
      const next = tokens[i + 1];
      if (next && next.type === "inline") {
        headings.push(next.content.trim());
      }
    }
  }
  return headings;
}

function detectDrift() {
  const statusRaw = load(STATUS_PATH);
  if (!statusRaw) {
    console.error(`❌ CRITICAL ERROR: Status file missing at ${STATUS_PATH}`);
    process.exit(1);
  }

  const statusTokens = parse(statusRaw);
  const rows = extractTableRows(statusTokens);
  
  if (rows.length === 0) {
    console.error("❌ ERROR: No tables found in IMPLEMENTATION_STATUS.md");
    process.exit(1);
  }

  const headers = rows[0].map(h => h.toLowerCase());
  const nameIdx = headers.findIndex(h => h.includes("component") || h.includes("plugin"));
  const pathIdx = headers.findIndex(h => h.includes("path"));

  const drift = [];
  const documentedFiles = new Set();

  rows.slice(1).forEach(row => {
    const name = row[nameIdx];
    // Strip backticks and leading slashes for perfect matching
    let rawPath = row[pathIdx] ? row[pathIdx].replace(/[`]/g, '').trim().replace(/^\//, '') : null;
    
    if (!name || !rawPath || rawPath === "N/A" || rawPath === "Path") return;

    const normalizedPath = path.normalize(rawPath);
    documentedFiles.add(normalizedPath);

    if (!fs.existsSync(normalizedPath)) {
      drift.push(`❌ LINKAGE DRIFT: Status lists "${name}" at [${normalizedPath}], but it doesn't exist.`);
      return;
    }

    // Skip reading directories
    if (fs.lstatSync(normalizedPath).isDirectory()) return; 

    const fileContent = load(normalizedPath);
    if (fileContent) {
      const cleanName = name.replace(/[*_]/g, '').toLowerCase();
      const fileTokens = parse(fileContent);
      const headings = extractHeadings(fileTokens).map(h => h.toLowerCase());
      
      const match = headings.some(h => h.includes(cleanName));
      if (!match && !normalizedPath.endsWith('.json') && !normalizedPath.endsWith('.js')) {
        drift.push(`⚠️  IDENTITY DRIFT: Spec at [${normalizedPath}] missing heading matching "${cleanName}".`);
      }
    }
  });

  const actualFiles = fs.readdirSync(DOCS_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => path.normalize(path.join(DOCS_DIR, f)));

  actualFiles.forEach(file => {
    if (!documentedFiles.has(file) && !file.includes("IMPLEMENTATION_STATUS")) {
      drift.push(`🕵️  ORPHAN DRIFT: Found unmanaged spec [${file}] not listed in IMPLEMENTATION_STATUS.md.`);
    }
  });

  if (drift.length > 0) {
    console.error("\n--- DOCUMENTATION DRIFT REPORT ---\n");
    drift.forEach(d => console.error(d));
    console.error("\nTotal Discrepancies: " + drift.length);
    process.exit(1);
  }

  console.log("✅ CI INTEGRITY PASSED: Documentation is structurally synchronized.");
}

detectDrift();
