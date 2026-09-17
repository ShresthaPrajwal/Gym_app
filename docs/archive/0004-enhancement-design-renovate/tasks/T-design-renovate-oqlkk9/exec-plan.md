---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
planned_behaviors: ""
approved_sha256: "d706ef585f38d5b6b4987c5a39d35034885d381af32f291415768048d0494389"
---
## Exec Plan — Task T-design-renovate-oqlkk9
> Tests: N/A — layout/UX change. No TDD ledger.

**Will build:**
- Nav: flex-wrap + min-h-[44px] on tab buttons so all three fit on 375px without overflow
- PageLayout: already has responsive padding; no change needed
- ExerciseLibrary: fix duplicate "Indexed Drills" label in stat box
- ExerciseLibrary: muscle group pill row already uses flex-wrap; verify no overflow on mobile

**Approach:**
- `App.tsx` nav: add `flex-wrap` to the nav, `min-h-[44px]` to each Button via className
- `ExerciseLibrary.tsx`: fix the stat box — "Indexed Drills: {results.length}" has the label duplicated; strip inline "Indexed Drills:" prefix, keep just the count
- Audit `ExerciseLibrary.tsx` header row — `flex-col lg:flex-row` already collapses correctly
- Card layout already handles mobile from task 1 (flex-col on mobile)

**Boundaries & mocks:** None

**Behaviors:**
- B-1: Nav tabs wrap on 375px, each tab ≥44px tall, no horizontal overflow
- B-2: All three nav tabs remain tappable on 375px
- B-3 [e2e]: Full app usable at 375px — no horizontal scroll anywhere, all tap targets reachable

**PR will contain:**
- `src/App.tsx` — nav flex-wrap + min-h-[44px]
- `src/pages/ExerciseLibrary.tsx` — fix duplicate stat label

**Open questions / ambiguities:** None

**Path:** L (lean)
- [ ] Refactor pass done — before PR
