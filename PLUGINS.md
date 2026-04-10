# Plugins in OpenTutor Framework

The plugin system is the heart of the "Linux of tutorbots" philosophy: **the core stays minimal**, while everything educational is built as interchangeable plugins. This allows teachers, parents, and subject experts to contribute powerful tutoring modules without touching the core code.

## Why Plugins?

- Teachers can add a new subject (e.g., fractions, world history, Spanish verbs) in minutes.
- Developers can create new pedagogy styles or accessibility features.
- Anyone can bundle open educational resources.
- Community "distros" can combine plugins into specialized APKs (e.g., "OpenTutor-Math-Elementary" or "RecycleTutor-ESL").

The core never hard-codes any subject or teaching method — it only provides the engine that loads and runs plugins.

## Plugin Types

| Plugin Type              | Purpose                                      | Who Typically Creates It          | File Format                  |
|--------------------------|----------------------------------------------|-----------------------------------|------------------------------|
| **Subject Module**       | Specific topic (math, biology, history, etc.) | Teachers, subject experts        | JSON + optional text files   |
| **Pedagogy Module**      | Teaching style (Socratic, Montessori, etc.)  | Educators, pedagogy enthusiasts  | JSON                         |
| **Accessibility Plugin** | Voice-first, large text, simplified language | Accessibility advocates          | JSON + optional Kotlin       |
| **Knowledge Bundle**     | Open textbooks, facts, examples              | Anyone with CC0/permissive content | Plain text / Markdown files  |
| **UI Skin**              | Custom themes or input methods               | Designers / Developers           | Android resources            |

## How to Create a Plugin (15-Minute Guide for Non-Developers)

### 1. Subject Module (Most Common)

Create a folder inside `plugins/subjects/` with this structure:

## Examples Included

- `plugins/subjects/basic-math/` — A complete working example for elementary arithmetic (ready to copy and modify)

- ## Sync Plugins

### Mesh Learning (Doorway MeshSync)

The `mesh-learning` plugin enables phones to exchange small, high-value tutoring content via Bluetooth or Nearby Connections when passing a school or library doorway.

**What it shares:**
- Short hint sequences (math)
- Socratic question chains (social studies, science, English)
- Rap lyrics and performance tips (Rap Hero mode)
- Success metadata (e.g., "this hint helped 87% of students")

**Important limits:**
- Total payload per pass: ~150 KB maximum (typically 8–15 small JSON files)
- Not suitable for videos or large media (use USB or Quick Share for those)

See `plugins/sync/mesh-learning/` for the current implementation and examples.

This feature allows the tutorbot to improve over time through real classroom usage while staying fully offline by default.
