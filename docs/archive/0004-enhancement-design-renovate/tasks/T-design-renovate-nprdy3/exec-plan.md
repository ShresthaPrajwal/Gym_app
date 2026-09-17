---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
planned_behaviors: ""
approved_sha256: "af074dba9b6702d9974762a803671c9bc4b355934bf3c46cc5515b4db05ca0a6"
---
## Exec Plan — Task T-design-renovate-nprdy3
> Tests: N/A — visual layout change. No TDD ledger. Gated by exec-plan approval + verification report.

**Will build:**
- Restyled exercise result cards: two-column on desktop (thumbnail left ≥260px, metadata right), stacked on mobile

**Approach:**
- In `ExerciseLibrary.tsx`: change the card's flex layout from `flex gap-sm` to `flex-col md:flex-row`; make thumbnail `aspect-video w-full md:w-[280px] shrink-0`
- `VideoThumbnail`: remove `playing` state (play fires `onPlay` prop instead); thumbnail fills its container via `w-full h-full object-cover`
- Badges and cues stay in the right column; action buttons pin to the bottom of the right column

**Boundaries & mocks:** YouTube thumbnail CDN — real in all environments (img.youtube.com). No fakes needed.

**Behaviors:**
- B-1: Desktop card (≥768px) shows thumbnail left ≥260px wide, content right — matches reference image layout
- B-2: Mobile card (<768px) stacks thumbnail on top, content below, no overflow-x
- B-3 [e2e]: Full exercise list renders correctly at both 1280px and 375px viewports

**PR will contain:**
- `src/components/VideoThumbnail.tsx` — remove internal playing state, accept `onPlay` callback
- `src/pages/ExerciseLibrary.tsx` — new card layout, pass `onPlay` to VideoThumbnail

**Open questions / ambiguities:** None

**Path:** L (lean)
- [ ] Refactor pass done (on green; tests unchanged) — before PR
