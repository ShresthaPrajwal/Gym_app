---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
planned_behaviors: ""
approved_sha256: "10f563cc59d651c68d4bf7b9edeb5a866874712816b448400fcb92ff6b3dd5ca"
---
## Exec Plan — Task T-design-renovate-9293y6
> Tests: N/A — interaction/UI change. No TDD ledger. Gated by exec-plan approval + verification report.

**Will build:**
- `VideoPlayerModal` component: centred overlay, 16:9 iframe embed, Escape/click-outside to close, "Watch on YouTube" link
- Wire into `ExerciseLibrary` — thumbnail click and "Open in YouTube / Demo" button both open it

**Approach:**
- New `src/pages/VideoPlayerModal.tsx`: fixed overlay, max-w-3xl centred panel, aspect-video iframe with autoplay, Escape key via useEffect, click-outside via overlay onClick
- Reuse `extractVideoId` already exported from `VideoThumbnail` (handles both ?v= and /shorts/)
- `ExerciseLibrary`: add `playerExercise: Exercise | null` state; pass `onPlay={() => setPlayerExercise(exercise)}` to VideoThumbnail; "Open in YouTube / Demo" button also sets playerExercise

**Boundaries & mocks:** YouTube embed (youtube.com/embed) — real in all environments. No fakes.

**Behaviors:**
- B-1: Clicking thumbnail opens centred modal with autoplay embed; clicking outside closes it
- B-2: Escape key closes modal
- B-3: "Watch on YouTube" link in modal footer opens original URL in new tab
- B-4 [e2e]: Full flow — open modal, see video, close — works in running app; Shorts URL embeds correctly

**PR will contain:**
- `src/pages/VideoPlayerModal.tsx` — new focused video modal
- `src/pages/ExerciseLibrary.tsx` — playerExercise state, VideoPlayerModal wired in

**Open questions / ambiguities:** None

**Path:** L (lean)
- [ ] Refactor pass done — before PR
