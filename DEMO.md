
# Schema errors

There were errors while attempting to compile the configuration of your Sanity Studio Schema types.

## Document type "galleryImage"

Path: galleryImage:document → fields → uploadedBy:reference → to → <unnamed_type_@_index_0>:user
Error: Unknown type: user.


# Demo Script — images_cms

This document is a concise, shareable step-by-step demo script you can use when presenting the `images_cms` application. It includes quick-start steps, an ordered walkthrough of the UI, places to capture screenshots, and a short checklist you can follow during a live demo.

## Purpose

- Provide a reproducible demo flow for the gallery, image upload, and modal details UI.
- Surface implementation points to talk through (Zustand store, `ImageModel`, responsive modal behavior).

## Prerequisites

- Node.js installed (v16+ recommended).
- Project dependencies installed.

## Quick Start (local)

Open a PowerShell terminal at the repository root and run:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Demo Flow (10–12 minutes)

1. Landing / Gallery (1 minute)

   - Navigate to the main page where the image gallery is displayed (`/` by default).
   - Talk about `components/imageGallery.tsx` + `components/imageCard.tsx` and how they render image tiles.
   - Screenshot: `screenshots/01-gallery.png`

2. Open Image Modal (2 minutes)

   - Click any image card to open the modal that shows the full image and metadata.
   - Highlight these points while the modal is open:
     - The modal is a client component and uses the Zustand hook from `src/app/lib/store.ts` to manage `isModalOpen` and the selected image.
     - Accessibility: `aria-labelledby` and `aria-modal` are present; pressing `Escape` closes the modal.
     - Responsive behavior: the modal uses a max-height and internal scrolling so header and close controls are never clipped.
   - Screenshot: `screenshots/02-modal-open.png`

3. Show Modal Header & Close (1 minute)

   - Scroll inside the modal and show the header remains visible (sticky header). Emphasize the UX fix for large/tall images.
   - Demonstrate top X and bottom close button both accessible.
   - Screenshot: `screenshots/03-modal-sticky-header.png`

4. Inspect Metadata (1 minute)

   - Point out metadata fields: description, dimensions, file size, uploaded date.
   - Show `src/app/lib/data/model.ts` to explain the `ImageModel` shape.
   - Screenshot: `screenshots/04-modal-metadata.png`

5. Upload Demo (2–3 minutes)

   - Open the upload form (`components/imageUploadForm.tsx`).
   - Demonstrate uploading a small test image (or use built-in mock-data upload flow). Explain server/API boundaries if uploads are stubbed.
   - After upload, show the new image appears in the gallery.
   - Screenshot: `screenshots/05-upload.png`

6. Admin Area (optional, 1 minute)

   - Navigate to `/admin` (if implemented) to show route-level layout separation in `src/app/admin/layout.tsx` and admin `page.tsx`.
   - Screenshot: `screenshots/06-admin.png`

7. Code Walkthrough Highlights (2–3 minutes)
   - `src/app/lib/store.ts`: show Zustand store usage and how client state is kept minimal.
   - `src/app/lib/data/mock-data.ts`: point to mock data for offline demos.
   - `components/modalComponent.tsx` (or `text.tsx` in this repo): show the Escape handler and sticky header technique.

## Responsive & Accessibility Checks (quick)

- Resize browser to small/mobile widths and show that modal width and image sizing adapt.
- Emulate a tall image on a laptop screen and confirm header is not clipped.
- Keyboard navigation: Tab through modal controls and press `Escape` to close.

## Screenshot Checklist

- [ ] `screenshots/01-gallery.png` — gallery view
- [ ] `screenshots/02-modal-open.png` — modal open, image visible
- [ ] `screenshots/03-modal-sticky-header.png` — modal scrolled, header visible
- [ ] `screenshots/04-modal-metadata.png` — metadata panel
- [ ] `screenshots/05-upload.png` — upload flow
- [ ] `screenshots/06-admin.png` — admin area (optional)

## Talking Points (quick bullets)

- Client/server separation: data comes from server mocks or API; UI interactivity is client-only.
- Why Zustand: tiny, predictable store for UI state without lifting state through many components.
- Modal UX: `max-h-[calc(100vh-...)]`, `overflow-y-auto`, and `sticky` header patterns to avoid clipping and improve usability.
- Next steps: add real API routes, persistence, images processing pipeline, and automated screenshots for CI demos.

## Troubleshooting (if something doesn't show)

- If the gallery is empty, open `src/app/lib/data/mock-data.ts` to seed images locally.
- If upload fails, check browser console and the terminal running `npm run dev` for server errors.

## Optional: Add screenshots

- Create a `screenshots/` folder at the repo root and save images with the filenames above. You can embed images into slides or include them in a `DEMO_PRESENTATION.md`.

---

Generated: December 01, 2025
