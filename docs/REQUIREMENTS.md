# requirements

This refined and completed specification builds directly on the provided v1 draft. It incorporates realistic constraints for running on recently discarded Android phones (2019–2023 models with 2–6 GB RAM, Android 10–14, mid-range Snapdragon/MediaTek/Exynos SoCs), current 2026 on-device LLM capabilities (1B–3B quantized models), and strict offline/privacy goals. All requirements are verifiable, traceable, and prioritized as MUST (core, non-negotiable), SHOULD (strongly recommended), or MAY (optional for future extensions).
1. System Overview
OpenTutor is a minimal, offline-first runtime that turns low-resource discarded Android phones into private, Socratic K–12 tutoring devices. The core engine contains no educational content, no subject knowledge, and no hardcoded teaching logic — it only loads, composes, and executes plugins (Portable Learning Modules — PLMs).
Core Principle (MUST):
The runtime is a thin orchestration layer: plugin loader + inference coordinator + state manager + MeshSync handler + evaluation aggregator.
2. Design Principles (All Components MUST Adhere)

Offline-First (MUST): Zero internet required for tutoring, inference, or plugin execution. Initial plugin loading via USB sideloading or one-time Wi-Fi is allowed.
Privacy by Default (MUST): No telemetry, no external calls, no user data transmission. All storage encrypted at rest (SQLCipher or equivalent).
Low-Resource Execution (MUST): Target hardware = discarded 2019–2023 phones (2–6 GB total RAM, ~1–4 GB free after OS; quad/octa-core ~1.8–2.5 GHz; 8–32 GB storage). Battery impact ≤ 10% per hour of active tutoring.
Modular Pedagogy (MUST): All teaching behavior, content, and adaptation defined exclusively via plugins. Core must remain subject- and pedagogy-agnostic.
Composability (MUST): Plugins can be stacked (e.g., Math Subject + Socratic Pedagogy + Voice Accessibility + Rap Hero Creative). Conflicts resolved by explicit dependency declarations and context budget enforcement.
Human-Readable & Auditable (SHOULD): All plugins editable with a text editor; no binary blobs except quantized models.

3. Plugin System Architecture
Plugins are self-contained directories (zipped for distribution) that extend the runtime without modifying core code.
3.1 Plugin Types (MUST support all)

Subject Module: Domain knowledge (e.g., Algebra, U.S. History, Biology).
Pedagogy Module: Teaching strategy (Socratic questioning, scaffolded hints, direct instruction, mastery-based progression).
Accessibility Module: Adaptations (text-to-speech, simplified language, high-contrast UI, voice-first for K–3).
Knowledge Bundle: Static content (facts, examples, diagrams as lightweight SVG/PNG, datasets, hint chains).
UI Module: Custom interface elements or themes (child-friendly, age-specific).
System Module: Runtime extensions (e.g., advanced evaluation, MeshSync enhancements).
Creative Module (new in v1.1): Rap Hero, Lesson Forge, etc.

