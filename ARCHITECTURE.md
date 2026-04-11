# Architecture of OpenTutor Framework

**The Linux kernel for tutorbots** — A minimal, modular, offline-first framework that turns discarded Android phones (2019–2023 models with 4–8 GB RAM) into private Socratic tutors.

This document defines the non-negotiable principles, high-level layers, and interfaces. Everything in the core is designed to be small, testable, and extensible via plugins. The core itself should remain tiny so that community "distros" (subject-specific or pedagogy-specific bundles) can flourish.

## Core Philosophy (These Rules Are Immutable)

1. **Everything is a plugin**  
   Subjects (math, history, languages), teaching styles (Socratic, Montessori, direct instruction), UI skins, accessibility features, and knowledge bases are all plugins. The core never hard-codes any subject or pedagogy.

2. **Strict resource budget for real e-waste**  
   - Inference + tutor engine: ≤ 2 GB RAM on a typical 2020 phone  
   - Total app footprint (excluding model): ≤ 500 MB  
   - Target: usable performance (≥ 3–5 tokens/sec) on Snapdragon 665 / Exynos 9611 / equivalent class chips  
   - Low-power mode mandatory (CPU-only fallback, thermal throttling awareness)

3. **100% offline after initial setup**  
   Models, prompts, knowledge bundles, and conversation history stay on-device. No telemetry, no cloud calls.

4. **Simple, stable JSON interfaces**  
   All layers communicate via well-defined JSON messages. This makes plugins interchangeable and easy to test in isolation.

5. **Fork- and distro-friendly**  
   Anyone can fork the core, create a new backend, or bundle modules into a ready-to-install APK.

6. **Accessibility and inclusivity by default**  
   Voice-first support, large text, high-contrast themes, and neuropathy/ADHD-friendly interaction patterns (short responses, clear progress indicators) are core concerns, not afterthoughts.

   Layer Details
1. User Interface Layer

Android-native (Jetpack Compose recommended for performance on old devices)
Core features: chat interface, voice input/output (using built-in SpeechRecognizer + TextToSpeech), simple quiz mode, progress summary
Pluggable: Themes, input methods, and accessibility overrides
Designed for neuropathy (large tap targets, voice-primary) and ADHD (clear structure, minimal distractions)

2. Tutor Engine Layer (The "Brain")

Implements the core tutoring loop using a system prompt + conversation history
Handles Socratic questioning, difficulty adaptation, effort-based praise, and spaced review
Maintains lightweight memory (conversation summary + learned concepts as JSON)
All pedagogy logic comes from plugins

3. Inference Core

Pluggable backends for flexibility as the ecosystem evolves
Recommended starting options:
MediaPipe LLM Inference (easiest, good multimodal)
MLC-LLM (strong GPU acceleration)
llama.cpp via Android NDK (best for lowest-end hardware)

Models: 1–3B parameters, aggressively quantized (4-bit or lower)

4. Plugin System

Subject plugins, pedagogy plugins, accessibility plugins, and knowledge bundles
Loaded from a standard plugins/ directory or assets folder
Simple to add without touching the core
#### MeshSync Plugin (Doorway Learning)
The optional `mesh-learning` plugin enables phones to exchange small JSON-based tutoring artifacts (hints, Socratic question chains, rap lyrics, success metadata) via Bluetooth/Nearby Connections when passing a school or library doorway. 

This creates a decentralized, self-improving network without any central server or internet. Payloads are strictly limited (~150 KB per pass) to ensure reliability on old hardware. Larger media such as videos must be added manually via USB or Quick Share.

5. Offline Storage Layer

SQLite for history, progress, and preferences
Bundled open educational resources (permissive licenses only)

6. Hardware Abstraction Layer

Detects device capabilities and enforces resource limits
Automatic fallback to CPU-only when needed

Key Interfaces (JSON-based)
TutorRequest example:
JSON{
  "user_input": "Explain photosynthesis",
  "subject": "biology",
  "pedagogy_style": "socratic",
  "student_level": "middle_school",
  "history_summary": "..."
}
TutorResponse example:
JSON{
  "bot_reply": "Great question! What do you already know about how plants get energy?",
  "learned_concepts": ["basic_energy_flow"],
  "metadata": { "tokens_used": 52 }
}
Non-Functional Requirements

Performance targets documented in docs/hardware-testing.md
Unit + integration tests with mock backends
No network permissions required after initial model sideloading
Gradle-based build for easy APK generation

How to Extend
See CONTRIBUTING.md and PLUGINS.md.
This architecture keeps the core lean (Linux-kernel style) while maximizing community freedom to build subject-specific distros, new backends, or accessibility enhancements.
Version: 0.1 (Kernel Stage)
Last updated: April 2026
Contributions that respect these principles are welcome.
text

## High-Level Architecture

```mermaid
%%{init: {"flowchart": {"htmlLabels": false}}}%%
graph TD
    UI["User Interface Layer
Chat / Voice / Quiz / Progress UI
Pluggable skins & accessibility modes"] 
    --> Engine["Tutor Engine Layer
Socratic / pedagogy logic
Memory & progress tracking
Adaptation rules
Conversation state"]

    Engine --> Inference["Inference Core
Pluggable backends
• MediaPipe LLM Inference
• MLC-LLM
• llama.cpp via NDK
• LiteRT-LM (future)"]

    Plugins["Plugin System
• Subject modules (prompt sets + knowledge)
• Pedagogy modules
• Accessibility plugins
• Knowledge bundles (bundled text files)"] 
    --> Engine

    Storage["Offline Storage Layer
SQLite for history/progress
Bundled open educational resources
Model cache"] 
    --> Engine

    Hardware["Hardware Abstraction Layer
RAM/CPU/GPU/NPU detection
Power & thermal management
Android API abstractions"] 
    --> Inference

