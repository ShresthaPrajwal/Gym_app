# Behavior Spec — T-gym-app-yby142: Routine Builder: full deterministic weekly plan (threshold/cadence/hardware/target → 7-day plan with instructions + video)
> Source: task card ACs + docs/features/0001-master-gym-app/tasks/T-gym-app-yby142/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: a user selects an adaptation threshold (Beginner/Intermediate/Advanced), a microcycle cadence (3/4/5/6 Days), and available hardware (Full Facility/Dumbbell Only/Bodyweight-Home) before choosing a primary target.
- Given:
- When:
- Then:

## B-2: AC-2 [behavior]: after the three selections above, choosing a primary target (Core Shred/Mass Hypertrophy/Lean Definition/Total Health/Peak Strength/Endurance) produces a full 7-day plan — exactly `cadence` days are training days matched to the target's focus, and the remaining days are explicit, clearly labeled rest/recovery days (never blank or missing days).
- Given:
- When:
- Then:

## B-3: AC-3 [behavior]: no exercise in the produced plan requires hardware outside the selected constraint (e.g. Bodyweight/Home never includes a barbell- or machine-only exercise).
- Given:
- When:
- Then:

## B-4: AC-5 [e2e]: selecting a day in the plan shows that day's exercises in a left column, each with its target muscle, sets/reps/rest, a short instructional cue for performing it, and a video thumbnail that plays in place (no navigating away from the page).
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-4 [invariant]: the same four selections always produce the identical 7-day plan (deterministic, no randomness); changing any one of the four selections recomputes and replaces the entire displayed plan. — coverage:

