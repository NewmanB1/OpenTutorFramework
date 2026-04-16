OpenTutor Runtime Composition Engine Specification — RUNTIME_COMPOSITION_ENGINE_SPEC_v1.1.md

Version: 1.1
Date: April 16, 2026
Status: Normative / Implementation-Ready

References:

SYSTEM_SPEC_v1.2.md
PLUGIN_SPEC_v1.2.md
1. Purpose

The Runtime Composition Engine is the deterministic execution kernel of OpenTutor.

It is responsible for:

Plugin discovery and validation
Deterministic execution ordering
Multi-stage prompt construction
Structured conflict resolution
State merging and persistence
Resource enforcement
Fully reproducible inference execution
Core Guarantee

Given identical inputs, active plugins, and system state → the engine produces identical prompts and identical outputs.

2. Core Architecture Model

The engine operates as a multi-stage deterministic transformation pipeline:

Plugin Set → Ordering Engine → Prompt Assembly → Inference → Postprocess → State Merge → Output

No stage introduces randomness.

3. Plugin Loading Phase
Steps:
Scan plugin directories
Parse manifest.json
Validate via PLUGIN_SPEC validator
Reject invalid plugins immediately
Build dependency graph
Resolve dependencies deterministically
Filter by hardware constraints
Produce Active Plugin Set
4. Deterministic Execution Ordering (FINAL SPEC)
4.1 Stage Order (fixed)
SYSTEM
ACCESSIBILITY
PEDAGOGY
SUBJECT
CREATIVE
UI
4.2 Sorting Within Each Stage

Within each group:

sort by:
1. priority (descending)
2. execution_mode order: preprocess → inline → postprocess
3. plugin_id (ascending lexical)
4.3 Final Execution Order Algorithm
function buildExecutionOrder(plugins):

    grouped = groupByType(plugins)

    for group in grouped:
        sort(group,
            key = (-priority, execution_mode_rank, plugin_id)
        )

    ordered = concatenateInFixedStageOrder(grouped)

    // System override rule
    system = filter(type == "system")
    nonSystem = filter(type != "system")

    return system + nonSystem
5. Execution Modes (STRICT DEFINITION)
Mode	Behavior
preprocess	modifies prompt before base construction
inline	injects instructions immediately before user input
postprocess	modifies model output deterministically
6. Prompt Assembly Pipeline (FULL SPEC)
6.1 Preprocess Phase

For each plugin where execution_mode = preprocess:

output_fragment = on_prompt(state)

Rules:

Must return string only
Must not access raw model output
Must be deterministic
6.2 Base Prompt Construction (ORDERED)

Final system prompt is built in this exact sequence:

[1] Core System Header
[2] Preprocess fragments (ordered execution list)
[3] Pedagogy system_prompt blocks
[4] Subject system_prompt blocks
[5] Knowledge bundles (YAML only)
[6] Accessibility constraints
[7] Condensed student state
6.3 Inline Phase

For each plugin where execution_mode = inline:

inline_fragment = on_prompt(state)

Insertion point:

Immediately before the last user message

Rules:

Cannot modify system header
Cannot rewrite previous assistant output
Cannot access post-inference output
6.4 Final Prompt Structure
SYSTEM HEADER
PREPROCESS OUTPUTS
PEDAGOGY PROMPTS
SUBJECT PROMPTS
KNOWLEDGE YAML
ACCESSIBILITY RULES
STATE SUMMARY
---
INLINE OUTPUTS
USER MESSAGE
7. Token Budgeting & Context Control (FULL SPEC)
7.1 Token Accounting Rules

Token usage includes:

system header
all preprocess output
all system/pedagogy prompts
knowledge bundles
inline outputs
user message
7.2 Budget Enforcement Hierarchy

If over budget:

Trim Knowledge Bundles first
Trim Creative modules
Trim lowest priority subject plugins
Preserve pedagogy plugins last
Never trim system plugins
7.3 Plugin-Level Constraint

Each plugin MUST satisfy:

context_used <= context_budget

Violations → plugin excluded from execution

8. Inference Execution
Model selected based on supported_models
Prompt is frozen (no mutation allowed after this point)
Deterministic inference mode required (no sampling randomness)
9. Postprocess Pipeline (FULL SPEC)

Executed in same order as execution list.

Each plugin receives:

postprocess(output)
Allowed operations:
append(text)
prepend(text)
replace_tag(tag, content)
Forbidden operations:
arbitrary string mutation
uncontrolled rewriting of full output
access to hidden system state
9.1 Tagging System (NEW — REQUIRED)

Output is structured with tags:

[EXPLANATION]
[HINT]
[ANSWER]
[CREATIVE]

Plugins may ONLY modify tagged sections.

9.2 Postprocess Merge Rule

Sequential deterministic pipeline:

output = f1(output)
output = f2(output)
...
output = fn(output)

Where f1..fn are ordered plugins.

10. State Model (FULL RESOLUTION SPEC)
10.1 Student State Merge Rules (NEW)

Field-level merge semantics:

Field	Merge Rule
knowledge_map	union + overwrite by recency
confusion_level	max(current, new)
engagement	weighted average
retention_signal	exponential decay average
history	append-only
10.2 Session State
owned by runtime
updated after every turn
never directly mutated by plugins
10.3 Plugin State
isolated per plugin
scoped by state_scope
persisted encrypted after each turn
11. Inline Plugin Scope Rules (CLARIFIED)

Inline plugins MAY:

inject instructions
influence formatting
suggest tool usage

Inline plugins MAY NOT:

modify prior assistant output
mutate system prompt
override other plugin outputs
access postprocess state
12. MeshSync Integration Rules

MeshSync artifacts are injected only after inference.

Constraints:
read-only during inference
validated before plugin access
must pass trust model
13. Conflict Resolution System (FULL SPEC — NEW)
13.1 Conflict Types
prompt conflict
state conflict
output conflict
13.2 Resolution Hierarchy
System plugin overrides all
Higher priority wins
Execution stage precedence
Deterministic plugin_id ordering
13.3 Merge Strategy by Type
Type	Strategy
prompts	override
knowledge	merge union
state	field-level rules
output	sequential composition
14. Resource Enforcement (HARD RULES)

At runtime:

Enforce latency_budget_ms per plugin
Kill plugin if exceeded
Monitor RAM continuously
Unload lowest priority plugins if needed
Reject invalid memory usage immediately
15. Determinism Guarantees (STRICT)

System guarantees:

No randomness in ordering
No stochastic tie-breaking
No nondeterministic plugin execution
No floating-point branching differences affecting ordering
Tie-breakers:
plugin priority
execution stage
plugin_id lexical order
16. Failure Mode Handling (NEW)

If plugin fails:

log failure
remove plugin from execution set
continue pipeline
fallback to next valid plugin
never halt system
17. Acceptance Criteria

System is valid only if:

17.1 Determinism Tests
100 identical runs → identical outputs
17.2 Ordering Tests
20+ plugin permutations produce stable ordering
17.3 Stress Tests
runs on 2GB RAM device without crash
17.4 Failure Injection Tests
plugin crash does not crash runtime
17.5 Token Budget Tests
never exceeds smallest active plugin constraint
END OF SPEC v1.1
