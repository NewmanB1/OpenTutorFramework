const fs = require("fs");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();

function parse(file) {
  return md.parse(fs.readFileSync(file, "utf-8"), {});
}

// Extract plugin table rows from IMPLEMENTATION_STATUS.md
function extractRows(tokens) {
  const rows = [];
  let current = [];

  for (const t of tokens) {
    if (t.type === "tr_open") current = [];

    if (t.type === "inline") {
      const text = t.children
        ?.filter(c => c.type === "text")
        .map(c => c.content)
        .join(" ")
        .trim();

      if (text) current.push(text);
    }

    if (t.type === "tr_close" && current.length) {
      rows.push(current);
    }
  }

  return rows;
}

const statusTokens = parse("docs/IMPLEMENTATION_STATUS.md");
const rows = extractRows(statusTokens);

// Convert to structured JSON
const plugins = rows.slice(1).map(r => ({
  name: r[0],
  path: r[1],
  status: r[2],
  coverage: r[3],
  commit: r[4],
  gaps: r[5],
  notes: r[6]
}));

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync(
  "dist/docs.snapshot.json",
  JSON.stringify({ plugins }, null, 2)
);

console.log("Documentation graph built.");
