import subprocess
import sys

changed_files = subprocess.check_output(
    ["git", "diff", "--name-only", "origin/main...HEAD"]
).decode().splitlines()

docs_changed = any(
    f in ["README.md", "PLUGINS.md"] or f.startswith("plugins/")
    for f in changed_files
)

status_changed = "docs/IMPLEMENTATION_STATUS.md" in changed_files

if docs_changed and not status_changed:
    print("ERROR: Documentation changed without updating IMPLEMENTATION_STATUS.md")
    sys.exit(1)

print("Status sync OK.")
