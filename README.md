# OpenTutor Framework

[<image-card alt="License" src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" ></image-card>](LICENSE)

**The Linux of tutorbots** — A lightweight, modular, offline-first framework that turns discarded Android phones (2019–2023 models with 4–8 GB RAM) into private Socratic tutors.

No cloud. No tracking. Runs entirely on-device with small quantized LLMs (1–3B params). Built for e-waste reuse, accessibility, and community extension.

## Why This Matters
- Education should not require expensive hardware or internet.
- Old phones become powerful, personalized tutors for math, social studies, English, and science.
- Teachers, parents, and students can contribute subject modules, pedagogy styles, creative tools, and shared content without deep coding.

## High-Level Architecture

```mermaid
graph TD
    UI["User Interface<br/>Chat + Voice + Quiz"] --> Engine["Tutor Engine<br/>Socratic + Context"]
    Engine --> Inference["Inference Core<br/>MediaPipe • MLC-LLM • llama.cpp"]
    Plugins["Plugins<br/>Subjects • Pedagogy • Rap Hero • MeshSync"] --> Engine
    Storage["Storage<br/>SQLite + Synced Content"] --> Engine
    Hardware["Hardware<br/>RAM / Power / Thermal"] --> Inference
