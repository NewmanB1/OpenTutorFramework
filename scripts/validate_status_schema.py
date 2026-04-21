import re
import sys

STATUS_VALUES = {
    "Not Started",
    "Prototype",
    "Partial",
    "Verified",
    "Production-Ready"
}

path = "docs/IMPLEMENTATION_STATUS.md"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

rows = re.findall(r"\|(.+?)\|(.+?)\|(.+?)\|", content)

errors = []

for row in rows:
    status = row[1].strip()

    if status not in STATUS_VALUES:
        errors.append(f"Invalid status: {status}")

if errors:
    print("\n".join(errors))
    sys.exit(1)

print("Status schema valid.")
