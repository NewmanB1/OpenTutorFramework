/**
 * AST-based Documentation Drift Detector (V2 - Structural Integrity)
 * Enforces a 1:1 mapping between IMPLEMENTATION_STATUS.md and actual specs.
 */

const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({ html: false, linkify: true });

const STATUS_PATH = "docs/IMPLEMENTATION_STATUS.md";
const DOCS_DIR = "docs/";

// Load files
function load(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

// Parse markdown into AST tokens
function parse(content) {
  return md.parse(content, {});
}

// Extract table rows from AST
function extractTableRows(tokens) {
  const rows = [];
  let currentRow = [];

  for (const t of tokens) {
    if (t.type === "tr_open") currentRow = [];
    if (t.type === "inline" && t.children) {
      const cellText = t.children
        .filter(c => c.type === "text")
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
  
  // Logic: Identify column indices based on header row
  const headers = rows[0].map(h => h.toLowerCase());
  const nameIdx = headers.indexOf("component") !== -1 ? headers.indexOf("component") : 0;
  const pathIdx = headers.indexOf("path") !== -1 ? headers.indexOf("path") : 1;

  const drift = [];
  const documentedFiles = new Set();

  // 1. Validate Table vs. Disk
  rows.slice(1).forEach(row => {
    const name = row[nameIdx];
    const relativePath = row[pathIdx];
    
    if (!name || !relativePath || relativePath === "N/A") return;

    documentedFiles.add(path.normalize(relativePath));

    // Integrity Check: Does the file exist?
    const fileContent = load(relativePath);
    if (!fileContent) {
      drift.push(`❌ LINKAGE DRIFT: Status lists "${name}" at [${relativePath}], but file does not exist.`);
      return;
    }

    // AST Identity Check: Does the file's primary heading match its name?
    const fileTokens = parse(fileContent);
    const headings = extractHeadings(fileTokens);
    const match = headings.some(h => h.toLowerCase().includes(name.toLowerCase()));
    
    if (!match) {
      drift.push(`⚠️  IDENTITY DRIFT: Spec at [${relativePath}] missing top-level heading matching "${name}".`);
    }
  });

  // 2. Orphan Check: Are there specs in docs/ not listed in Status?
  const actualFiles = fs.readdirSync(DOCS_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => path.normalize(path.join(DOCS_DIR, f)));

  actualFiles.forEach(file => {
    if (!documentedFiles.has(file) && !file.includes("IMPLEMENTATION_STATUS")) {
      drift.push(`🕵️  ORPHAN DRIFT: Found unmanaged spec [${file}] not listed in IMPLEMENTATION_STATUS.md.`);
    }
  });

  // Output Results
  if (drift.length > 0) {
    console.error("\n--- DOCUMENTATION DRIFT REPORT ---\n");
    drift.forEach(d => console.error(d));
    console.error("\nTotal Errors: " + drift.length);
    process.exit(1);
  }

  console.log("✅ CI INTEGRITY PASSED: Documentation is structurally synchronized.");
}

detectDrift();
