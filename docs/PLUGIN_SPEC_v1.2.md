# plugin spec

Version: 1.2
Date: April 16, 2026
Status: Normative / Implementation-Ready

1. Purpose

Plugins are the only source of educational behavior in OpenTutor.

They define:

subject knowledge
pedagogy
accessibility behavior
creative learning systems
UI and interaction patterns

The core runtime performs only orchestration, execution, and validation.

2. Plugin Types (Expanded + Finalized)
Type	Purpose
Subject	Domain knowledge (math, science, history)
Pedagogy	Teaching behavior (Socratic, scaffolded, mastery-based)
Accessibility	Adaptive learning interfaces
Knowledge Bundle	Structured learning content
UI	Visual and interaction design
System	Runtime extensions (evaluation, MeshSync logic)
Creative	Rap Hero, Lesson Forge, Peer Gallery
3. Plugin Execution Model (NEW — CRITICAL)

Plugins are executed using a deterministic composition pipeline.

3.1 Execution Stages
System Plugins (highest priority)
Accessibility Layer
Pedagogy Layer
Subject Layer
Creative Layer
Post-process System Hooks
3.2 Execution Priority Rules

Each plugin MUST define:

"priority": 0–100
Resolution Rules:
Higher priority executes first
Equal priority → alphabetical plugin ID ordering
System plugins ALWAYS override non-system plugins
Conflicts resolved deterministically (no randomness allowed)
3.3 Execution Modes
"execution_mode": "preprocess | inline | postprocess"
preprocess → modifies input prompt
inline → participates in response generation
postprocess → modifies output after generation
4. Plugin Manifest (STRICT CONTRACT)

Each plugin MUST define:

{
  "id": "string (reverse-domain unique identifier)",
  "name": "string",
  "version": "semver",
  "type": "subject | pedagogy | accessibility | bundle | ui | system | creative",
  "description": "string",
  "author": "string",
  "license": "Apache-2.0",

  "supported_models": ["1B", "1.5B", "2B", "3B"],
  "context_budget": 800-1500,
  "min_ram_mb": integer,

  "priority": integer,

  "execution_mode": "preprocess | inline | postprocess",
  "state_scope": "global | session | local",
  "latency_budget_ms": integer,

  "entry_points": {
    "system_prompt": "path",
    "interaction_prompt": "path"
  },

  "dependencies": ["plugin-id"],
  "pedagogy_compatibility": [],
  "subject_compatibility": [],

  "evaluation_enabled": true | false,
  "mesh_sync_enabled": true | false,
  "creative_output_types": []
}
5. Plugin Directory Structure (FINAL STANDARD)
plugin-id/
├── manifest.json
├── prompts/
│   ├── system.txt
│   ├── interaction.txt
├── content/
│   ├── facts.yaml
│   ├── examples/
│   ├── hints/
├── examples/
│   ├── sample_interactions.json
├── creative/
├── evaluation/
├── mesh_sync/
└── README.md
6. Layer Separation Rules (ENFORCED)
Content Layer
facts
datasets
examples
hint chains
Pedagogy Layer
teaching strategy rules
interaction shaping logic
Interaction Layer
prompt templates
runtime behavior instructions
Rule:

No layer may directly redefine another layer’s responsibility.

7. State Model Requirements (NEW — CRITICAL)

Plugins MUST operate on standardized state objects.

7.1 Student State
{
  "knowledge_map": {},
  "confusion_level": 0.0,
  "engagement": 0.0,
  "retention_signal": 0.0,
  "history": []
}
7.2 Session State
{
  "active_plugins": [],
  "context_used": 0,
  "turn_count": 0
}
7.3 Plugin State
{
  "plugin_id": "",
  "runtime_vars": {}
}
8. Runtime Lifecycle (DETERMINISTIC)

All plugins MUST implement:

on_load(state)
on_prompt(student_state, session_state)
on_response(output)
on_evaluation(metrics)
on_mesh_sync(artifact)
on_unload()
Constraint:
No hook may block runtime > 200ms
9. MeshSync Specification (REVISED)
9.1 Transport Constraints
Bluetooth / Nearby Connections only
Max payload: 150 KB compressed
9.2 Artifact Schema
{
  "artifact_id": "string",
  "author_type": "teacher | student | system",
  "signed": true | false,
  "version": "semver",
  "content_type": "hint | lesson | prompt_chain | rap",
  "plugin_origin": "plugin-id"
}
9.3 Trust Model (CRITICAL ADDITION)
signed = true → verified teacher/system origin
signed = false → untrusted community content
unsigned artifacts:
allowed in sandbox mode
cannot modify system plugins
cannot override pedagogy behavior
9.4 Conflict Resolution (DETERMINISTIC)

If artifacts conflict:

Higher semantic version wins
If equal version → signed wins
If equal trust → deterministic ID ordering
9.5 Update Rules
Offline-only merge
No automatic overwrite
Version history retained locally
Rollback supported
10. Evaluation System (EXPANDED)

Plugins MAY emit:

{
  "engagement": 0.0-1.0,
  "confusion": 0.0-1.0,
  "success_rate": 0.0-1.0,
  "retention_signal": 0.0-1.0,
  "time_spent_seconds": 0
}
Constraint:

All evaluation data is:

local-only
non-transmitted by default
11. Performance Constraints (STRICT)

Plugins MUST:

respect context_budget
stay within min_ram_mb
obey latency_budget_ms
avoid blocking execution pipeline

Plugins SHOULD:

be stateless where possible
reuse prompts efficiently
minimize memory footprint
12. Versioning Rules
Semantic versioning REQUIRED
MAJOR: breaking changes
MINOR: new features
PATCH: fixes only
Compatibility Rule:
runtime supports ≥2 major plugin versions
13. Validation System (NEW — CRITICAL)

A plugin is INVALID unless it passes:

13.1 Structural Validation
manifest schema validation
required fields present
valid version format
13.2 Runtime Validation
no missing entry points
execution modes valid
dependencies resolvable
13.3 Resource Validation
context_budget within limits
min_ram_mb realistic
no asset overflow (>5MB per asset bundle)
13.4 MeshSync Validation (if enabled)
artifact schema compliance
size limits enforced
trust metadata present
14. Required Test Coverage (NEW)

Each plugin MUST include:

≥3 sample interactions
at least 1 failure case example
at least 1 degraded/low-resource behavior example
15. Contribution Requirements

All plugins MUST:

be licensed Apache-2.0 or compatible
include README.md with:
grade level
dependencies
pedagogy type
hardware notes
16. Acceptance Criteria (FINAL)

A plugin is valid if:

Functional
loads without runtime errors
executes deterministically under composition
respects plugin priority rules
Performance
meets latency_budget_ms
operates within RAM constraints
Structural
passes full validator suite
conforms to directory spec
Educational
includes example interactions
demonstrates pedagogical intent
END OF SPEC v1.2
