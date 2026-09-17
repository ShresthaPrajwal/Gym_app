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
- Given: the bundled exercise set, and `calves` as a member of the muscle vocabulary
- When: the exercise set is filtered by the single muscle `calves`
- Then: the result is non-empty, and every exercise in it has `calves` as its target muscle — no
  exercise tagged to any other region appears

## B-2: AC-2 [invariant, driven as behavior]: every muscle in the vocabulary that is selectable returns at least one exercise — no selectable muscle yields an empty list.
- Given: the bundled exercise set, and the diagram's regions enumerated explicitly in the test
  (NOT read back out of the vocabulary — that loop passes vacuously at base, where all 7 coarse
  areas are populated)
- When: the exercise set is filtered by each enumerated region in turn
- Then: every one of those filters returns at least one exercise, so no selectable region is a dead
  end; and the vocabulary contains exactly those regions and nothing else

## B-3 — WITHDRAWN as a RED→GREEN cycle; recorded off-ledger instead (see Invariants below)

## B-4 — RECORDED AS A BACK-FILL, not a test-first cycle (see note at the bottom of this file)
## AC-4 [e2e]: in the running app a user picks a specific muscle in the Exercise Library filter controls and sees the list narrow to that muscle's exercises with the reported count matching the number shown.
- Given: the Exercise Library rendered with no filters applied
- When: the user selects one of the regions introduced by this task in the anatomy filter controls
  (a surviving coarse area would pass at base and prove nothing)
- Then: only that region's exercises are listed, and the count reported on the page equals the
  number of exercises shown

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- **AC-3** [invariant]: generating a weekly routine returns at least one exercise for every training
  day, for every goal / experience / cadence / hardware combination. — coverage: **off-ledger guard
  via `lane red --regression`.** Verified empirically at the task base BEFORE any implementation:
  this assertion already PASSES there, so it guards existing behavior against this task's change
  rather than specifying new behavior, and a plain `lane red` would be a false proof. See
  AMENDMENT 1 in the exec plan.
- AC-2 remains driven as a real cycle (B-2) — unlike AC-3 it genuinely fails at base once phrased
  against the enumerated regions, because the empty regions have no exercises there.
- **AC-4 (B-4) was recorded with `lane red --backfill`, NOT test-first — a process shortfall worth
  naming.** The intent (exec plan) was a real RED→GREEN cycle, and at the task base the test does
  fail. But by the time it was written the behavior was already implemented: the page builds its
  filter controls *from* the muscle vocabulary, and the label map is a total map over that
  vocabulary, so the app could not compile until the labels existed — which forced them into B-1's
  GREEN, pre-satisfying AC-4. Correct sequencing would have driven B-4 before wiring the labels.
  Rather than contrive a failure or revert proven cycles to manufacture a red, it is recorded as a
  back-fill: honest, off-ledger, and counted apart from the test-first proof. Net ledger for this
  task: **2 proven RED→GREEN cycles (B-1, B-2), 1 regression guard (AC-3), 1 back-fill (AC-4).**