3.2 Plugin Contract — manifest.json (MUST be valid JSON Schema)
Every plugin MUST include a manifest.json at the root. Recommended JSON Schema validation on load.
JSON{
  "$schema": "https://opentutor.org/plugin-manifest-v1.1.schema.json",
  "id": "string (unique, e.g., com.opentutor.math.algebra.grade6)",
  "name": "string",
  "version": "semver (MAJOR.MINOR.PATCH)",
  "type": "subject | pedagogy | accessibility | bundle | ui | system | creative",
  "description": "string (max 500 chars)",
  "author": "string",
  "license": "string (Apache-2.0 preferred)",

  "supported_models": ["1B", "1.5B", "2B", "3B"],  // quantized parameter classes
  "context_budget": integer (tokens, default 1200, max 4096 for 3B models),
  "min_ram_mb": integer (recommended free RAM),

  "entry_points": {
    "system_prompt": "prompts/system.txt",
    "interaction_prompt": "prompts/interaction.txt (optional)",
    "tools": ["array of tool names, e.g., calculator, hint_generator"],
    "on_load": "optional/script.js or kotlin hook"
  },

  "dependencies": ["array of plugin ids (optional)"],
  "pedagogy_compatibility": ["socratic", "scaffolded", "mastery", ...],
  "subject_compatibility": ["math", "science", ... (optional for pedagogy plugins)],

  "evaluation_enabled": boolean,
  "mesh_sync_enabled": boolean,
  "creative_output_types": ["rap", "lesson_forge", ... (for creative plugins)"]
}

MUST fields: id, name, version, type, context_budget.
Plugins MUST declare realistic context budgets based on target models (1B models struggle beyond ~1K tokens on low RAM).

3.3 Plugin Directory Structure (MUST)
textplugin-id-vX.Y.Z/
├── manifest.json
├── prompts/
│   ├── system.txt          // Base system prompt
│   └── interaction.txt     // Templates for student responses
├── content/
│   ├── facts.json or .yaml
│   ├── examples/
│   ├── hints/              // Chain of escalating hints
│   └── assets/             // SVGs, simple images (<5 MB total)
├── examples/
│   └── sample_interactions.json
├── evaluation/
│   └── metrics_schema.json (optional)
├── creative/               // For Rap Hero, Lesson Forge, etc.
└── README.md
Content Layer (MUST separate): Pure facts, examples, datasets, hint chains (no prompts).
Pedagogy Layer (MUST separate): Strategy rules, interaction patterns.
Interaction Layer (MUST separate): Prompt templates and runtime instructions.
4. Runtime Lifecycle (MUST implement exactly)
The core engine MUST expose these hooks for plugins:

on_load(state) → Initialize, validate context budget, load dependencies.
on_prompt(current_state, student_input) → Compose prompt from active plugins, enforce context_budget.
on_response(generated_output) → Post-process (fact-check via knowledge bundle, apply pedagogy rules, generate evaluation signals).
on_evaluation() → Emit telemetry object (see section 9).
on_mesh_sync(artifact) → Handle incoming MeshSync payloads.
on_unload() → Clean shutdown, persist state.

Plugins MUST NOT block the main thread >200 ms.
5. Inference Engine Requirements (MUST)

Support quantized 1B–3B models (4-bit or lower, GGUF or LiteRT/ONNX format preferred): Llama 3.2 1B/3B, Gemma-3 1–2B variants, Qwen2.5/Qwen3 0.5–3B, SmolLM, Phi-4 mini, Ministral 3B, etc.
Inference backends (in priority order): MLC LLM, llama.cpp (via NDK), ONNX Runtime Mobile, Google AI Edge / LiteRT, ExecuTorch.
Latency goals on minimum hardware (2–3 GB free RAM, mid-range 2020–2022 SoC):
Cold start (first response): < 8–12 seconds.
Subsequent interactions: < 3–5 seconds average (target <2 s on recommended 4+ GB devices).
No Out-Of-Memory (OOM) during 30-minute sessions.

Context window strictly limited by plugin context_budget.
Fallback to rule-based / knowledge-graph responses if model fails or RAM is critically low.

6. MeshSync — Offline Exchange Layer (SHOULD, with MUST constraints)

Transport: Android Nearby Connections API (Bluetooth + Wi-Fi Aware where available). Android-to-Android only in fully offline mode.
Max payload: 150 KB per transfer (compressed).
Allowed artifacts: Hint chains, Socratic question sequences, student-created lessons (Lesson Forge output), Rap Hero rhythmic structures, simple creative outputs.
Prohibited: Executable code, large media (>50 KB), unverified system plugins.
Trust model (MUST):JSON{
  "artifact_id": "string",
  "author_type": "teacher | student | system",
  "signed": boolean,           // Simple HMAC or future key-based
  "version": "semver",
  "content_type": "hint | lesson | prompt_chain | rap",
  "plugin_compatible": ["list of ids"]
}
Conflict resolution: Newest compatible version wins; manual teacher override available.

7. Evaluation System (SHOULD for all plugins)
Plugins MAY emit lightweight telemetry per interaction or session end:
JSON{
  "session_id": "uuid",
  "plugin_id": "string",
  "engagement": 0.0–1.0,      // Heuristic (response length, follow-up questions, etc.)
  "confusion": 0.0–1.0,       // Detected via repeated errors or "I don't understand"
  "success_rate": 0.0–1.0,    // Mastery of current objective
  "time_spent_seconds": integer
}

Stored locally only.
Used for: adaptive path adjustment, teacher reports (exportable PDF/HTML), future community plugin ranking (offline).

8. Creative Learning Modules (SHOULD include base support)

Rap Hero: Convert facts into rhythmic, memorable structures. Output MUST remain factually accurate (cross-checked against knowledge bundle). Support "locked" teacher versions.
Lesson Forge: Student creates lessons in fixed structure:textObjective
Hook
Practice Question(s)
Transfer Task
Creative Extension
Peer Learning Gallery: Local collection of student-created lessons. Simple signals: "useful", "needs improvement". No complex scoring in v1.1.

9. Performance, Reliability & Usability Requirements (MUST)

Hardware Targets: Android 10–14, 2–6 GB RAM (1.5+ GB free recommended), 8+ GB free storage. Tested on representative discarded devices (e.g., Moto G series, Samsung A12/A20s, Pixel 4a equivalents).
Battery & Thermal: ≤10% drain/hour active use; auto-throttle on high temperature or low battery (<20%).
UI/UX: Large touch targets, high-contrast, offline TTS/STT (Android system or bundled small models). Age-appropriate modes (K–3 voice-first, 4–8 gamified, 9–12 Socratic).
Security: All plugin loading validated against manifest; content sandboxed; no dynamic code execution from MeshSync.
Accessibility: WCAG 2.1 AA where feasible; multiple reading levels per lesson.

10. Core System Boundary (Strictly Enforced)
Core MAY do:

Plugin discovery, loading, dependency resolution, composition.
Prompt orchestration and inference delegation.
State persistence (local SQLite, encrypted).
MeshSync coordination.
Basic evaluation aggregation and reporting.

Core MUST NOT do:

Contain any subject facts, examples, or teaching strategies.
Hardcode pedagogy rules.
Include default content bundles.

11. Versioning, Updates & Contribution Model

Plugins: Semantic versioning. Conflicting versions resolved by newest compatible (configurable).
Runtime: Separate versioning; backward-compatible plugin support for at least 2 major versions.
Contribution Classes:
Educators: Pedagogy modules, lesson patterns, classroom flows.
Developers: Plugins, inference optimizations, MeshSync.
Testers/Recyclers: Hardware validation reports, performance benchmarks on real discarded devices.

All contributions under Apache 2.0 (or compatible). Include clear contribution guidelines, plugin template repo, and validation tools.

12. Acceptance Criteria & Next Steps

Verification: Unit tests for plugin loading/composition; integration tests on reference hardware (minimum and recommended specs); manual Socratic tutoring sessions for K–12 sample topics.
Initial Seed Plugins (recommended for v1 launch): Basic Math (grades 3–8), Socratic Pedagogy, Voice Accessibility, Rap Hero, one Knowledge Bundle per major subject.
Open-Source Deliverables: Full GitHub repo with core engine (Kotlin + NDK), plugin schema, example plugins, build scripts for F-Droid/sideloading, hardware test suite.
