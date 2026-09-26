---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-26"
planned_behaviors: 2
approved_sha256: "46702802c1a7cfd774430dba10276276a56ce23c43358fd6e960ee8610f5154a"
---
## Exec Plan — Task T-mobile-layout-20er3b
> Derived verbatim from this patch's approved SPEC.md (`## Execution Plan` section) —
> the human's ONE spec stamp covers this plan (two-stamp ceremony, patch kind). Editing
> this file reopens its gate like any stamped artifact (stale hash → re-approve).

## Execution Plan

**Approach:** Keep the one diagram component. Add a small viewport hook in it (`useSyncExternalStore` over `matchMedia`). On narrow viewports, render one `BodyPanel` with a viewBox cropped to that body and drop the callout labels, since at phone size they'd be unreadable. Move the title, hint and legend out of the SVG into HTML, so the text stays readable at any size. The chips become one reusable local `PillButton` style (bordered, padded, `shrink-0`) inside `overflow-x-auto` rows. The nav becomes a fixed bottom bar below `md` and a top bar from `md` up, built on the shared Button with the `pill` variant. Headings step down one size on mobile. On narrow screens the 7-day list in Routine Builder becomes a horizontal scroll strip. Everything is styled through the existing Tailwind tokens: no new CSS files, no new dependencies.
**Boundaries & mocks:** `window.matchMedia` is stubbed only in the narrow-viewport tests. Everything else is real.
**Behaviors (TDD order):**
- B-1: RED: AnatomyInspector test, narrow viewport: Front/Back switch, back-only regions appear after Back, and a back-only selection flips the view (AC-1, AC-2). GREEN: the viewport hook, view state, cropped single-panel rendering, HTML title/legend. AC-3 is held by the existing tests.
- B-2: RED: ExerciseLibrary tests. Add the chip `aria-pressed` assertion (AC-4) and repair the stale assertions to the shipped UI (status line, "Reset filters" / "Clear all filters", video dialog link) (AC-5). GREEN: chip rows, pressed state, status line, empty-state button copy.
- B-3: RED: the App and RoutineBuilder tests, which already fail on 0006's regressions (AC-6). GREEN: nav on the shared Button as a bottom bar below `md` / top bar from `md` up, "N Days" cadence labels, responsive heading sizes, day strip on mobile.
**Open questions:** none. Decided: callouts are hidden on the narrow view (the status line and the region highlight name the selection). `ExerciseTechniqueModal` is dead code (nothing opens it), but deleting it is out of scope and left for a follow-up.
