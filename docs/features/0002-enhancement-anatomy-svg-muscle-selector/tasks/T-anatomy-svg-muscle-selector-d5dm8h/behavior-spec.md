# Behavior Spec — T-anatomy-svg-muscle-selector-d5dm8h: Clickable front/back anatomy diagram selector
> Source: task card ACs + docs/features/0002-enhancement-anatomy-svg-muscle-selector/tasks/T-anatomy-svg-muscle-selector-d5dm8h/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: clicking a muscle region in the diagram selects that muscle and narrows the exercise list to it; the selected region is rendered visually distinct from unselected regions.
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: the diagram names the current selection back to the user in its legend, and states that nothing is selected when no muscle is chosen.
- Given:
- When:
- Then:

## B-3: AC-4 [behavior]: regions visible only from behind (e.g. lats, glutes, hamstrings, trapezius) are selectable without any view toggle, because front and back are presented together.
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
- AC-3 [invariant]: every clickable region of the supplied diagram maps to a muscle in the vocabulary, and the regions the diagram draws as silhouette rather than muscle (head, feet) are inert — not selectable and never highlighted. — coverage:

