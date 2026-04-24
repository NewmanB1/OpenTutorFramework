# System Spec

Version: 1.2
Date: April 16, 2026
Status: Implementation-Ready Specification

1. System Overview

OpenTutor is an offline-first modular tutoring runtime that transforms low-resource Android devices (2019–2023) into private, Socratic learning systems.

The system core is strictly minimal and functions only as an orchestration engine. It contains:

No subject knowledge
No pedagogy logic
No educational content

All educational behavior is implemented exclusively through Portable Learning Modules (Plugins).

2. System Boundary Contract (CRITICAL)
Core Engine MAY:
Load plugins
Resolve plugin composition
Execute inference
Maintain session and learner state
Run evaluation hooks
Handle MeshSync transport
Core Engine MUST NOT:
Contain subject knowledge
Contain pedagogy logic
Ship with default curriculum
Override plugin-defined behavior
3. Design Principles vs Requirements
3.1 HARD SYSTEM REQUIREMENTS (ENFORCED)
Offline-first operation (no network dependency for runtime)
Privacy-by-default (no telemetry, no cloud sync)
Deterministic plugin execution rules
Strict resource budgets per plugin
Sandboxed plugin execution
Explicit conflict resolution rules
3.2 DESIGN PRINCIPLES (GUIDING)
Modular pedagogy composition
Composability across plugins
Human-readable plugin design
Low-resource optimization
Community extensibility
4. Plugin System Architecture

Plugins are Portable Learning Modules (PLMs).

4.1 Plugin Types
Type	Purpose
Subject	Knowledge domains
Pedagogy	Teaching behavior
Accessibility	Interaction adaptation
Knowledge Bundle	Static learning content
UI	Interface customization
System	Runtime extensions
Creative	Rap Hero, Lesson Forge, Peer Gallery
4.2 Plugin Execution Priority Model (NEW — REQUIRED)

Each plugin MUST define:

"priority": 0-100
Execution Rules:
Higher priority overrides lower priority
Equal priority → deterministic alphabetical ID ordering
System plugins execute BEFORE subject/pedagogy plugins
Pedagogy plugins execute BEFORE subject plugins (default stack order)
4.3 Plugin Composition Rules

When multiple plugins are active:

System plugins initialize first
Accessibility layer applies next
Pedagogy layer modifies interaction behavior
Subject layer supplies content domain
Creative modules augment output

If conflicts occur:

highest priority wins
otherwise deterministic ordering applies
5. Plugin Manifest (MANDATORY CONTRACT)

Every plugin MUST define:

{
  "id": "string",
  "name": "string",
  "version": "semver",
  "type": "subject | pedagogy | accessibility | bundle | ui | system | creative",
  "description": "string",
  "author": "string",
  "license": "Apache-2.0",

  "supported_models": ["1B", "1.5B", "2B", "3B"],
  "context_budget": 1200,
  "min_ram_mb": 800,

  "priority": 0,

  "execution_mode": "preprocess | inline | postprocess",

  "state_scope": "global | session | local",

  "latency_budget_ms": 200,

  "entry_points": {
    "system_prompt": "prompts/system.txt",
    "interaction_prompt": "prompts/interaction.txt"
  },

  "dependencies": [],
  "pedagogy_compatibility": [],
  "subject_compatibility": [],

  "evaluation_enabled": true,
  "mesh_sync_enabled": true,
  "creative_output_types": []
}
6. Plugin Directory Structure (STANDARDIZED)
plugin-id/
├── manifest.json
├── prompts/
│   ├── system.txt
│   ├── interaction.txt
├── content/
│   ├── facts.yaml
│   ├── hints/
│   ├── examples/
├── examples/
├── evaluation/
├── creative/
└── README.md
7. Plugin Layer Separation (ENFORCED)
Content Layer
facts
examples
datasets
hint chains
Pedagogy Layer
teaching strategy
cognitive scaffolding rules
Interaction Layer
prompt templates
runtime behavior rules
8. Runtime Lifecycle (DETERMINISTIC)

Plugins MUST implement:

on_load(state)
on_prompt(student_state, input)
on_response(output)
on_evaluation(metrics)
on_mesh_sync(artifact)
on_unload()
Execution Constraint:

No plugin may block runtime > 200ms.

9. State Model (CRITICAL ADDITION)
9.1 Student State
{
  "knowledge_level": {},
  "confusion_level": 0.0,
  "engagement": 0.0,
  "history": []
}
9.2 Session State
{
  "active_plugins": [],
  "context_window_used": 0,
  "interaction_count": 0
}
9.3 Plugin State
{
  "plugin_id": "",
  "version": "",
  "runtime_variables": {}
}
10. Inference Engine Requirements
Quantized models only (1B–3B)
Backends: llama.cpp, MLC LLM, ONNX Mobile, ExecuTorch
Context constrained by plugin budgets
Fallback Modes (NEW)

If model failure occurs:

Degrade to smaller model
Reduce context window
Switch to rule-based fallback responses
11. MeshSync — Offline Exchange Layer

Transport:

Bluetooth / Nearby Connections only

Max payload:

150 KB compressed
11.1 Artifact Schema
{
  "artifact_id": "",
  "author_type": "teacher | student | system",
  "signed": true,
  "version": "semver",
  "content_type": "hint | lesson | prompt_chain | rap"
}
11.2 Trust & Verification Model (NEW)
signed=true means teacher or system verified
unsigned artifacts are treated as “untrusted suggestions”
invalid signatures → artifact ignored but logged
11.3 Conflict Resolution (NEW)

If two artifacts conflict:

Higher version wins
If equal version → signed overrides unsigned
If equal trust → deterministic ID ordering
11.4 Update Propagation Rules (NEW)
Offline merge only
No automatic overwrite without version check
Rollback supported via version history stack
12. Evaluation System (ENHANCED)

Plugins MAY emit:

{
  "engagement": 0.0-1.0,
  "confusion": 0.0-1.0,
  "success_rate": 0.0-1.0,
  "retention_signal": 0.0-1.0,
  "time_spent_seconds": 0
}

Stored locally only.

13. Creative Learning Modules
Rap Hero
Converts content into rhythmic learning structures
Teacher-lockable outputs
Must preserve factual correctness
Lesson Forge

Structure:

Objective
Hook
Practice Question
Transfer Task
Creative Extension
Peer Gallery
Lightweight rating system
“useful / needs improvement”
No numeric scoring required
14. Performance Requirements
Android 10–14
2–6 GB RAM target
≤10% battery/hour active use
<10s cold start
<5s response latency
No OOM over 30 min sessions
15. Versioning & Compatibility
Semantic versioning required
Backward compatibility: ≥2 major versions
Deprecation policy:
plugins marked deprecated must remain runnable for 2 major core versions
Runtime MUST warn but not break on deprecated plugins
16. Security & Safety Model
Plugins sandboxed
No arbitrary code execution from MeshSync
Signed artifacts preferred in trusted channels
Content validation on load
17. Acceptance Criteria (NOW TESTABLE)

System is valid if:

Functional Tests
≥3 plugins load without conflict
Mixed pedagogy + subject composition works deterministically
MeshSync artifact merges correctly
Performance Tests
Cold start <10 seconds on reference device
Stable 30-minute session without crash or OOM
Evaluation Tests
Plugins emit valid evaluation schema
Metrics stored locally and retrievable
Compatibility Tests
Plugin v1.0 runs on runtime v1.2+
Deprecated plugin warning triggers correctly
18. Contribution Model
Educators → pedagogy + lesson structure plugins
Developers → runtime + system plugins
Testers → hardware validation + performance reports
19. System Intent

OpenTutor defines a:

Distributed offline runtime for modular pedagogy systems on constrained devices

It unifies:

offline AI inference
pedagogical plugin systems
modular learning architectures
community-driven educational design
END OF SPEC v1.2
