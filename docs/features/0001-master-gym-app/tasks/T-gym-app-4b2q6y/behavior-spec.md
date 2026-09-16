# Behavior Spec — T-gym-app-4b2q6y: Exercise & anatomy library: search, filters, inspector, technique modal
> Source: task card ACs + docs/features/0001-master-gym-app/tasks/T-gym-app-4b2q6y/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: given a search text and/or anatomy group, difficulty, equipment, and mechanics filters, filtering returns only exercises matching every active filter (filters combine with AND; an unset filter/"all"/"any" doesn't narrow on that criterion).
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: a filter combination with no matching exercises returns an empty list.
- Given:
- When:
- Then:

## B-3: AC-4 [behavior]: the visible result count always equals the number of rendered exercise cards; a reset action restores every filter to its default and the full list.
- Given:
- When:
- Then:

## B-4: AC-5 [behavior]: selecting an anatomy group updates the anatomy inspector's highlighted region; toggling anterior/posterior changes the displayed body view without changing the selected anatomy group or the filtered list.
- Given:
- When:
- Then:

## B-5: AC-6 [e2e]: a user opens the Exercise Library, searches and applies anatomy/difficulty/equipment/mechanics filters, sees the narrowed cards and matching count; sees the no-results state (with a working reset) when a combination matches nothing; opens an exercise's technique modal (showing its name, cues, and a YouTube-search link) and closes it; and can use "Add to Routine" without error.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-3 [invariant]: every returned exercise carries a well-formed video reference and a non-empty ordered list of execution cues. — coverage:

