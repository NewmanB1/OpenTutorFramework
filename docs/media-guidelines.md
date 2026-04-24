# media guidelines

This document explains what types of media are supported in OpenTutor Framework and how to add them responsibly while staying true to the project's core principles (offline-first, lightweight, runs on old phones).

## Core Principle

**Small JSON content is first-class.**  
Large media files (videos, audio tracks, images) are secondary and must be added manually.

## What Works Well via Doorway MeshSync

- Short hint sequences
- Socratic question chains
- Rap lyrics and performance tips (Rap Hero mode)
- Success metadata and small knowledge snippets

These items are typically **2–10 KB each** and total **≤ 150 KB** per doorway pass. This is reliable even in a busy school entrance.

## What Does NOT Work via Doorway Sync

**Music videos, student-created videos, full rap performances, or any video file.**

Reasons:
- File sizes are too large (15–80+ MB per video)
- Transfer time exceeds the few seconds students spend walking through a doorway
- High concurrency in a school rush causes dropped connections and poor reliability
- Old phones struggle with large file I/O and battery drain

## Recommended Ways to Add Videos / Music Videos

1. **Manual Import (Recommended)**
   - Connect the phone to a computer via USB
   - Copy videos into the folder: `/OpenTutorVideos/` (or `/OpenTutorMedia/`)
   - The app will scan this folder and make videos available for Rap Hero contests or subject modules

2. **Quick Share / Bluetooth File Transfer**
   - Share videos directly from one phone to another (Android's built-in share sheet)
   - Useful between students or from teacher to class

3. **Optional Internet Update Plugin** (when enabled)
   - Teachers/parents can download approved video packs over Wi-Fi
   - This is **opt-in only** and clearly marked as non-primary

## Rap Hero / Music Video Contests

- The tutor can generate **lyrics** (small JSON — perfect for MeshSync)
- Students perform the rap using the phone’s microphone (Rap Hero mode)
- Students can film their own **music video** using the phone’s camera
- The resulting video stays on the device and can be shared manually (Quick Share / USB)
- Videos are **not** automatically distributed via doorway sync

## Best Practices

- Keep all synced content as small JSON files whenever possible
- Use descriptive filenames and metadata so the plugin system can route them correctly
- For video content, provide clear instructions in the plugin (e.g., “Place video files in /OpenTutorVideos/”)
- Always respect copyright — only use public domain, CC0, or personally created content
- Test on real low-end phones — if something feels slow or heavy, it probably is

## Summary Table

| Content Type              | Doorway MeshSync | Manual Import (USB/Quick Share) | Notes |
|---------------------------|------------------|----------------------------------|-------|
| Hints & Question Chains   | Yes              | Yes                              | Primary method |
| Rap Lyrics                | Yes              | Yes                              | Small JSON |
| Student Music Videos      | No               | Yes                              | Too large |
| Full Educational Videos   | No               | Yes                              | Use sparingly |
| Large Model Updates       | No               | Yes (optional internet)          | Wi-Fi preferred |

By keeping the doorway sync lightweight and handling media manually, we ensure the tutorbot remains fast, reliable, and usable on discarded Android phones.

Last updated: April 2026
