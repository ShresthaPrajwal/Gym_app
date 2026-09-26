---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-26"
approved_sha256: "51242e4b965093fd6fd1a4824ed26c935f5489b951661efe192c3c1805d4f3cd"
---
## Exec Plan — Task T-consistent-chips-swdfhe
> Derived verbatim from this patch's approved SPEC.md (`## Execution Plan` section) —
> the human's ONE spec stamp covers this plan (two-stamp ceremony, patch kind). Editing
> this file reopens its gate like any stamped artifact (stale hash → re-approve).

## Execution Plan

**Approach:** Lift 0007's `FilterRow` + `PillButton` from ExerciseLibrary into `src/components/ChipGroup.tsx` as one options-driven component, built on the shared Button (`pill` variant) and existing Tailwind tokens. Drop the negative-margin bleed, so the row works in any container (card, grid column, or the anatomy header). Swap every page-local group for `ChipGroup` and delete the local copies. On Nutrition, change the form grid from `sm:grid-cols-2` to `md:grid-cols-2` so phones get one column, and drop the old equal-width `flex-1` pills.
**Boundaries & mocks:** none
**Behaviors (TDD order):**
- B-1: RED: RoutineBuilder.test and NutritionPlan.test assert that the named selector groups exist and that choosing an option moves `aria-pressed` to it (AC-1, AC-2). GREEN: add `ChipGroup` and move Routine Builder and Nutrition onto it.
- Refactor: move Exercise Library and the anatomy switch onto `ChipGroup` and delete `FilterRow`/`PillButton`, with the suite green throughout (AC-3). Their existing tests already cover this.
**Open questions:** none
