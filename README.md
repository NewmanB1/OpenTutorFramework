# OpenTutor Framework

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

**The Linux of tutorbots** — A lightweight, modular, offline-first framework that turns discarded Android phones (2019–2023 models with 4–8 GB RAM) into private Socratic tutors.

No cloud. No tracking. Runs entirely on-device with small quantized LLMs (1–3B params). Built for e-waste reuse, accessibility, and community extension.

## Why This Matters
- Education should not require expensive hardware or internet.
- Old phones become powerful, personalized tutors for math, social studies, English, and science.
- Teachers, parents, and students can contribute subject modules, pedagogy styles, creative tools, and shared content without deep coding.

## High-Level Architecture

```mermaid
%%{init: {"flowchart": {"htmlLabels": false}}}%%
graph TD
    UI["User Interface Layer<br/>Chat + Voice + Quiz UI<br/>Pluggable skins & accessibility"] 
    --> Engine["Tutor Engine Layer<br/>Socratic logic + Student Context<br/>Adaptation rules"]

    Engine --> Inference["Inference Core<br/>Pluggable backends<br/>MediaPipe • MLC-LLM • llama.cpp"]

    Plugins["Plugin System<br/>Subjects • Pedagogy • Rap Hero • MeshSync"] 
    --> Engine

    Storage["Offline Storage Layer<br/>SQLite + Plugins + Synced Content"] 
    --> Engine

    Hardware["Hardware Abstraction Layer<br/>RAM / CPU / GPU detection<br/>Power & thermal management"] 
    --> Inference
Current Features

Plugin-based architecture — Teachers can add or modify subjects and pedagogy styles easily
Student Context Object — Keeps responses grade-appropriate and personalized
Basic Math plugin — Working Socratic example (see plugins/subjects/basic-math/)
Lightweight safety & grade checks
Planned / In Progress:
Rap Hero mode (generate, lock-in, perform, and share educational raps)
Doorway MeshSync (offline Bluetooth/Nearby sharing of best hints and question chains at school/library doors)
Music video contests for creative learning
Full Android app skeleton with inference integration


Quick Start
For Teachers / Educators (no coding needed)

Add or customize a subject plugin →
Start with the included basic-math example
Lock in community content or hints for your class

For Developers

Read ARCHITECTURE.md for the modular layers
Explore PLUGINS.md to understand how to extend the system

For Testers / Users with old phones

Build debug APK: ./gradlew assembleDebug
Sideload and test on real 2019–2023 hardware
Report performance and issues

Next Documents to Read

ARCHITECTURE.md — Detailed layers, principles, and interfaces
PLUGINS.md — How to create and contribute plugins
CONTRIBUTING.md — How to get involved (all skill levels welcome)

Get Involved
We welcome teachers (pedagogy & subject modules), developers (backends & features), and recyclers/testers (hardware feedback).
This project is in early "kernel" stage. The core is deliberately minimal so the community can grow it into many subject-specific "distros."
License: Apache 2.0 — see the LICENSE file for details.
text
