---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-26"
approved_sha256: "81c7d8534959dcfc41e93ff0e759680f6644dd45afd63b3888699ebc2c0bcfd4"
---
# Patch 0007 — Mobile layout: single-view anatomy diagram, scrolling filter chips, bottom tab bar

> Scope call-out: this sits at the top of the patch rung (3 behaviors, one task, one PR). It also
> restores the test suite to green: 0006 (Tests: N/A) regressed 2 tests, and 3 Exercise Library
> tests were already stale before 0006. If you'd rather split the suite repair into its own `fix`,
> reject this stamp and say so.

**Severity:** major
**Source:** user report (mobile review, 2026-09-26) + suite audit before starting this task

**Current behavior:**
- On a phone, the anatomy diagram draws front and back side by side inside one 1200-wide figure, so each body is ~65px wide and the regions are too small to read or tap.
- The Exercise Library filter chips (muscle group, difficulty, equipment, mechanics) have no horizontal padding and wrap across many lines inside a shaded box, so they read like a paragraph rather than a set of controls.
- The top nav crams three icon+label tabs into a phone-width strip, out of thumb reach.
- Suite: `App.test` fails (0006 swapped the nav's shared Button for raw `<button>`), `RoutineBuilder.test` fails (0006 renamed the "3 Days" cadence option to "3"), and 3 `ExerciseLibrary.test` cases assert copy/UI that no longer exists ("Indexed Drills: N", "Reset Matrix", a technique modal that nothing opens).

**Expected behavior:**
- Below the `md` breakpoint (768px) the anatomy diagram shows one body at a time, enlarged to fill the width, with a Front / Back switch above it. Selecting a muscle that only exists on the other side flips the view to that side. At `md` and up, both bodies stay side by side, as now.
- Each filter is one horizontally scrolling row of padded, bordered chips, with its label above it. The active chip is visibly distinct and exposes `aria-pressed`.
- Below `md`, the section nav is a fixed bottom tab bar (icon over short label). At `md` and up it stays a top tab bar under the header. Tabs use the shared Button.
- The Exercise Library reports its result count and muscle in one live status line ("Showing N exercises: Calves").
- The whole suite passes.

**Must NOT change:** Domain logic and data; the diagram's region geometry, region set, and region accessible names (`"<Label> region"`); the side-by-side desktop diagram; filter semantics; the design tokens in `tailwind.config.ts`.

## TSD S-0007.01 — Mobile layout: anatomy view switch, chip rows, bottom nav

| Aspect | Spec |
|--------|------|
| Interfaces | `AnatomyInspector({ selected, onSelect })` unchanged. New UI: a Front/Back switch (two buttons, `aria-pressed`) shown only below `md`. Filter chips gain `aria-pressed`. Exercise Library count readout becomes one `role="status"` line. |
| Data / State | `AnatomyInspector` holds a local `view: 'front' \| 'back'` (UI state only, default front). The viewport check reads `window.matchMedia('(max-width: 767px)')`. When `matchMedia` is unavailable, it falls back to the desktop layout. |
| Behavior | Narrow viewport: only the chosen body's regions render, enlarged. The switch flips the view. Selecting a region that is absent from the current view (via chips) flips to the side that has it. Wide viewport: both bodies render and there is no switch. |
| Boundaries | `window.matchMedia` (browser API): stubbed in the narrow-viewport test |
| Tests | Component tests (Vitest + RTL): narrow-viewport view switch; chip pressed state; nav/cadence regressions; repaired Exercise Library assertions |

## Task T-mobile-layout-20er3b — Mobile layout

**Slice:** narrow-viewport experience across the diagram, filters, and nav, plus a green suite
**Acceptance criteria:**
- [ ] AC-1 [behavior]: At a narrow viewport the diagram exposes only front-side regions plus a Front/Back switch. Pressing Back exposes back-only regions (e.g. Glutes), and selecting one calls `onSelect` with it.
- [ ] AC-2 [behavior]: At a narrow viewport, selecting a back-only muscle while Front is shown switches the diagram to Back.
- [ ] AC-3 [behavior]: At a wide viewport (or with no `matchMedia`) both bodies render with no switch. The existing AnatomyInspector tests stay green.
- [ ] AC-4 [behavior]: The active filter chip reports `aria-pressed="true"` and the others report `"false"`.
- [ ] AC-5 [e2e]: Exercise Library reports the rendered result count and selected muscle in one status line. Reset and empty-state reset work. Watch demo opens the video dialog with a YouTube link.
- [ ] AC-6 [invariant]: No raw `<button>` in the App screen (nav uses the shared Button), and the cadence options read "N Days".
- [ ] AC-7 [non-functional]: `tsc --noEmit` is clean and the full suite is green.

**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

## Execution Plan

**Approach:** Keep the one diagram component. Add a small viewport hook in it (`useSyncExternalStore` over `matchMedia`). On narrow viewports, render one `BodyPanel` with a viewBox cropped to that body and drop the callout labels, since at phone size they'd be unreadable. Move the title, hint and legend out of the SVG into HTML, so the text stays readable at any size. The chips become one reusable local `PillButton` style (bordered, padded, `shrink-0`) inside `overflow-x-auto` rows. The nav becomes a fixed bottom bar below `md` and a top bar from `md` up, built on the shared Button with the `pill` variant. Headings step down one size on mobile. On narrow screens the 7-day list in Routine Builder becomes a horizontal scroll strip. Everything is styled through the existing Tailwind tokens: no new CSS files, no new dependencies.
**Boundaries & mocks:** `window.matchMedia` is stubbed only in the narrow-viewport tests. Everything else is real.
**Behaviors (TDD order):**
- B-1: RED: AnatomyInspector test, narrow viewport: Front/Back switch, back-only regions appear after Back, and a back-only selection flips the view (AC-1, AC-2). GREEN: the viewport hook, view state, cropped single-panel rendering, HTML title/legend. AC-3 is held by the existing tests.
- B-2: RED: ExerciseLibrary tests. Add the chip `aria-pressed` assertion (AC-4) and repair the stale assertions to the shipped UI (status line, "Reset filters" / "Clear all filters", video dialog link) (AC-5). GREEN: chip rows, pressed state, status line, empty-state button copy.
- B-3: RED: the App and RoutineBuilder tests, which already fail on 0006's regressions (AC-6). GREEN: nav on the shared Button as a bottom bar below `md` / top bar from `md` up, "N Days" cadence labels, responsive heading sizes, day strip on mobile.
**Open questions:** none. Decided: callouts are hidden on the narrow view (the status line and the region highlight name the selection). `ExerciseTechniqueModal` is dead code (nothing opens it), but deleting it is out of scope and left for a follow-up.
