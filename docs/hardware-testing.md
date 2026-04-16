# Hardware Testing Guide

This guide defines a standardized process for evaluating OpenTutor performance on real-world, recycled Android devices (2019–2023 models).

The goal is to ensure **consistent, comparable results** across contributors and identify minimum viable hardware for reliable use.

---

## Target Device Profile

**Recommended specifications:**

* 4–8 GB RAM
* Android 10–14
* Snapdragon 600/700 series or equivalent MediaTek processors
* Minimum 2–4 GB free storage after installation

---

## Reference Devices

Common devices suitable for testing include:

* Google Pixel 3 / 3a / 4a
* Samsung Galaxy A series (A50, A51, A52)
* Motorola Moto G series (2020–2022)
* OnePlus Nord and older flagship models

---

## Test Categories

### 1. Core Performance

Measure baseline usability:

* **Time to first response (cold start)**
  (Launch app → first model response)

* **Response latency (steady state)**
  Average response time over 5–10 interactions

* **Memory stability**
  Monitor for slowdowns or OS-level app termination (OOM)

* **Battery usage**
  Percent battery drop over a 30-minute active session

* **Thermal behavior**
  Observe noticeable heat buildup affecting usability

---

### 2. Inference Performance

Evaluate model execution:

* Test multiple quantized models (e.g., 1B, 2B, 3B)
* Identify the largest model that remains responsive
* Note degradation patterns (lag, stutter, delayed tokens)
* Evaluate voice input/output responsiveness if enabled

---

### 3. Plugin Functionality

Verify system integration:

* Load and interact with the `basic-math` plugin
* Test **MeshSync** between two devices (send/receive content)
* Use **Rap Hero** and **Lesson Forge** modes
* Confirm stability when switching between plugins

---

### 4. Stress and Edge Conditions

Test real-world constraints:

* Low battery mode enabled
* Background applications active
* Extended conversation sessions (long context)
* Rapid switching between features

---

## Reporting Results

To ensure consistency, include the following in all test reports:

* **Device model and release year**
* **RAM (GB)**
* **Android version**
* **Model configuration** (e.g., 2B Q4)
* **Average response latency**
* **Battery usage (30 min session)**
* **Thermal observations**
* **Observed issues** (lag, crashes, instability)

---

### Performance Rating Scale

* **Excellent** — Smooth interaction, minimal latency, no instability
* **Good** — Minor lag, fully usable
* **Usable** — Noticeable lag, but functional
* **Too Slow** — Significantly degraded experience

---

### Example Report

```
Device: Moto G Power (2021)
RAM: 4 GB
Android: 11
Model: 2B Q4

Cold start: ~6 seconds
Average response: ~2.5 seconds
Battery usage (30 min): 12%
Thermals: Warm but stable

Issues: Slight lag on long responses
Rating: Good
```

---

## Testing Principles

* Prefer **real-world conditions** over ideal setups
* Test with **actual user interaction patterns**, not isolated benchmarks
* Prioritize **stability and usability** over maximum model size

---

## Goal

The purpose of this testing process is to:

* Define minimum viable hardware for OpenTutor
* Identify performance bottlenecks across device classes
* Enable reliable deployment in low-resource environments

---

Contributions from testers and recyclers are critical to ensuring OpenTutor remains accessible, efficient, and practical at scale.
