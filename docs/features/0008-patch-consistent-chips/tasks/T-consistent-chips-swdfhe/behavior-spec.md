# Behavior Spec — T-consistent-chips-swdfhe: Shared chip selector
> Source: task card ACs + docs/features/0008-patch-consistent-chips/tasks/T-consistent-chips-swdfhe/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: On Routine Builder, the Level, Days per week and Equipment selectors are named groups whose chips report `aria-pressed`. Picking "Beginner" presses it and un-presses "Intermediate".
- Given: the Routine Builder with its defaults (Intermediate, 5 Days, Full Facility)
- When: the user picks "Beginner" in the Level group
- Then: groups named Level, Days per week and Equipment exist; "Beginner" reports `aria-pressed="true"` and "Intermediate" `"false"`

## B-2: AC-2 [behavior]: On Nutrition, the Sex, Units, Activity level and Macro preset selectors are named groups whose chips report `aria-pressed`. Picking "Female" presses it and un-presses "Male".
- Given: the Nutrition page with its defaults (Male, Metric, Moderate, Moderate preset)
- When: the user picks "Female" in the Sex group
- Then: groups named Sex, Units, Activity level and Macro preset exist; "Female" reports `aria-pressed="true"` and "Male" `"false"`

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-3 [invariant]: No page-local `PillGroup`, `FilterRow` or `PillButton` remains. The Exercise Library chips and the anatomy Front/Back switch render through `ChipGroup`, and their existing tests stay green. — coverage:
- AC-4 [non-functional]: `tsc --noEmit` is clean, the full suite is green, and a phone-width (390px) check shows no horizontal page overflow. — coverage: tsc and the full suite at review; Playwright smoke at 390px

