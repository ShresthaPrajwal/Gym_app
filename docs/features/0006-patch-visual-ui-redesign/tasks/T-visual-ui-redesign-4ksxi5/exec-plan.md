---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-26"
approved_sha256: "5a14e073dbfb3ff6ff76673ace8cfe34881436c56ded7068cdd329ff4e386eae"
---
## Exec Plan — Task T-visual-ui-redesign-4ksxi5
> Derived verbatim from this patch's approved SPEC.md (`## Execution Plan` section) —
> the human's ONE spec stamp covers this plan (two-stamp ceremony, patch kind). Editing
> this file reopens its gate like any stamped artifact (stale hash → re-approve).

## Execution Plan

**Approach:** Edit className strings and a small amount of JSX in five files. No new components, no new files, no logic changes.

**Boundaries & mocks:** None

**Behaviors (TDD order):**
- B-1: Redesign nav tabs in App.tsx — replace Button variant="primary/secondary" with plain button elements using an underline-indicator active state (border-b-2 border-primary-container for active, transparent for inactive, no background fill on any tab)
- B-2: Remove "Algorithmic Program Engine" eyebrow from RoutineBuilder.tsx; change ALL-CAPS section label strings to sentence case (e.g. "Training goal", "7-day plan", "Cues"); simplify meta strings
- B-3: In NutritionPlan.tsx, change ALL-CAPS field labels and section labels to sentence case; give stat cards (BMR/TDEE/Calories) larger metric number size using text-metric-lg/text-metric-huge
- B-4: In ExerciseLibrary.tsx, change ALL-CAPS filter/section labels to sentence case

**Open questions:** none
