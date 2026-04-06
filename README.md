# OpenTutorFramework
# OpenTutor Framework (or your chosen name: RecycleTutor / Tutorbot Kernel)

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![GitHub Discussions](https://img.shields.io/github/discussions/...)]()

**The Linux of tutorbots** — A lightweight, modular, fully open-source framework to turn discarded Android phones (2019–2023 models, 4–8 GB RAM) into private, offline Socratic tutors.

No cloud. No tracking. Runs entirely on-device with small quantized LLMs (1–3B params). Built for e-waste reuse, accessibility, and community extension.

## Why This Matters
- Education should not require expensive hardware or internet.
- Old phones become powerful, personalized tutors for math, languages, history, etc.
- Teachers, parents, and students can contribute subject modules or pedagogy styles without deep coding.
- Your Anthropology + Systems Architecture background ensures it's human-centered and technically robust.

## Core Philosophy (the "kernel" rules)
- Everything is a plugin (subjects, teaching methods, UIs, accessibility).
- Strict resource limits for real old hardware.
- 100% offline after setup.
- Simple JSON interfaces between layers.
- Fork-friendly and distro-friendly.

## Quick Start (for different people)

## Quick Start (for different people)

### For Teachers / Educators (no coding needed)
1. [Add a new subject module in 15 minutes →](PLUGINS.md)
2. Bundle your favorite open textbook excerpts (CC0 or permissive license).

### For Developers
1. Clone the repo
2. Read [ARCHITECTURE.md](ARCHITECTURE.md) for the modular layers
3. Check [PLUGINS.md](PLUGINS.md) and start with the examples in `plugins/`

### For Testers / Users with old phones
1. Build a debug APK (`./gradlew assembleDebug`)
2. Sideload and test on your device
3. Report results by opening an issue (we'll add hardware-testing guide soon)

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
