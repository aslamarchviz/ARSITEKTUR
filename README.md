# Architecture Portfolio — Stage 4 Verified

React + Vite + Tailwind CSS + Puck. Stage 4 enables visual section management on top of the previous stages: inline editing, image upload, persistence, drag/reorder, and now insertion, deletion, and duplication.

## Requirements

- Node.js 20.19+ (Node 22 LTS recommended)
- npm 10+

## Install

```bash
npm install
```

## Run locally

```bash
npm run verify
npm run dev
```

Open the URL printed by Vite, then use `#edit` for the editor:

```text
http://localhost:5173/#edit
```

## Verification

Run the dependency-free project check:

```bash
npm run verify
```

It validates package pinning, required source files, Stage 4 Puck permissions, DnD configuration, local persistence wiring, IndexedDB asset handling, default-data shape, and key safety checks.

The repository also includes `TEST_REPORT.md` with the latest verification status.

## Production build

```bash
npm run build
npm run preview
```

## Storage architecture

Editable page JSON is stored in `localStorage` under:

```text
architecture-portfolio:puck-data:v1
```

Local image files are stored in browser IndexedDB and referenced from the page JSON using IDs such as:

```text
idb-image:<uuid>
```

Unused local images are garbage-collected only after page data has been persisted. Cleanup is serialized so rapid edits do not race against one another, and duplicated components can safely share the same image asset.

## Stage 4 features

Enabled:

- Inline text/content editing
- Project, service and testimonial content editing
- Image upload and image URL input
- Automatic local persistence
- Puck Save/Publish action
- Reset local changes
- Desktop/tablet/mobile editor viewports
- Functional portfolio category filters
- Canvas drag/reorder
- Outline drag/reorder
- Add section
- Delete section
- Duplicate section
- Puck-generated unique component IDs for inserted/duplicated sections

Still planned for the next editor iteration:

- Freeform/absolute positioning
- Resize handles
- Global theme controls
- Per-element typography and colors
- Advanced responsive style controls
- Backend publishing/authentication

## Troubleshooting

### `npm install` hangs or shows `EAI_AGAIN`

That indicates the current machine cannot resolve or reach the npm registry. It is not a React/Vite runtime error. Check internet/DNS/proxy/VPN settings, then retry:

```bash
npm cache verify
npm install --no-audit --no-fund
```

### Browser shows old content

Open the editor and use **Reset local changes**, or clear site data for the local origin.
