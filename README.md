"""OpenTutor Framework

The Linux of tutorbots — A lightweight, modular, offline-first framework that turns discarded Android phones (2019–2023 models with 4–8 GB RAM) into private Socratic tutors.

No cloud required. Runs entirely on-device with small quantized LLMs. Designed for e-waste reuse, accessibility, and community-driven growth.

---

WHY THIS MATTERS

Old phones become personalized tutors for math, social studies, English, and science. Teachers, students, and hobbyists can contribute plugins and share effective teaching content — all while keeping everything private and offline.

---

HIGH-LEVEL ARCHITECTURE

UI Layer (Chat + Voice + Quiz)
    -> Tutor Engine (Socratic + Context)
        -> Inference Core (MediaPipe, MLC-LLM, llama.cpp)

Plugins (Subjects, Pedagogy, MeshSync, Rap Hero, Lesson Forge)
    -> Tutor Engine

Storage (SQLite + Plugins)
    -> Tutor Engine

---

CURRENT FEATURES

- Plugin system with a working basic math example
- MeshSync: Offline Bluetooth sharing of small tutoring content (hints, question chains, rap lyrics)
- Rap Hero: Generate, lock in, and perform educational raps
- Lesson Forge: Guided mode for students to create short lessons with peer feedback
- Behavioral learner state tracking for adaptive responses
- Media guidelines for videos and large content (manual import only)

See docs/media-guidelines.md for details on MeshSync sharing.

---

QUICK START

For testers / teachers:

1. Clone the repository
2. Connect your Android phone (2019–2023 model recommended)
3. Run:
   ./gradlew assembleDebug
4. Install the APK and test the basic math plugin

For teachers / non-developers:
- Start with PLUGINS.md
- Try the basic math or Lesson Forge plugins

For developers:
- Read ARCHITECTURE.md for full system design

For everyone:
- See CONTRIBUTING.md — all skill levels welcome

---

DOCUMENTATION

- ARCHITECTURE.md — System overview and design decisions
- PLUGINS.md — How to create and use plugins (15-minute guide)
- docs/media-guidelines.md — MeshSync content guidelines
- CONTRIBUTING.md — Contribution guide

---

CONTRIBUTING

Contributions are welcome from teachers, students, developers, and tinkerers.

See CONTRIBUTING.md for details.

---

LICENSE

Apache 2.0 — see LICENSE file for details.

---

STATUS

Early alpha — plugin system working, MeshSync in testing.

Built for the community. Feedback and pull requests are encouraged.
"""

output_path = "/mnt/data/opentutor_framework.txt"
convert_text(text, 'plain', format='md', outputfile=output_path, extra_args=['--standalone'])

output_path
