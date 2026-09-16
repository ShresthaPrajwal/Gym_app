# Behavior Spec — T-gym-app-yby142: Routine Builder: full deterministic weekly plan (threshold/cadence/hardware/target → 7-day plan with instructions + video)
> Source: task card ACs + docs/features/0001-master-gym-app/tasks/T-gym-app-yby142/snapshot-TSD.md + exec-plan.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Renumbered from the exec plan: B-1 covers AC-2+AC-4 (domain shape + determinism), B-2
> covers AC-3 (hardware constraint), B-3 covers AC-1+AC-5 (full UI e2e).

## B-1 (tracer bullet): AC-2 [behavior] + AC-4 [invariant]: generating a weekly plan returns a full 7-day week with exactly `cadence` training days and the rest explicit rest days, deterministically.
- Given: goal `bulk`, experience `intermediate`, cadence `5`, hardware `full`
- When: the weekly plan is generated for these inputs
- Then: the result has exactly 7 entries; exactly 5 are training days (non-empty exercise lists) and exactly 2 are explicit rest days; calling generation again with the same 4 inputs returns an identical result

## B-2: AC-3 [behavior]: no exercise in the produced plan requires hardware outside the selected constraint.
- Given: goal `bulk`, experience `intermediate`, cadence `5`, hardware `bodyweight`
- When: the weekly plan is generated for these inputs
- Then: every exercise across every training day has a hardware requirement of `bodyweight` only (never `dumbbell` or `full`)

## B-3 (e2e): AC-1 [behavior] + AC-5 [e2e]: a user picks threshold/cadence/hardware, then a target, sees the full 7-day plan, and can inspect a day's exercises with a playable video thumbnail.
- Given: the Routine Builder page is open
- When: the user selects an adaptation threshold, a microcycle cadence, available hardware, then a primary target, then clicks a training day in the day list, then clicks an exercise's video thumbnail
- Then: the full 7-day plan is rendered (rest days visibly labeled, no day missing); the selected day's exercises appear with target muscle, sets/reps/rest, and instructions; the clicked video thumbnail is replaced by a playable embed

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-4 [invariant]: determinism — covered directly inside B-1's test (repeated-call assertion), not a separate cycle.
