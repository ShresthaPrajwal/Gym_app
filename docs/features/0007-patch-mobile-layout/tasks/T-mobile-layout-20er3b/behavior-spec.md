# Behavior Spec — T-mobile-layout-20er3b: Mobile layout
> Source: task card ACs + docs/features/0007-patch-mobile-layout/tasks/T-mobile-layout-20er3b/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: At a narrow viewport the diagram exposes only front-side regions plus a Front/Back switch. Pressing Back exposes back-only regions (e.g. Glutes), and selecting one calls `onSelect` with it.
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: At a narrow viewport, selecting a back-only muscle while Front is shown switches the diagram to Back.
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: At a wide viewport (or with no `matchMedia`) both bodies render with no switch. The existing AnatomyInspector tests stay green.
- Given:
- When:
- Then:

## B-4: AC-4 [behavior]: The active filter chip reports `aria-pressed="true"` and the others report `"false"`.
- Given:
- When:
- Then:

## B-5: AC-5 [e2e]: Exercise Library reports the rendered result count and selected muscle in one status line. Reset and empty-state reset work. Watch demo opens the video dialog with a YouTube link.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-6 [invariant]: No raw `<button>` in the App screen (nav uses the shared Button), and the cadence options read "N Days". — coverage:
- AC-7 [non-functional]: `tsc --noEmit` is clean and the full suite is green. — coverage:

