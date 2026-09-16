# Behavior Spec — T-gym-app-rbydc8: Goal-based routine builder
> Source: task card ACs + docs/features/0001-master-gym-app/tasks/T-gym-app-rbydc8/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: given a goal (abs, bulk, cut-lean, general-fitness, strength, endurance), generating a routine returns a non-empty weekly routine whose exercises match that goal's expected focus.
- Given: each of the six supported goal identifiers
- When: the routine-generation function is called with that goal
- Then: it returns a non-empty list of workout days, each with a non-empty list of exercises, and the exercises' target muscles/movement types match that goal's expected focus (e.g. "abs" -> only core-focused exercises; "bulk" -> includes compound lifts)

## B-2: AC-2 [behavior]: generating a routine twice for the same goal returns an identical routine (deterministic).
- Given: any supported goal identifier
- When: the routine-generation function is called twice with that same goal
- Then: both calls return deep-equal routines

## B-3: AC-4 [e2e]: a user opens the Routine Builder page, selects a goal, and sees the generated routine rendered on screen.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-3 [invariant]: routine generation makes no network call. — coverage: property of B-1/B-2 — the generator is a pure synchronous function over bundled static data; verified by code review of the diff (no fetch/XHR/async I/O in `routineGenerator.ts`).

