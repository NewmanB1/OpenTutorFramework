import os
import re
import sys

# Constants
ROOT_DIR = "."
STATUS_FILE = "docs/IMPLEMENTATION_STATUS.md"
# Folders to scan for references
SOURCE_DIRS = ["docs", "plugins", "scripts", "src"]
# Files to scan for references
TOP_LEVEL_FILES = ["README.md", "ARCHITECTURE.md", "PLUGINS.md", "CONTRIBUTING.md"]

def get_actual_files():
    """Builds a set of all real files currently on the disk."""
    actual = set()
    for root, _, files in os.walk(ROOT_DIR):
        if ".git" in root or "node_modules" in root:
            continue
        for f in files:
            full_path = os.path.normpath(os.path.join(root, f))
            actual.add(full_path)
    return actual

def get_documented_references():
    """Uses Regex to find all file-like strings mentioned in the documentation."""
    refs = set()
    # Pattern looks for paths ending in common extensions like .md, .json, .txt, .js, .py
    pattern = re.compile(r'([a-zA-Z0-9_\-/]+\.(?:md|json|txt|js|py|jsx|tx))')
    
    files_to_scan = [os.path.join(ROOT_DIR, f) for f in TOP_LEVEL_FILES]
    for d in SOURCE_DIRS:
        for root, _, files in os.walk(os.path.join(ROOT_DIR, d)):
            for f in files:
                files_to_scan.append(os.path.join(root, f))

    for file_path in files_to_scan:
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                matches = pattern.findall(content)
                for match in matches:
                    # Clean up the path and normalize it
                    normalized = os.path.normpath(match)
                    # We only care about internal project links (containing a slash)
                    if "/" in normalized or "\\" in normalized:
                        refs.add(normalized)
    return refs

def main():
    print("🔍 Starting Python Linkage Audit...")
    
    actual_on_disk = get_actual_files()
    documented_refs = get_documented_references()
    
    # Check 1: Dead Links (References that point to files that don't exist)
    dead_links = []
    for ref in documented_refs:
        if ref not in actual_on_disk:
            # Check if it's a relative path starting from project root
            if not os.path.exists(ref):
                dead_links.append(ref)

    # Check 2: Implementation Status Presence
    # Ensure every .md file in docs/ is mentioned in IMPLEMENTATION_STATUS.md
    with open(STATUS_FILE, "r") as f:
        status_content = f.read()
    
    status_drift = []
    for root, _, files in os.walk("docs"):
        for f in files:
            if f.endswith(".md") and f != "IMPLEMENTATION_STATUS.md":
                path_to_check = os.path.join("docs", f)
                if path_to_check not in status_content:
                    status_drift.append(path_to_check)

    # Reporting
    error_found = False
    
    if dead_links:
        print("\n❌ DEAD LINKS DETECTED (References to missing files):")
        for link in sorted(dead_links):
            print(f"  - {link}")
        error_found = True

    if status_drift:
        print("\n❌ STATUS DRIFT (Files in docs/ missing from IMPLEMENTATION_STATUS.md):")
        for item in sorted(status_drift):
            print(f"  - {item}")
        error_found = True

    if not error_found:
        print("\n✅ Linkage audit passed. All references valid.")
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
