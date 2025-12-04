# Folder Overview — images_cms

This file provides a concise, shareable overview of the repository structure, responsibilities for each folder/file, and where to look for important functionality. Use this when explaining the codebase to teammates or stakeholders.

Root layout
```
images_cms/
├── components/               # Reusable UI components
├── public/                   # Static assets (icons, placeholders, static images)
├── src/
│   └── app/                  # Next.js app-router entry (routes + layouts)
│       ├── admin/            # Admin route(s) and layouts
│       └── config/           # Server-side configuration helpers
│       └── lib/              # Client and server helpers, store, data
├── text.tsx                  # Client modal component (project-specific)
├── README.md                 # Project overview (already in repo)
├── DEMO.md                   # Demo script for presentations
├── ARCHITECTURE.md           # (optional) higher-level architecture notes
└── FOLDER_OVERVIEW.md        # (this file)
```

Top-level folders

- `components/`
  - Purpose: All reusable React components used by pages and other components.
  - Key files in this repo:
    - `imageCard.tsx` — single image tile used by the gallery.
    - `imageGallery.tsx` — renders a grid/list of `imageCard` components.
    - `imageUploadForm.tsx` — upload UI and client-side validation.
    - `meta_editor.tsx` — metadata editing UI (if present).
    - `modalComponent.tsx` — modal used to show full-size image + metadata.
    - `themeprovider.tsx` — theme wrapper for app styles and CSS variables.
    - `ui/Button.tsx` — small UI primitive reused across components.

- `public/`
  - Purpose: Serve static files directly by Next.js (public path `/`).
  - Typical contents: placeholder SVGs (`/placeholder.svg`), favicons, exported images.

- `src/app/`
  - Purpose: Next.js app-router root. Holds layouts, pages, and route subfolders.
  - Key entries:
    - `layout.tsx` — global layout (renders `children` and common wrappers).
    - `globals.css` — global Tailwind / base CSS for the app.
    - `page.tsx` — top-level page (gallery or landing page).
    - `actions.ts` — server-side or route actions (upload handlers, etc.).

  - `src/app/admin/`
    - Purpose: Admin UI separation; includes a route-level layout and admin page(s).
    - Key files: `layout.tsx`, `page.tsx` for admin features.

  - `src/app/config/`
    - Purpose: Configuration helpers used by server code (database connection, env helpers).
    - Key file: `DBConfig.ts` (database configuration surface; keep credentials in env files).

  - `src/app/lib/`
    - Purpose: Shared utilities, data layer helpers, client store.
    - Subfolders / files:
      - `store.ts` — Zustand store for UI state (modal open/close, selected image).
      - `utils.ts` — misc helpers used across components.
      - `data/` — dataset helpers and mock data for development:
        - `model.ts` — domain types/interfaces (e.g., `ImageModel`).
        - `mock-data.ts` — sample images used for local development demos.
        - `index.ts` — exports and helpers for the data layer.

- `text.tsx` (client-side modal)
  - Purpose: This repository includes `text.tsx` as a client component (modal). It contains the modal markup and uses the Zustand store. Look here for the Escape handler and the sticky header/modal responsiveness implementation.

Config & metadata files

- `next.config.ts` — Next.js runtime and build options.
- `tsconfig.json` — TypeScript settings.
- `package.json` — scripts and dependencies. Typical scripts:
  - `npm run dev` — run dev server
  - `npm run build` — create production build
  - `npm run start` — start production server

Where to make specific changes

- To change gallery UI: edit `components/imageGallery.tsx` and `components/imageCard.tsx`.
- To change modal behavior (accessibility, focus-trapping, header): edit `text.tsx` or `components/modalComponent.tsx`.
- To change how images are represented or seeded: edit `src/app/lib/data/model.ts` and `mock-data.ts`.
- To add server upload endpoints: add a route under `src/app/api/` (or implement server `actions.ts`) and wire the upload form to that endpoint.

Recommendations for maintainability

- Keep purely presentational components in `components/` and move page-specific logic into `src/app/*` pages or composable hooks.
- Keep the Zustand store minimal — only UI state (modal open/close, selected item). Persisted data should live on the server or in a dedicated data layer.
- Add `ARCHITECTURE.md` (if not already present) with a component dependency graph and a data flow diagram for uploads and retrievals.

Quick commands

```powershell
npm install
npm run dev
```

Want this exported as a single-page PDF or a printable diagram? I can generate a simple diagram (SVG/PNG) that maps component dependencies and data flow next. Tell me if you want a diagram, and whether you prefer a horizontal flow or vertical hierarchy. 
