# Contributing to OpenTutor Framework

Thank you for considering contributing to OpenTutor!

We welcome contributions from **teachers, students, developers, recyclers, and hobbyists** — all skill levels are valuable.

> *“The Linux of tutorbots” grows through real-world teaching experience combined with practical engineering.*

---

## Ways to Contribute

You can help in many ways:

### Teaching & Pedagogy (No Coding Required)

* Share effective Socratic prompts
* Contribute lesson patterns or teaching sequences
* Document classroom-tested approaches

---

### Plugin Development

* Create subject plugins (math, history, science, etc.)
* Add new pedagogy styles
* Extend creative modes (e.g., Rap Hero)

---

### Hardware Testing

* Test on real recycled Android phones
* Report performance using `docs/hardware-testing.md`

---

### Documentation

* Improve clarity and structure
* Add examples or tutorials
* Translate content for broader access

---

### Code Contributions

* Fix bugs
* Improve performance (especially inference)
* Enhance UI/UX

---

### Feedback

* Share what works well
* Report friction points on real devices
* Suggest improvements based on actual use

---

## Getting Started

1. Fork the repository
2. Clone your fork:

```bash id="4u8n3k"
git clone https://github.com/YOUR_USERNAME/OpenTutorFramework.git
```

3. Create a new branch:

```bash id="k92p1x"
git checkout -b feature/my-contribution
```

---

## Development Setup

The project uses Android (Kotlin + Gradle).

Build the debug APK:

```bash id="p0x7mn"
./gradlew assembleDebug
```

Install the APK on a physical Android device
(2019–2023 models recommended for testing).

For system design details, see `ARCHITECTURE.md`.

---

## Documentation Guidelines

Please keep documentation:

* Clear and beginner-friendly
* Practical and example-driven
* Accessible to non-developers

Relevant guides:

* `PLUGINS.md` — Plugin creation 
* `docs/pedagogy-guide.md` — Socratic + adaptive teaching
* `docs/hardware-testing.md` — Real-device testing
* `docs/media-guidelines.md` — MeshSync content rules

---

## Submitting Changes

1. Make your changes
2. Test on a real device when possible
3. Commit with a clear message:

```
Add socratic questioning prompts for history plugin
```

4. Push to your branch
5. Open a Pull Request

We’ll review your PR and work with you to get it merged.

---

## Code of Conduct

* Be respectful and constructive
* Assume good intent
* Focus on improving learning and accessibility
* Credit original ideas when building on others’ work

---

## Questions & Discussions

* Open an **Issue** for bugs or feature requests
* Use **GitHub Discussions** for questions or ideas

We especially encourage teachers to share what works (or doesn’t) with real students.

---

## Where to Start

If you’re new, try one of these:

* Test the `basic-math` plugin and give feedback
* Run OpenTutor on an old Android phone and submit a hardware report
* Improve a pedagogy prompt
* Help complete a TODO in the documentation

---

## Project Status

OpenTutor is in **early alpha**.

That means:

* Things may break
* Simplicity is preferred over complexity
* Real-world feedback is extremely valuable

---

## Final Note

Your contribution — whether it’s:

* a well-tested prompt
* a hardware test report
* a documentation fix
* or a code improvement

…helps turn discarded phones into **powerful, private learning tools**.

Thank you for helping build something meaningful.
