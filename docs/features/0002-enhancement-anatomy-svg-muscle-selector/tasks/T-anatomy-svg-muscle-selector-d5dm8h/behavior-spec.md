# Behavior Spec — T-anatomy-svg-muscle-selector-d5dm8h: Clickable front/back anatomy diagram selector
> Source: task card ACs + docs/features/0002-enhancement-anatomy-svg-muscle-selector/tasks/T-anatomy-svg-muscle-selector-d5dm8h/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.
>
> NOTE: numbering follows the APPROVED exec plan, which differs from this file's scaffold.
> The plan drives AC-3 as a real cycle (B-2) rather than leaving it an off-ledger invariant,
> because it fails at the task base: the placeholder figure exposes only 9 of the 17 regions
> the diagram depicts. AC-2 and AC-4 are grouped into B-3 as the plan states, since both are
> observations of the same single rendered view.

## B-1 (tracer bullet): AC-1 [behavior]: clicking a muscle region in the diagram selects that muscle and narrows the exercise list to it; the selected region is rendered visually distinct from unselected regions.
- Given: the anatomy inspector rendered with nothing selected, and a selection handler supplied by
  the host page
- When: the user activates the `calves` region control — a region the supplied diagram depicts but
  the placeholder figure never exposed, so a passing result cannot be inherited from the old component
- Then: the handler is invoked with exactly that region, which is how the host page's muscle filter
  is driven (the inspector itself holds no filter state, per the TSD)

## B-2: AC-3 [invariant, driven as a cycle — see note above]: every region the diagram depicts is selectable, and the silhouette-only regions are inert.
- Given:
- When:
- Then:

## B-3: AC-2 + AC-4 [behavior]: the legend names the current selection (and says so when there is none), and back-only regions are selectable with no view toggle.
- Given:
- When:
- Then:

## B-4: AC-5 [e2e]: in the running app a user opens the Exercise Library, clicks a muscle on the anatomy diagram, and sees the list narrow to that muscle's exercises with the legend naming the selection.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- None. AC-3 is tagged `invariant` on the card but is driven as cycle B-2: a `--regression` guard
  must pass at the task base, and this assertion fails there because the placeholder figure exposes
  only 9 of the 17 depicted regions (missing neck, forearms, obliques, hip-flexors, knees, calves,
  glutes and lower-back). That makes it new behavior by definition.
- Not assertable by this suite, and deliberately not claimed as covered: whether the rendered
  diagram is *visually* faithful to the supplied asset. The exec plan records this as accepted risk
  — the paths are transcribed rather than re-drawn, and the owner reviews the running page.
