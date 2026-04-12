# Architecture of OpenTutor Framework

**The Linux kernel for tutorbots** — A minimal, modular, offline-first framework that turns discarded Android phones (2019–2023 models with 4–8 GB RAM) into private Socratic tutors.

This document defines the non-negotiable principles, high-level layers, and interfaces. The core remains tiny so the community can build subject-specific distros and extensions.

## Core Philosophy (These Rules Are Immutable)

1. **Everything is a plugin**  
   Subjects, pedagogy styles, accessibility features, creative tools (Rap Hero), and sync mechanisms are all plugins. The core never hard-codes any subject or teaching method.

2. **Strict resource budget for real e-waste**  
   - Inference + tutor engine: ≤ 2 GB RAM on a typical 2020 phone  
   - Total app footprint (excluding model): ≤ 500 MB  
   - Target: usable performance (≥ 3–5 tokens/sec) on Snapdragon 665 / Exynos 9611 class chips  
   - Low-power mode mandatory (CPU-only fallback, thermal throttling awareness)

3. **100% offline by default**  
   Models, prompts, knowledge bundles, and conversation history stay on-device. Internet is strictly optional and never required.

4. **Single main LLM inference per turn**  
   All intelligence comes from one primary model call + lightweight rule-based checks. No heavy multi-stage pipelines.

5. **Simple, stable JSON interfaces**  
   All layers communicate via well-defined JSON messages.

6. **Fork- and distro-friendly + Accessibility by default**  
   Voice-first support, large text, high-contrast themes, and neuropathy/ADHD-friendly patterns are core concerns.

## High-Level Architecture

```mermaid
graph TD
    UI["User Interface Layer<br/>Chat + Voice + Quiz"] --> Engine["Tutor Engine Layer<br/>Socratic + Context + Adaptation"]
    Engine --> Inference["Inference Core<br/>MediaPipe • MLC-LLM • llama.cpp"]
    Plugins["Plugin System<br/>Subjects • Pedagogy • Rap Hero • MeshSync"] --> Engine
    Storage["Offline Storage<br/>SQLite + Plugins + Synced Content"] --> Engine
    Hardware["Hardware Abstraction<br/>RAM / Power / Thermal"] --> Inference

Layer Details
1. User Interface Layer
Android-native chat interface with voice input/output, simple quiz mode, and progress summary. Designed for large tap targets and short responses.
2. Tutor Engine Layer
Implements the core Socratic tutoring loop using a single LLM inference. It receives the student input, the current Student Context Object, and the selected plugin’s system prompt. Its job is to generate patient, guiding responses — never just giving the answer directly.
3. Inference Core
Pluggable backends (MediaPipe, MLC-LLM, llama.cpp via NDK). Strictly limited to 1–3B quantized models.
4. Plugin System
All educational intelligence lives here. Current plugins include:

Subject modules (e.g., basic-math)
Pedagogy modules
mesh-learning (Doorway MeshSync for small JSON content)
Creative extensions (Rap Hero planned)

5. Offline Storage Layer
SQLite for conversation history, progress, and plugin data. Bundled open educational resources.
6. Hardware Abstraction Layer
Detects device capabilities and enforces resource limits.
Behavioral Adaptive Learning & Network Feedback
The architecture supports a lightweight, continuously improving adaptive system by modeling learners as dynamic systems rather than static types.
Learner State Model
The Student Context Object maintains a small set of continuously updated behavioral metrics derived from simple observable signals:
Core Dimensions (0.0 – 1.0 scale)

Engagement: persistence and response to novelty
Cognition: working memory load and abstraction readiness
Control Preference: guided scaffolding vs open exploration
Behavioral Rhythm: sustained attention vs bursty engagement
Confidence: hesitation and error recovery ability

Additional Derived Metrics

hint_usage_rate
error_recovery_speed
transfer_success (performance on novel applications)

These metrics are updated locally after each interaction and stored as simple floats.
Lesson Effectiveness Mapping via MeshSync
The mesh-learning plugin enables a decentralized feedback loop:

Tutoring artifacts (hints, Socratic chains, rap lyrics, lesson segments) carry lightweight effectiveness metadata across learner state dimensions.
Phones anonymously contribute local performance signals during doorway sync.
The merge prompt preferentially promotes content that has shown strong results for similar learner states.

This creates a self-improving network where effective instructional patterns spread organically across devices and schools.
Integration with Core Pipeline

The Tutor Engine uses the current Learner State to select or adapt plugin content.
Only one main LLM inference occurs per turn.
Rule-based safety and grade checks run afterward.
MeshSync operates opportunistically with strict size limits (≤ 150 KB per pass).

This behavioral approach delivers meaningful adaptation and continuous improvement without rigid labeling, heavy compute, or violating offline-first and low-resource constraints.
Key Interfaces (JSON-based)
Student Context Object (example):
{
  "grade_band": "5-6",
  "subject": "math",
  "engagement": 0.78,
  "cognition": 0.65,
  "control_preference": "guided",
  "behavioral_rhythm": "sustained",
  "confidence": 0.45,
  "hint_usage_rate": 0.6,
  "error_recovery_speed": 0.7,
  "learned_concepts": ["fraction_recognition"]
}
Non-Functional Requirements

Performance targets documented in hardware-testing.md
No network permissions required in primary offline mode
Internet updates (optional plugin) clearly marked as non-primary with data cost and security warnings

How to Extend
See PLUGINS.md and CONTRIBUTING.md.
Version: 0.2 (Behavioral Adaptive + MeshSync)
Last updated: April 2026
Contributions that uphold these principles are welcome. Let's build the most accessible, private, and self-improving tutoring platform on recycled hardware.
