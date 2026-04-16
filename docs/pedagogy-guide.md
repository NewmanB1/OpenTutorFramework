# Pedagogy Guide for OpenTutor Framework

This guide supports educators and plugin creators in designing effective, Socratic-style tutoring experiences optimized for low-resource Android devices.

---

## Core Philosophy

OpenTutor uses a **Socratic + Adaptive** instructional model:

* **Elicit thinking before providing information**
* **Build from the learner’s current mental model**
* **Adjust difficulty and support based on observed behavior**
* **Promote explanation, reflection, and self-correction**

The objective is not only correct answers, but **durable understanding, transfer of knowledge, and learner confidence**.

---

## Instructional Models

### 1. Socratic Questioning (Default)

Use guided questioning to surface and refine student thinking.

* Begin with prior knowledge:
  *“What do you already know about…?”*
* Probe reasoning:
  *“Why do you think that?”*
  *“What led you to that conclusion?”*
* Address misconceptions indirectly through structured questioning rather than direct correction

---

### 2. Scaffolded Learning

Support learners through structured progression:

* Decompose complex tasks into smaller steps
* Provide **graduated hints** before full explanations
* Fade support over time as competence increases

---

### 3. Example-Driven Learning

Use examples to anchor understanding:

* Present 1–2 clear worked examples
* Prompt the learner to generate a similar example
* Compare responses and discuss differences

---

### 4. Creative Encoding (Rap Hero Mode)

Leverage rhythm and creativity for retention:

* Apply to memorization-heavy domains (vocabulary, formulas, historical sequences)
* Generate a strong initial version, then refine collaboratively
* Encourage performance, variation, or personalization

---

## Adaptive Behavior Guidelines

OpenTutor systems should respond dynamically to learner signals:

* **Confusion** → simplify language, provide analogies, reduce step size
* **Frustration** → validate effort, lower difficulty temporarily, offer encouragement
* **Confidence** → increase challenge, reduce scaffolding
* **Disengagement** → introduce variation (questions, examples, or creative modes)

Adaptation should be **incremental and reversible**, avoiding sudden jumps in difficulty.

---

## Contributing Pedagogy Modules

Educators and contributors can extend the system without coding expertise.

### To add a new pedagogy module:

Create a folder in `plugins/pedagogy/` containing:

* `manifest.json`
* Prompt templates (e.g., `socratic-prompt.txt`, `scaffolded-prompt.txt`)
* Example interaction logs demonstrating intended use

---

### To improve existing modules:

* Refine prompt templates for clarity and effectiveness
* Add subject-specific variations (math, history, science, etc.)
* Submit improved example interaction sequences

---

### To share proven lesson patterns:

Document real-world teaching sequences, including:

* Initial student state
* Key questions or prompts used
* Observable “aha” moments or turning points

---

## Prompt Design Constraints

Due to hardware limitations, prompts must be efficient and focused:

* Target **800–1200 tokens maximum**
* Use clear, concise language
* Maintain a supportive, non-judgmental tone
* Incorporate learner-state cues when relevant
* End responses with a **natural follow-up question** to sustain interaction

---

## Testing and Validation

All pedagogy modules should be tested under realistic conditions:

* Run on target hardware (see `hardware-testing.md`)
* Test across multiple age groups and ability levels where possible
* Include representative interaction transcripts

Priority should be given to **robustness and clarity over complexity**.

---

## Repository Examples

* `plugins/pedagogy/socratic/` — Baseline Socratic implementation
* `plugins/basic-math/` — Example of integrated subject + pedagogy design

---

## Design Principle

**Effective pedagogy is simple, testable, and grounded in real interaction.**

Short, well-validated prompt sets derived from classroom experience are often more impactful than complex or highly theoretical designs.

---

We welcome contributions that improve learning effectiveness, engagement, and accessibility across diverse learner populations.
