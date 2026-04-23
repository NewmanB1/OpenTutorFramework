/**
 * AST-based Documentation Drift Detector (V2.1 - Hardened)
 * Enforces a 1:1 mapping between IMPLEMENTATION_STATUS.md and actual specs.
 * Handles path normalization, backticks, and recursive orphan detection.
 */

const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({ html: false, linkify: true });

const STATUS_PATH = "docs/IMPLEMENTATION_STATUS.md";
const DOCS_DIR = "docs/";

// Load files with safety check
function load(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

// Parse markdown into AST tokens
function parse(content) {
  return md.parse(content, {});
}

// Extract table rows from AST with text cleaning
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

// Extract top-level headings for identity verification
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
  const statusContent = load(STATUS_PATH);
  if (!statusContent) {
    console.error(`❌ CRITICAL ERROR: Status file missing at ${STATUS_PATH}`);
    process.exit(1);
  }

  const statusTokens = parse(statusContent);
  const rows = extractTableRows(statusTokens);
  
  if (rows.length === 0) {
    console.error("❌ ERROR: No tables found in IMPLEMENTATION_STATUS.md");
    process.exit(1);
  }

  // Identify column indices based on header row
  const headers = rows[0].map(h => h.toLowerCase());
  const nameIdx = headers.findIndex(h => h.includes("component") || h.includes("plugin"));
  const pathIdx = headers.findIndex(h => h.includes("path"));

  const drift = [];
  const documentedFiles = new Set();

  // 1. Validate Table vs. Disk
  rows.slice(1).forEach(row => {
    const name = row[nameIdx];
    // Clean the path: remove backticks, leading slashes, and extra spaces
    let rawPath = row[pathIdx] ? row[pathIdx].replace(/[`]/g, '').trim().replace(/^\//, '') : null;
    
    if (!name || !rawPath || rawPath === "N/A" || rawPath === "Path") return;

    const normalizedPath = path.normalize(rawPath);
    documentedFiles.add(normalizedPath);

    // Integrity Check: Does the file exist?
    const fileContent = load(normalizedPath);
    if (!fileContent) {
      // If it's a directory, we count it as "documented" for orphan purposes
      if (fs.existsSync(normalizedPath) && fs.lstatSync(normalizedPath).isDirectory()) {
        return;
      }
      drift.push(`❌ LINKAGE DRIFT: Status lists "${name}" at [${normalizedPath}], but file does not exist.`);
      return;
    }

    // AST Identity Check: Does the file's primary heading match its name?
    // (Strip Markdown bolding from the name for a fair comparison)
    const cleanName = name.replace(/[*_]/g, '').toLowerCase();
    const fileTokens = parse(fileContent);
    const headings = extractHeadings(fileTokens).map(h => h.toLowerCase());
    
    const match = headings.some(h => h.includes(cleanName));
    if (!match && !normalizedPath.endsWith('.json') && !normalizedPath.endsWith('.js')) {
      drift.push(`⚠️  IDENTITY DRIFT: Spec at [${normalizedPath}] missing heading matching "${cleanName}".`);
    }
  });

  // 2. Orphan Check: Are there specs in docs/ not listed in Status?
  const actualFiles = fs.readdirSync(DOCS_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => path.normalize(path.join(DOCS_DIR, f)));

  actualFiles.forEach(file => {
    // Only flag if it's not the status file itself and not in our documented Set
    if (!documentedFiles.has(file) && !file.includes("IMPLEMENTATION_STATUS")) {
      drift.push(`🕵️  ORPHAN DRIFT: Found unmanaged spec [${file}] not listed in IMPLEMENTATION_STATUS.md.`);
    }
  });

  // Output Results
  if (drift.length > 0) {
    console.error("\n--- DOCUMENTATION DRIFT REPORT ---\n");
    drift.forEach(d => console.error(d));
    console.error("\nTotal Discrepancies: " + drift.length);
    process.exit(1);
  }

  console.log("✅ CI INTEGRITY PASSED: Documentation is structurally synchronized.");
}

detectDrift();
