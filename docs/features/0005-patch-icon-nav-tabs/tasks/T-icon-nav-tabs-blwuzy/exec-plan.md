---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
approved_sha256: "bc1e91658fd86e2fcfc48aa1bd2ca3397c5eba915e9737fb6af510a2ad121eda"
---
## Exec Plan — Task T-icon-nav-tabs-blwuzy
> Derived verbatim from this patch's approved SPEC.md (`## Execution Plan` section) —
> the human's ONE spec stamp covers this plan (two-stamp ceremony, patch kind). Editing
> this file reopens its gate like any stamped artifact (stale hash → re-approve).

## Execution Plan
**Approach:**
- `App.tsx`: wrap each Button content in `flex flex-col items-center gap-1`; add a 16×16 inline SVG per tab (dumbbell for Routine Builder, magnifier for Exercise Library, leaf/apple for Nutrition Plan)
- `RoutineBuilder.tsx`: add a 20×20 SVG to each goal card above `meta.label` — one distinct icon per goal (target, muscle, flame, heart, bolt, timer)
- `ExerciseLibrary.tsx`: prepend a 14×14 icon to each filter group label span (person for Anatomy, bar-chart for Difficulty, wrench for Equipment, link for Mechanics)
- All SVGs inline, `currentColor`, `aria-hidden="true"`, `focusable="false"`

**Boundaries & mocks:** None

**Behaviors (TDD order):**
- B-1 [e2e]: Nav tabs render with icon + label and remain clickable

**Open questions:** none
