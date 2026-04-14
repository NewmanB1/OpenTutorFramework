# OpenTutor Framework

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

**The Linux of tutorbots** — A lightweight, modular, offline-first framework that turns discarded Android phones (2019–2023 models with 4–8 GB RAM) into private Socratic tutors.

No cloud required. Runs entirely on-device with small quantized LLMs. Designed for e-waste reuse, accessibility, and community-driven growth.

## Why This Matters
Old phones become personalized tutors for math, social studies, English, and science. Teachers and students can contribute plugins and share effective teaching content.

## High-Level Architecture

```mermaid
graph TD
    UI["UI Layer<br/>Chat + Voice + Quiz"] --> Engine["Tutor Engine<br/>Socratic + Context"]
    Engine --> Inference["Inference Core<br/>MediaPipe • MLC-LLM • llama.cpp"]
    Plugins["Plugins<br/>Subjects • Pedagogy • MeshSync • Rap Hero • Lesson Forge"] --> Engine
    Storage["Storage<br/>SQLite + Plugins"] --> Engine


Current Features

Plugin system with working basic-math example
MeshSync: Offline Bluetooth doorway sharing of small tutoring content (hints, question chains, rap lyrics)
Rap Hero: Generate, lock-in, and perform educational raps
Lesson Forge: Guided mode for students to create their own short lessons with peer feedback
Behavioral learner state tracking for adaptive responses
Media guidelines for videos and large content (manual import only)

See docs/media-guidelines.md for details on what can be shared via MeshSync.
Quick Start
Teachers: See PLUGINS.md and try the basic-math or lesson-forge plugins.
Developers: Read ARCHITECTURE.md.
Testers: Build with ./gradlew assembleDebug and test on real old phones.
See CONTRIBUTING.md — all skill levels welcome.
License: Apache 2.0 — see LICENSE
