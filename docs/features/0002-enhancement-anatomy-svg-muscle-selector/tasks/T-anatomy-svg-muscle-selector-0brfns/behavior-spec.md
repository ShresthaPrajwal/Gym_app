# Behavior Spec — T-anatomy-svg-muscle-selector-0brfns: Per-muscle exercise vocabulary, data & filtering
> Source: task card ACs + docs/features/0002-enhancement-anatomy-svg-muscle-selector/tasks/T-anatomy-svg-muscle-selector-0brfns/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: filtering the exercise set by a single muscle returns only exercises whose target muscle is that muscle, and returns nothing tagged to any other muscle.
- Given:
- When:
- Then:

## B-2: AC-4 [e2e]: in the running app a user picks a specific muscle in the Exercise Library filter controls and sees the list narrow to that muscle's exercises with the reported count matching the number shown.
- Given:
- When:
- Then:

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-2 [invariant]: every muscle in the vocabulary that is selectable returns at least one exercise — no selectable muscle yields an empty list. — coverage:
- AC-3 [invariant]: generating a weekly routine returns at least one exercise for every training day, for every goal / experience / cadence / hardware combination. — coverage:

