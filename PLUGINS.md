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

