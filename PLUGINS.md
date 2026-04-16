# Plugins in OpenTutor Framework

The OpenTutor plugin system is the core of the **“Linux of tutorbots”** architecture.

The system core remains intentionally minimal. All subjects, teaching methods, accessibility features, and content bundles are implemented as modular plugins.

This enables educators, developers, and communities to build and share educational tools without modifying the core engine.

---

## Design Principles

* **Separation of core and pedagogy**: The engine handles reasoning and execution; plugins define teaching behavior and content
* **Composability**: Subject + pedagogy + accessibility layers can be combined
* **Offline-first design**: Plugins must function without internet access
* **Low-resource optimization**: All plugins must be suitable for mobile-class hardware
* **Community extensibility**: Non-developers can contribute meaningful educational modules

---

## Why Plugins Matter

The plugin system enables:

* Rapid creation of new subjects (e.g., fractions, biology, Spanish verbs)
* New pedagogical approaches without core changes
* Packaging of open educational resources
* Community-defined “distros” of education (e.g., math-only, ESL-focused, literacy-first builds)

The core engine does not contain subject knowledge or pedagogy logic. It only loads and executes plugins.

---

## Plugin Types

| Type                 | Purpose                                                 | Primary Contributors          | Format                 |
| -------------------- | ------------------------------------------------------- | ----------------------------- | ---------------------- |
| Subject Module       | Defines a subject or domain of knowledge                | Teachers, subject experts     | JSON + optional text   |
| Pedagogy Module      | Defines teaching behavior and interaction style         | Educators, pedagogy designers | JSON                   |
| Accessibility Module | Adapts tutoring for accessibility needs                 | Accessibility advocates       | JSON + optional Kotlin |
| Knowledge Bundle     | Static educational content (textbooks, facts, examples) | Open content contributors     | Markdown / text        |
| UI Theme             | Visual or interaction customization                     | Designers, developers         | Android resources      |

---

## Plugin Structure (Subject Module)

All subject plugins follow a standardized directory format:

```
my-awesome-subject/
├── manifest.json          # Required: metadata and configuration
├── prompts/               # Optional: teaching prompt templates
│   └── socratic.txt
├── content/               # Optional: structured knowledge or hints
├── examples/              # Optional: sample interactions
└── README.md              # Recommended: usage and testing guide
```

---

## Creating a Plugin (Beginner Guide)

### Step 1 — Start from a Template

Copy an existing plugin:

```
plugins/subjects/basic-math/
```

Rename it to your subject (e.g., `world-history` or `spanish-verbs`).

---

### Step 2 — Configure Metadata

Edit `manifest.json` with:

* Name
* Version
* Subject domain
* Supported pedagogy modules

---

### Step 3 — Customize Content

Modify or add:

* Prompt templates
* Hint chains
* Example problems or explanations

---

### Step 4 — Test Locally

Build and install the APK:

```bash id="a91k2p"
./gradlew assembleDebug
```

The plugin should load automatically at runtime.

---

## Pedagogy Modules

Pedagogy plugins define *how teaching happens*, independent of subject matter.

Examples include:

* Socratic questioning
* Scaffolded learning
* Example-driven instruction

See `docs/pedagogy-guide.md` for design standards and implementation guidance.

---

## Included Examples

* `plugins/subjects/basic-math/` — Reference implementation for elementary arithmetic
* `plugins/pedagogy/socratic/` — Default Socratic teaching behavior

---

## Mesh Learning (Offline Exchange System)

The `mesh-learning` plugin enables offline exchange of small educational artifacts via Bluetooth or Nearby Connections.

### Shared Content Types

* Hint sequences
* Socratic question chains
* Creative learning content (e.g., Rap Hero outputs)
* Lightweight usage metadata (e.g., effectiveness signals)

### Constraints

* Maximum payload per transfer: ~150 KB
* Optimized for brief, high-value educational artifacts
* Not intended for video or large media

This system supports decentralized improvement of educational content without requiring internet access.

---

## Creative Learning Plugins

### Rap Hero (Educational Rhythm System)

A creative learning mode that encodes educational content into rhythmic, memorable formats.

Capabilities:

* Generate factually accurate educational rap content
* Support rehearsal and performance modes
* Enable teacher-approved “locked” versions for classroom use
* Share content as lightweight JSON artifacts

---

### Lesson Forge (Student Creation Mode)

A guided system for student-generated lessons.

Structure:

* Objective
* Engagement hook
* Practice question
* Transfer task
* Optional creative extension

The tutor acts as a structured coach, guiding step-by-step creation.

Output is stored as portable JSON artifacts.

---

### Peer Learning Gallery

An extension of Lesson Forge enabling peer discovery and iteration.

Features:

* Browse student-created lessons
* Simple feedback signals (e.g., “works”, “improve”)
* Recommendation based on aggregated feedback
* Lightweight sharing via MeshSync or manual transfer

This system reinforces learning-through-teaching loops.

---

## Contribution Workflow

1. Read `docs/pedagogy-guide.md`
2. Test on real hardware (`docs/hardware-testing.md`)
3. Create or modify a plugin
4. Submit via Pull Request

Even small contributions (a single prompt file or lesson pattern) are valuable.

---

## Design Intent

OpenTutor plugins are designed to make **pedagogy modular, testable, and shareable**.

The long-term goal is a community-driven ecosystem where educational approaches are versioned, improved, and distributed like software.

---

## Next Steps

* Explore `basic-math` as a reference implementation
* Review pedagogy design guidelines
* Run hardware tests to validate performance constraints
* Submit first plugin contribution (even minimal ones are welcome)
