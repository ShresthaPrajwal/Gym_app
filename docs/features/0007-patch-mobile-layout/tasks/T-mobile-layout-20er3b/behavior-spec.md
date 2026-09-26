# Behavior Spec — T-mobile-layout-20er3b: Mobile layout
> Source: task card ACs + docs/features/0007-patch-mobile-layout/tasks/T-mobile-layout-20er3b/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> B-numbering follows the approved exec plan (B-1 diagram, B-2 filters, B-3 nav/regressions).

## B-1 (tracer bullet): AC-1 + AC-2 [behavior]: narrow-viewport diagram shows one side at a time, switched with Front/Back
- Given: a narrow viewport (`matchMedia('(max-width: 767px)')` matches) and the AnatomyInspector with nothing selected
- When: the user presses Back, then a back-only region; or the page's selection changes to a back-only muscle while Front is shown
- Then: only the shown side's regions are exposed and the pressed switch button reports `aria-pressed="true"`; the back-only region calls `onSelect` with its muscle; a back-only selection flips the view to Back with that region pressed

## B-2: AC-4 + AC-5 [behavior, e2e]: filter chips expose pressed state; the library reports its count in one status line
- Given: the Exercise Library
- When: the user picks a muscle chip, filters to a narrow set, resets, empties the results, and opens a demo
- Then: the active chip reports `aria-pressed="true"` and the others `"false"`; one `status` line reads "Showing N exercises" with the selected muscle; "Reset filters" and the empty state's "Clear all filters" restore the list; Watch demo opens the video dialog with a YouTube link

## B-3: AC-6 [invariant, guarded by existing tests]: nav uses the shared Button; cadence options read "N Days"
- Given: the App and Routine Builder screens
- When: they render
- Then: no raw `<button>` bypasses the design system (existing `App.test`), and the cadence option "3 Days" is selectable (existing `RoutineBuilder.test`). Both tests already fail on the 0006 regressions, so they are this cycle's RED.

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
- AC-3 [behavior]: At a wide viewport (or with no `matchMedia`), both bodies render with no switch. — coverage: the existing AnatomyInspector tests run with no `matchMedia` in jsdom and must stay green
- AC-7 [non-functional]: `tsc --noEmit` is clean and the full suite is green. — coverage: checked before `lane review`
