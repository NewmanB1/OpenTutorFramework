# Contributing to OpenTutor Framework

Thank you for wanting to help make free, private, offline tutors available on recycled Android phones! This project follows a "Linux kernel" philosophy: the core stays minimal and stable while the community builds plugins, subjects, and distros.

We welcome all skill levels — you don't need to be a programmer to contribute meaningfully.

## Code of Conduct
Be kind, respectful, and constructive. We want this to be an inclusive space for teachers, parents, students, developers, and recyclers.

## Ways to Contribute

### 1. As a Teacher / Educator (No Coding Required)
- Add or improve **subject modules** (prompt templates + knowledge bundles for math, history, languages, etc.)
- Share **pedagogy ideas** or example conversations
- Review existing modules for educational accuracy
- See [docs/pedagogy-guide.md](docs/pedagogy-guide.md) and [PLUGINS.md](PLUGINS.md)

### 2. As a Developer
- Implement a new inference backend
- Improve the Tutor Engine
- Add features to the plugin system
- Fix bugs or improve performance on old hardware
- Start by reading [ARCHITECTURE.md](ARCHITECTURE.md)

### 3. As a Tester / Recycler
- Test pre-built APKs on real discarded phones (2019–2023 models)
- Report performance numbers, heat issues, or battery impact
- Document which phones work well
- See [docs/hardware-testing.md](docs/hardware-testing.md)

### 4. Other Ways
- Improve documentation
- Create issue templates or GitHub workflows
- Spread the word (share success stories of turning old phones into tutors)
- Suggest new "distros" (e.g., a math-only version for middle school)

## How to Get Started (Small Steps)

1. **Look for "good first issues"** — We will label them clearly.
2. **Open an issue** first if you're planning something bigger than a small fix (especially for new plugins or major changes).
3. **Fork the repo** and create a branch with a clear name (e.g., `add-math-plugin` or `improve-voice-ui`).
4. **Submit a Pull Request** with a good description of what you changed and why.

## Development Setup
- Clone the repo
- Open in Android Studio
- Build the minimal example: `./gradlew assembleDebug`
- Test on a physical device (emulator is ok for early UI work, but real old phones are required for performance validation)

## Pull Request Guidelines
- Keep changes small and focused
- Update relevant documentation
- Ensure the app still respects the resource budget in [ARCHITECTURE.md](ARCHITECTURE.md)
- Test on at least one target-class phone if possible
- Reference any related issues

Plugin Loading
At startup, the core:

Scans the plugins/ directory (and assets folder in the APK).
Reads all manifest.json files.
Registers available subjects, pedagogy styles, and other modules.
Lets the user (or default settings) choose which ones to activate.

Plugins are loaded as read-only assets — they are safe and easy to update via new APK releases or sideloading.
Technical Details for Developers

Plugins are discovered at runtime via a simple PluginRegistry class.
The Tutor Engine combines the selected subject prompt + pedagogy rules + user input into a single prompt for the Inference Core.
All communication uses the JSON interfaces defined in ARCHITECTURE.md.
Advanced plugins can include small Kotlin/Java classes if needed (e.g., for custom scoring logic), but most can be pure JSON + text.

Best Practices

Keep prompts concise — old phones have limited context windows.
Use permissive licenses (MIT, Apache 2.0, CC0, CC-BY-SA).
Test on real low-end hardware (see docs/hardware-testing.md).
Include example conversations in the examples/ folder so others can see how your plugin behaves.
Document any prerequisites (e.g., "requires at least 4 GB RAM for this knowledge bundle").

Examples Included in This Repo

examples/minimal-math-plugin/ — A complete working example you can copy
examples/socratic-pedagogy/ — Default Socratic style

How to Submit a Plugin

Create your plugin following the structure above.
Open a Pull Request with your plugin folder.
Add a short description in the PR: what it teaches, target audience, and any testing notes.
We will review it for resource usage and educational value.

See CONTRIBUTING.md for general contribution guidelines.

This plugin system is deliberately simple so that a teacher with no programming experience can contribute a useful module in one afternoon, while still allowing advanced developers to extend it deeply.
Let's build a rich ecosystem of open tutoring modules together — turning discarded phones into personalized tutors for students everywhere.
Version: 0.1
Last updated: April 2026
textThis file is welcoming to non-technical contributors while still giving developers the details they need. It directly references your existing docs (`ARCHITECTURE.md` and `CONTRIBUTING.md`) to create a cohesive set.

### Quick Next Steps After Adding This
1. Create the folder `examples/minimal-math-plugin/` with a simple manifest and prompt so people have something concrete to copy.
2. Update your README.md to link to this new PLUGINS.md prominently.

Would you like me to:
- Write a sample `minimal-math-plugin` with actual files?
- Draft `pedagogy-guide.md` next?
- Create `docs/hardware-testing.md`?
- Or tweak anything in this PLUGINS.md (e.g., make it shorter, add more examples, change tone)?

Just tell me your preference and we'll keep the momentum going with the next small, useful pie


## Questions?
- Use [GitHub Discussions](link-to-discussions) for questions or ideas
- Open an issue for bugs or feature requests

We value effort and intention more than perfection. Let's turn e-waste into opportunity together!

Last updated: April 2026
