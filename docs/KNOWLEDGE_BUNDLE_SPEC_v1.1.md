# knowledge bundle spec

Version: 1.1
Date: April 16, 2026
Status: Normative / Implementation-Ready

References:

SYSTEM_SPEC_v1.2.md
PLUGIN_SPEC_v1.2.md
RUNTIME_COMPOSITION_ENGINE_SPEC_v1.1.md
1. Purpose

A Knowledge Bundle is a pure, static content module (plugin type: "bundle") that provides:

factual knowledge
examples
vocabulary
hint chains
datasets

It contains NO pedagogy, NO teaching logic, and NO prompt instructions.

Core Rule

Knowledge Bundles are the only source of factual truth in OpenTutor.

All other plugin types MUST reference bundles instead of duplicating facts.

2. Plugin Type Declaration

In manifest.json:

{
  "type": "bundle",
  "id": "com.opentutor.bundle.math.algebra.grade6.facts.v1",
  "name": "Grade 6 Algebra Core Facts",
  "version": "1.0.0",
  "versioning_policy": "semver",
  "bundle_scope": "global | grade | subject",
  "subject_compatibility": ["math"],
  "pedagogy_compatibility": ["socratic", "scaffolded", "mastery"],
  "context_budget": 800,
  "min_ram_mb": 400,
  "dependency_resolution": "deterministic-latest-compatible"
}
3. Directory Structure (MUST)
bundle-id/
├── manifest.json
├── content/
│   ├── facts.yaml
│   ├── examples/
│   │   ├── examples.yaml
│   │   └── word_problems.yaml
│   ├── hints/
│   │   ├── hint_chains.yaml
│   │   └── misconceptions.yaml
│   └── assets/          ← OPTIONAL (<5MB total)
├── examples/
│   └── sample_references.json
├── validation_schema.json
└── README.md
4. Core File: facts.yaml (MANDATORY)
4.1 Schema Rules
MUST be valid YAML
MUST be machine-parseable
MUST contain atomic facts only
MUST NOT contain pedagogy language
4.2 Format Specification
bundle_id: "com.opentutor.bundle.math.algebra.grade6.facts.v1"
version: "1.0.0"
subject: "math"
topic: "Algebra Basics"
grade_range: "6"
last_updated: "2026-04-01"
4.3 Facts Section (ATOMIC TRUTH UNITS)
facts:
  - id: "ab-001"
    concept: "Variable"
    statement: "A variable is a symbol that represents an unknown value."
    definition: "Used in algebra to represent unknown or changing values."
    examples: ["x", "y", "n"]

  - id: "ab-002"
    concept: "Equation"
    statement: "An equation is a statement that two expressions are equal."
    definition: "Equations always include an equals sign (=)."
    examples: ["x + 5 = 12", "3y = 15"]
RULES:
Each fact MUST have a unique id
Facts MUST be independent (no narrative chaining)
Facts MUST be verifiable
No instructional language allowed
4.4 Concepts Section
concepts:
  solving_one_step_equations:
    description: "Isolating variables using inverse operations"
    steps:
      - "Identify operation applied to variable"
      - "Apply inverse operation to both sides"
      - "Simplify result"
    common_errors:
      - "Only modifying one side of equation"
      - "Incorrect inverse operation choice"
RULES:
Steps are procedural descriptions ONLY (not tutoring instructions)
No “ask the student”, “explain”, or pedagogical framing allowed
4.5 Vocabulary Section
vocabulary:
  - term: "Expression"
    definition: "A combination of numbers and variables without an equals sign."
  - term: "Constant"
    definition: "A value that does not change."
4.6 Datasets (OPTIONAL)
datasets:
  practice_problems:
    - id: "p1"
      problem: "x + 7 = 15"
      solution: "x = 8"
      difficulty: "easy"
RULES:
datasets are passive data ONLY
no instruction or pedagogy embedded
may be sampled or injected by runtime engine
5. Supporting Files
5.1 examples/examples.yaml
examples:
  - id: "ex-001"
    type: "worked_example"
    problem: "x + 5 = 12"
    steps:
      - "Subtract 5 from both sides"
      - "x = 7"
    explanation: "Inverse operation removes constant term"
    fact_links: ["ab-002"]
5.2 hints/hint_chains.yaml
hint_chains:
  - concept_id: "ab-002"
    chain:
      - level: 1
        hint: "What operation is being applied to the variable?"
      - level: 2
        hint: "What undoes this operation?"
      - level: 3
        hint: "Apply inverse operation to both sides"
      - level: 4
        hint: "x + 5 - 5 = 12 - 5"
      - level: 5
        hint: "x = 7"
RULES:
hints must be neutral (no teaching tone enforcement)
no motivational language
no references to student state
5.3 assets/

Rules:

SVG preferred
PNG allowed
MAX SIZE: 5MB total per bundle
MUST be referenced explicitly in YAML
6. Dependency & Version Resolution (NEW — CRITICAL)
6.1 Dependency Declaration

Bundles are referenced in plugin manifests:

"dependencies": [
  "com.opentutor.bundle.math.algebra.grade6.facts"
]
6.2 Version Conflict Rule (DETERMINISTIC)

If multiple versions exist:

Resolution order:
Exact version match (highest priority)
Latest compatible semver patch
Latest minor version
Lexical highest bundle_id (final tie-breaker)
6.3 Bundle Scope Filtering
bundle_scope:
  - global
  - subject
  - grade

Rules:

grade-specific overrides subject/global
more specific scope always wins
7. Runtime Injection Semantics (FULL SPEC)

During composition:

Engine loads all dependent bundles
Deduplicates facts by fact.id
Merges in deterministic order:
global → subject → grade → plugin-specific overrides
Converts into structured YAML block:
[KNOWLEDGE_BUNDLE]
...
[/KNOWLEDGE_BUNDLE]
Conflict Resolution (NEW)

If same concept appears in multiple bundles:

Conflict Type	Resolution
facts	newest version wins
vocabulary	union merge
concepts	namespace merge
datasets	append-only
8. Validation Rules (STRICT)

A Knowledge Bundle is VALID only if:

Structure:
type == "bundle"
facts.yaml exists and parses
validation_schema.json exists
Content:
all fact IDs unique
no pedagogical language anywhere
no instructions or imperatives
no references to “student”, “teach”, “ask”, etc.
Resource limits:
assets ≤ 5MB
context_budget ≤ declared limit
9. Schema Validation System (NEW)

Each bundle MUST include optional:

validation_schema.json

Defines:

required fields
allowed types
constraints per section

Engine MUST reject invalid schema violations before runtime.

10. Dataset Usage Semantics (NEW)

Datasets are:

passive by default
optionally sampled by runtime engine
never directly instructive

Allowed uses:

practice generation
evaluation tasks
hint anchoring

Forbidden:

embedding instructions in dataset fields
behavioral guidance in datasets
11. Bundle Scope Model (NEW)

Bundles can be:

Scope	Meaning
global	universally applicable
subject	subject-specific
grade	grade-specific

Resolution priority:

grade > subject > global
12. Best Practices
Keep facts atomic
Avoid redundancy across facts
Use stable fact IDs across versions
Separate concepts cleanly
Keep hint chains concept-linked but pedagogy-neutral
Version independently from plugins
13. Acceptance Criteria

A bundle is valid only if:

passes schema validation
passes deterministic merge test
passes conflict resolution test
has ≥ 1 example per major concept
contains no pedagogical language
passes injection test in runtime engine
END OF SPEC v1.1
