# Behavior Spec — T-gym-app-dmxlo7: Nutrition plan calculator
> Source: task card ACs + docs/features/0001-master-gym-app/tasks/T-gym-app-dmxlo7/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: given gender, age, height, weight, and activity level, calculating a plan returns BMR, TDEE, calorie target, and a protein/carb/fat gram breakdown.
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: the returned plan includes baseline daily vitamin/mineral guidance values.
- Given:
- When:
- Then:

## B-3: AC-4 [e2e]: a user opens the Nutrition page, submits the form, and sees the computed plan rendered with no network request made.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-3 [non-functional]: BMR/TDEE/macro output matches hand-calculated reference values (one male case, one female case) within 1%. — coverage:

