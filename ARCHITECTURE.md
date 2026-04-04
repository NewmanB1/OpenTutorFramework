# Architecture of OpenTutor Framework
# Architecture of OpenTutor Framework

**The Linux kernel for tutorbots** — A minimal, modular, offline-first framework that turns discarded Android phones (2019–2023 models with 4–8 GB RAM) into private Socratic tutors.

This document defines the non-negotiable principles, high-level layers, and interfaces. Everything in the core is designed to be small, testable, and extensible via plugins. The core itself should remain tiny so that community "distros" (subject-specific or pedagogy-specific bundles) can flourish.

## Core Philosophy (These Rules Are Immutable)

1. **Everything is a plugin**  
   Subjects (math, history, languages), teaching styles (Socratic, Montessori, direct instruction), UI skins, accessibility features, and knowledge bases are all plugins. The core never hard-codes any subject or pedagogy.

2. **Strict resource budget for real e-waste**  
   - Inference + tutor engine: ≤ 2 GB RAM on a typical 2020 phone  
   - Total app footprint (excluding model): ≤ 500 MB  
   - Target: usable performance (≥ 3–5 tokens/sec) on Snapdragon 665 / Exynos 9611 / equivalent class chips  
   - Low-power mode mandatory (CPU-only fallback, thermal throttling awareness)

3. **100% offline after initial setup**  
   Models, prompts, knowledge bundles, and conversation history stay on-device. No telemetry, no cloud calls.

4. **Simple, stable JSON interfaces**  
   All layers communicate via well-defined JSON messages. This makes plugins interchangeable and easy to test in isolation.

5. **Fork- and distro-friendly**  
   Anyone can fork the core, create a new backend, or bundle modules into a ready-to-install APK.

6. **Accessibility and inclusivity by default**  
   Voice-first support, large text, high-contrast themes, and neuropathy/ADHD-friendly interaction patterns (short responses, clear progress indicators) are core concerns, not afterthoughts.

## High-Level Architecture

```mermaid
graph TD
    A[User Interface Layer<br/>Chat / Voice / Quiz / Progress UI<br/>Pluggable skins & accessibility modes] 
    --> B[Tutor Engine Layer<br/>Socratic / pedagogy logic<br/>Memory & progress tracking<br/>Adaptation rules<br/>Conversation state]

    B --> C[Inference Core<br/>Pluggable backends<br/>• MediaPipe LLM Inference<br/>• MLC-LLM<br/>• llama.cpp via NDK<br/>• LiteRT-LM (future)]

    E[Plugin System<br/>• Subject modules (prompt sets + knowledge)<br/>• Pedagogy modules<br/>• Accessibility plugins<br/>• Knowledge bundles (bundled text files)] 
    --> B

    F[Offline Storage Layer<br/>SQLite for history/progress<br/>Bundled open educational resources<br/>Model cache] 
    --> B

    D[Hardware Abstraction Layer<br/>RAM/CPU/GPU/NPU detection<br/>Power & thermal management<br/>Android API abstractions] 
    --> C
