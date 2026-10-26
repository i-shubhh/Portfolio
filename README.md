# Shubham Jha — Personal Portfolio & Technical Archive

An immersive, cinematic, editorial personal portfolio and technical digital exhibition for **Shubham Jha**, Computer Science & Engineering student specializing in Artificial Intelligence and Machine Learning at **SRM University–AP**.

---

## 🏛 Visual Architecture & Design Principles

- **Cinematic Exhibition Aesthetic**: Deep obsidian canvas (`#08080a`), high-legibility warm typography, single focal accent (Amber Gold, Signal Cyan, Sage Emerald, or Cinnabar Crimson).
- **Anti-Slop Restraint**: Zero pill badge capsules, no decorative pulsating dots, no `//` code comment titles, no fabricated metrics or client logos. Clean unboxed typographic metadata with subtle character separators (`·`, `/`).
- **Interactive Technical Centerpiece**: The **MRPL Sovereign AI Workbench** features a dedicated 5-tier architecture explorer (User Interface, Async Gateway, Deterministic Policy Guardrails, Hybrid RAG Orchestration, Local Model Inference, and Audit Ledger) with a live pipeline query simulator.
- **Top Bar Contract**: Wordmark (`SHUBHAM JHA`) — Single-line Navigation links — Action CTA (`Contact` / Search `/` / Palette customizer).
- **Interactive Lab**: Parametric Lissajous wave simulator, local LLM token throughput estimator, and AST security policy evaluator.

---

## 📂 Content Data Structure (Everything is Editable)

All personal content, project details, learning entries, and links are decoupled into type-safe files under `src/data/`:

| Data File | What You Can Edit |
| :--- | :--- |
| `src/data/profile.ts` | Name, headline, sub-intro, university, degree, expected graduation, availability status, editorial biography paragraphs, and philosophical subsections. |
| `src/data/projects.ts` | All project entries, covers, categories, problem statements, motivations, role, architecture nodes, technical decisions, trade-offs, lessons learned, and GitHub URLs. |
| `src/data/interests.ts` | The intellectual curiosity map categories, domain labels, summaries, deep reflections, and linked project references. |
| `src/data/skills.ts` | Programming, Frontend, Backend, AI & ML, and Tooling lists with authentic descriptions (no arbitrary progress bars). |
| `src/data/learning.ts` | The research notebook entries, dates, statuses (`EXPLORING`, `LEARNING`, `BUILDING`, `EXPERIMENTING`, `COMPLETED`), and takeaways. |
| `src/data/journey.ts` | Chronological educational and technical milestones starting from SRM University–AP admission. |
| `src/data/experiments.ts` | Experimental Lab projects, canvas prototypes, and technical tools. |
| `src/data/personalInterests.ts` | "Beyond the Code" entries: cinema, brutalist architecture, computing essays, and strategic disciplines. |
| `src/data/socialLinks.ts` | Direct email address (`ishubham0666@gmail.com`), GitHub profile, LinkedIn URL, and site configuration. |

---

## 🗂 Project Map

The project keeps source files grouped by responsibility:

```text
/
├── index.html              # Browser entry document
├── package.json            # Scripts and dependencies
├── vite.config.ts          # Vite configuration
├── .vscode/                # Editor and launch settings
└── src/
    ├── App.tsx             # Main page composition and app state
    ├── main.tsx            # React application entry point
    ├── index.css           # Global styles and design tokens
    ├── components/         # Reusable page sections and interactive UI
    ├── data/               # Editable portfolio content
    ├── assets/images/      # Portfolio imagery
    └── utils/              # Shared logic and its tests
```

Generated or machine-managed folders are intentionally kept out of the editor and search view:
`node_modules/`, `dist/`, `build/`, `coverage/`, and Vite caches. They can be recreated from
`package.json` and the lockfiles when needed.

## 🛠 Local Development & Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Compile and build for production
npm run build
```

---

## 🎨 Changing Themes & Accent Colors

1. **In-App Live Customizer**: Click the slider icon (`Sliders`) in the top navigation bar to open the **Archive Curator** drawer. You can toggle between:
   - Amber Gold (`#e5a93b`)
   - Signal Cyan (`#38bdf8`)
   - Sage Emerald (`#10b981`)
   - Cinnabar Crimson (`#f43f5e`)
2. **Permanent Default Accent**: Update `SITE_CONFIG.defaultAccent` in `src/data/socialLinks.ts` or the CSS variables in `src/index.css`.

---

## 📸 Updating Images & Screenshots

1. Place your project screenshots and portraits into `src/assets/images/`.
2. Update the corresponding image path in `src/data/profile.ts` (for your portrait) or `src/data/projects.ts` (for project covers).
