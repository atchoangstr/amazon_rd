# Material Library

A UI demo for browsing, selecting, and costing out Print-on-Demand production materials — built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. No backend; all data lives in `src/data/materials.json`.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/materials.json       Local dataset (23 SKUs across 4 categories)
  types/material.ts         Material type + category order
  lib/utils.ts               cn() helper, currency/weight formatters
  components/
    ui/                      Checkbox, Switch, AnimatedNumber primitives
    Sidebar.tsx              Category nav + dark mode toggle
    SearchBar.tsx            Sticky search
    CategorySection.tsx      Section title + responsive grid
    MaterialCard.tsx         Product card with hover + selection states
    HoverPopup.tsx           Glassmorphism spec-sheet popup
    SummaryPanel.tsx         Sticky right-hand cost/weight summary
    MobileSummaryDrawer.tsx  Bottom-sheet summary for small screens
    StatusStates.tsx         Empty state + loading skeleton
  App.tsx                    Layout + state (search, selection, dark mode)
```

## Notes

- Product photos are placeholders from Picsum, seeded per SKU so they stay consistent across reloads. Swap `image` URLs in `materials.json` for real product photography (drop files into `public/images/...` and point to `/images/...`) whenever it's ready.
- Selection state, search, and totals are all client-side — nothing is persisted between reloads by design (this is a browsing/estimation demo).
