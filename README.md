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

### For Teachers / Educators (no coding needed)
1. [Add a new subject module in 15 minutes →](link-to-PLUGINS.md)
2. Bundle your favorite open textbook excerpts.

### For Developers
1. Clone the repo
2. Check [ARCHITECTURE.md](ARCHITECTURE.md) for the modular layers
3. Build the minimal reference implementation (examples/minimal-tutor)

### For Testers / Users with old phones
1. Download a pre-built APK from Releases
2. Sideload and test performance on your device
3. Report results in [hardware-testing.md](docs/hardware-testing.md)

## High-Level Architecture
(Embed your Mermaid diagram here — it renders automatically on GitHub)

```mermaid
graph TD
    A[User Interface] --> B[Tutor Engine]
    B --> C[Inference Core (pluggable: MediaPipe / MLC-LLM / llama.cpp)]
    E[Plugins (subjects, pedagogy, accessibility)] --> B
