/**
 * AST-based Documentation Drift Detector
 * Uses markdown-it to parse Markdown into tokens
 * then analyzes structure instead of raw text matching.
 */

const fs = require("fs");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({ html: false, linkify: true });

const README_PATH = "README.md";
const PLUGINS_PATH = "PLUGINS.md";
const STATUS_PATH = "docs/IMPLEMENTATION_STATUS.md";

// Load files
function load(path) {
  return fs.readFileSync(path, "utf-8");
}

// Parse markdown into AST tokens
function parse(content) {
  return md.parse(content, {});
}

// Extract all text tokens from AST
function extractText(tokens) {
  const out = [];

  function walk(tokens) {
    for (const t of tokens) {
      if (t.type === "inline" && t.children) {
        for (const c of t.children) {
          if (c.type === "text") out.push(c.content);
        }
      }
      if (t.children) walk(t.children);
    }
  }

  walk(tokens);
  return out;
}

// Extract table rows (structured drift detection target)
function extractTableRows(tokens) {
  const rows = [];

  let currentRow = [];

  for (const t of tokens) {
    if (t.type === "tr_open") {
      currentRow = [];
    }

    if (t.type === "inline" && t.children) {
      const cellText = t.children
        .filter(c => c.type === "text")
        .map(c => c.content)
        .join(" ")
        .trim();

      if (cellText) currentRow.push(cellText);
    }

    if (t.type === "tr_close") {
      if (currentRow.length) rows.push(currentRow);
    }
  }

  return rows;
}

// Extract headings for structural comparison
function extractHeadings(tokens) {
  const headings = [];

  for (const t of tokens) {
    if (t.type === "heading_open") {
      const next = tokens[tokens.indexOf(t) + 1];
      if (next && next.type === "inline") {
        headings.push(
          next.children
            ?.filter(c => c.type === "text")
            .map(c => c.content)
            .join("")
        );
      }
    }
  }

  return headings;
}

// Extract known entities from status table (plugin names)
function extractPlugins(statusTokens) {
  const rows = extractTableRows(statusTokens);

  // Skip header row
  return rows
    .slice(1)
    .map(r => r[0])
    .filter(Boolean);
}

// Drift detection logic
function detectDrift() {
  const readme = parse(load(README_PATH));
  const plugins = parse(load(PLUGINS_PATH));
  const status = parse(load(STATUS_PATH));

  const statusPlugins = extractPlugins(status);

  const readmeText = extractText(readme).join(" ");
  const pluginsText = extractText(plugins).join(" ");

  const combinedDoc = readmeText + " " + pluginsText;

  const drift = [];

  for (const plugin of statusPlugins) {
    if (!combinedDoc.includes(plugin)) {
      drift.push(`Missing reference to STATUS plugin: ${plugin}`);
    }
  }

  if (drift.length > 0) {
    console.error("❌ DOCUMENTATION DRIFT DETECTED\n");
    console.error(drift.join("\n"));
    process.exit(1);
  }

  console.log("✅ No structural drift detected.");
}

detectDrift();
