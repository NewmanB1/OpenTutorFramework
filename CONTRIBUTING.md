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

## Questions?
- Use [GitHub Discussions](link-to-discussions) for questions or ideas
- Open an issue for bugs or feature requests

We value effort and intention more than perfection. Let's turn e-waste into opportunity together!

Last updated: April 2026
