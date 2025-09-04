### Rashid Siddique — Portfolio Webapp

Modern, open-source portfolio with AI chat (Gemini), dynamic profile data, and a 3D showcase built with React + Vite + TypeScript.

### Features
- Dynamic profile data via `data/profile.example.ts` with schema validation
- AI profile assistant powered by Gemini (optional)
- 3D section placeholder and rich animated UI

### Getting Started
1) Prerequisites: Node.js 18+
2) Install dependencies: `npm install`
3) Configure environment: create `.env` with `VITE_GEMINI_API_KEY=<your_key>` (optional)
4) Run locally: `npm run dev`

### Configure Your Profile
- Copy `data/profile.example.ts` to `data/profile.ts` and edit fields (name, title, about, experiences, projects, education, skills, social, sections).
- The app validates your data against `services/profileSchema.ts`. If validation fails, errors will be shown in the console.
 - Optional assets: put your resume at `public/resume.pdf` and your 3D model files under `models/` as `model.obj` and `model.mtl`.

### Security for Open Source
- Never commit secrets. Keep `.env` local; `.gitignore` excludes it.
- Avoid personal emails in code. Use profile `social.linkedin` for contact links.
- Review assets before publishing (resume, images, metadata).
- If you fork: replace any personal identifiers in `public/` and `metadata.json`.

### Build
- Production build: `npm run build`
- Preview: `npm run preview`

### Environment Variables
- `VITE_GEMINI_API_KEY` (optional): Enables AI chat. Without it, the app runs with chat disabled.

### Tech Stack
- React, TypeScript, Vite, TailwindCSS-like utility classes
- Zod for schema validation
- Google GenAI SDK for Gemini (optional)

### License
MIT. Please keep your own secrets and personal data out of the repo.
