# Plan of Action & Milestones (POA&M)

## OpenTutorFramework Documentation Remediation

**Prepared by:** Expert Documentation Auditor
**Date:** April 20, 2026
**Owner:** Brian Newman
**Version:** 1.2 (Hardened Governance + Drift Prevention Update)

---

## Key Structural Changes (v1.2)

1. Single Source of Truth enforced: `docs/IMPLEMENTATION_STATUS.md`
2. CI enforcement added (Phase 4.3 expanded)
3. Standardized status taxonomy introduced
4. Explicit table schema defined
5. Dependencies tightened (especially Phase 3)
6. Definition of Done added for all critical phases

---

# Global Standard: Plugin Status Schema (MANDATORY)

All plugin entries in `docs/IMPLEMENTATION_STATUS.md` MUST use:

| Field                | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| Plugin Name          | Unique identifier                                               |
| Status               | Not Started / Prototype / Partial / Verified / Production-Ready |
| Last Verified Commit | Git SHA                                                         |
| Test Coverage        | None / Partial / Full                                           |
| Known Gaps           | Explicit bullet list                                            |
| Owner                | Responsible maintainer                                          |
| Notes                | Optional context                                                |

---

# Global Status Definitions (MANDATORY)

* Not Started – No implementation exists
* Prototype – Exists but untested or unstable
* Partial – Works in limited scenarios; documented gaps exist
* Verified – Tested, validated against expected behavior
* Production-Ready – Fully tested, documented, CI-validated, stable

---

# Definition of Done (GLOBAL RULE)

A task is only complete when:

* Source code or documentation is updated
* `docs/IMPLEMENTATION_STATUS.md` is updated accordingly
* No contradictory claims exist in README.md or PLUGINS.md
* CI checks pass (where applicable)
* Entries conform to schema exactly

---

# POA&M TABLE

| Phase / ID    | Audit Finding / Risk Area                     | Priority | Action(s) – Step-by-Step                                                                                                                                                                                                                                                                                             | Deliverable / Evidence of Completion                                             | Target Date (2026) | Est. Effort | Dependencies | Status  |
| ------------- | --------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------ | ----------- | ------------ | ------- |
| 1.1 (Revised) | Plugin drift + inconsistent capability claims | High     | 1. Create `docs/IMPLEMENTATION_STATUS.md` using mandatory schema<br>2. Remove all direct capability claims from README/PLUGINS<br>3. Replace with single-source references only<br>4. Add System Status section linking to file<br>5. Enforce CI rule blocking PR if status file not updated when plugin docs change | Single source status file + cleaned README.md + PLUGINS.md + CI enforcement rule | Apr 22             | 6 hours     | None         | Planned |
| 1.2           | MODELS.md + hardware-testing.md thin          | High     | Expand with real metrics, benchmarks, and validation notes                                                                                                                                                                                                                                                           | Updated technical docs linked to STATUS.md                                       | Apr 23             | 4 hours     | 1.1          | Planned |
| 1.3           | Security model incomplete                     | High     | Expand threat model, include abuse cases + mitigation matrix                                                                                                                                                                                                                                                         | SECURITY_AND_SAFETY_MODEL.md updated                                             | Apr 24             | 3 hours     | 1.1          | Planned |
| 2.1           | Source code not fully documented              | High     | Ensure src/ is visible, add rationale headers                                                                                                                                                                                                                                                                        | Fully exposed source + annotated structure                                       | Apr 27             | 12–16 hours | 1.1          | Planned |
| 2.2           | Architecture documentation gaps               | High     | Add tutor-turn diagram + system flow visualization                                                                                                                                                                                                                                                                   | Updated ARCHITECTURE.md                                                          | Apr 29             | 4 hours     | 2.1          | Planned |
| 3.1           | Weak rationale / "why" missing                | Medium   | Add decision records tied to STATUS.md maturity levels                                                                                                                                                                                                                                                               | Decision logs integrated into docs                                               | May 5              | 8–10 hours  | 2.1 + 2.2    | Planned |
| 3.2           | TODO sprawl + inconsistency                   | Medium   | Remove all TODOs or convert into tracked issues                                                                                                                                                                                                                                                                      | Clean CONTRIBUTING.md                                                            | May 7              | 3 hours     | 3.1          | Planned |
| 4.1           | Over-reliance on LLM prose                    | Medium   | Create LLM_WORKFLOW_CHECKLIST.md + PR template enforcement                                                                                                                                                                                                                                                           | Checklist + PR workflow                                                          | May 12             | 4 hours     | None         | Planned |
| 4.2           | Missing changelog + roadmap                   | Medium   | Create CHANGELOG.md + ROADMAP.md linked to STATUS.md                                                                                                                                                                                                                                                                 | Versioned changelog + roadmap                                                    | May 14             | 3 hours     | None         | Planned |
| 4.3           | No enforcement / governance layer             | High     | Add GitHub Actions:<br>• Block drift between README/STATUS.md<br>• Validate schema compliance<br>• Require STATUS.md updates when plugin docs change<br>• Quarterly audit trigger                                                                                                                                    | CI pipeline enforcing documentation integrity                                    | May 21             | 5–6 hours   | All prior    | Planned |

---

# Critical Governance Additions

## CI Enforcement Rules (MANDATORY)

PR fails if:

* README.md or PLUGINS.md changed without STATUS.md update
* STATUS.md violates schema
* Plugin status contradicts implementation state

---

## System Integrity Principle

All claims about system behavior must trace back to `docs/IMPLEMENTATION_STATUS.md`.

---

## Architectural Intent

This POA&M prioritizes:

* Elimination of duplicated truth
* Machine-enforced documentation integrity
* Traceable system reality over narrative documentation
