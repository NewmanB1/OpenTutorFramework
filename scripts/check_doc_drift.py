import sys

def load(file):
    with open(file, "r", encoding="utf-8") as f:
        return f.read()

readme = load("README.md")
plugins = load("PLUGINS.md")
status = load("docs/IMPLEMENTATION_STATUS.md")

# Simple drift heuristics
for keyword in ["Basic Math", "MeshSync", "Rap Hero", "Lesson Forge"]:
    if keyword in readme or keyword in plugins:
        if keyword not in status:
            print(f"Drift detected: {keyword} mentioned outside status file")
            sys.exit(1)

print("No obvious drift detected.")
