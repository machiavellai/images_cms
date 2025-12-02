# images_cms

This README documents the project structure and app breakdown for the `images_cms` Next.js application. Use this file as a shareable overview when showcasing the app's architecture, component layout, and how to run it locally.

**Quick Notes**

- **Framework:** Next.js (app-router).
- **UI:** Tailwind CSS (utility classes present in source).
- **State:** Small client-side store (Zustand) used for UI state like the modal.

**Quick Start**

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Start production preview: `npm run start`

**Project Folder Overview**

```
images_cms/
├── components/               # Reusable UI components
│   ├── imageCard.tsx
│   ├── imageGallery.tsx
│   ├── imageUploadForm.tsx
│   ├── meta_editor.tsx
│   ├── modalComponent.tsx
│   ├── themeprovider.tsx
│   └── ui/
│       └── Button.tsx        # Small UI primitives
├── public/                   # Static assets (icons, placeholders, static images)
├── src/
│   └── app/                  # Next.js app-router entry (routes + layouts)
│       ├── actions.ts
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.tsx
│       ├── admin/
│       │   ├── layout.tsx
│       │   └── page.tsx
│       └── config/
│           └── DBConfig.ts
│       └── lib/
│           ├── store.ts      # Zustand store for client UI state
│           ├── utils.ts
│           └── data/
│               ├── index.ts
│               ├── mock-data.ts
│               └── model.ts  # Domain model (ImageModel)
├── text.tsx                   # (client) modal component + sample UI (project-specific)
├── next.config.ts
├── tsconfig.json
├── package.json
└── other config files
```

**App Structure & Responsibilities**

- **`src/app/`**: The application route tree. Holds global layout and route-level layout files and pages. Use these files to define top-level layout, metadata, and route behavior.
- **`src/app/admin/`**: Admin area routes and layouts. Keeps administration UI separate from public pages.
- **`src/app/config/DBConfig.ts`**: Database or API configuration surface for server code. Keep secrets out of the frontend — use environment variables.

**UI & Components**

- **`components/`**: Houses the app's presentational and container React components.
  - `imageGallery.tsx` and `imageCard.tsx` render the grid and individual image cards.
  - `imageUploadForm.tsx` contains upload controls and validation logic.
  - `modalComponent.tsx` (client) shows a full-size image and metadata. It uses a Zustand store hook for `isModalOpen` and `closeModal`.
  - `ui/Button.tsx` exposes a styled button primitive used across components.

**State & Data**

- **Zustand store (`src/app/lib/store.ts`)**: Used for lightweight UI state (modal open/close, selected image). Advantages: small API surface and works well with client components.
- **Data folder (`src/app/lib/data/`)**: Contains `model.ts` defining `ImageModel`, mock data for local development in `mock-data.ts`, and an index for dataset helpers.

**Public assets**

- Add static images, placeholder SVGs, and any publicly-served files to the `public/` directory. Example: placeholder used by the modal is referenced as `/placeholder.svg`.

**Important Files & Config**

- `next.config.ts`: Next.js runtime/build configuration.
- `package.json`: Scripts and dependencies. Typical scripts used:
  - `npm run dev` — starts development server
  - `npm run build` — production build
  - `npm run start` — production server
- `tsconfig.json`: TypeScript configuration for project type-safety.

**Styling & Responsiveness**

- The project uses Tailwind utility classes for layout and responsiveness. Example patterns you can reuse when designing responsive modals:
  - Use `max-h-[calc(100vh-4rem)]` and `overflow-y-auto` on modal containers to prevent viewport clipping.
  - Make headers `sticky top-0` (with a background) so title and close button remain visible when content scrolls.
  - Use `h-[min(60vh,24rem)]` for image containers to scale images by viewport height.

**Accessibility & UX Suggestions**

- Trap focus inside open modals (use `focus-trap-react` or similar) and return focus to the triggering control on close.
- Provide `aria-labelledby` and `aria-modal` on modal containers (already present in the codebase).
- Ensure keyboard escape closes modals (the current modal has an Escape handler in the client-side component).

**How to Present / Demo This Repo**

- Start dev server: `npm run dev` and open `http://localhost:3000`.
- Showcase:
  1.  Open the gallery to show `imageGallery` + `imageCard` rendering.
  2.  Trigger the modal to show full-size image details and explain the client-store integration (the modal component uses Zustand to control visibility).
  3.  Open `src/app/lib/data/mock-data.ts` to show how images are modeled with `ImageModel`.

**Next Steps / Possible Enhancements**

- Add API routes or server functions for persistent uploads and metadata (e.g., `src/app/api/images/route.ts`).
- Add end-to-end tests for upload + gallery cycles.
- Add image optimization and processing pipeline (sharp or serverless functions) if large files are expected.

If you'd like, I can also:

- Add a generated `ARCHITECTURE.md` with diagrams and component dependency graphs.
- Add a short demo script `DEMO.md` with step-by-step screenshots to use when presenting.

---

Generated on: December 01, 2025

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
