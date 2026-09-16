# Behavior Spec — T-gym-app-4b2q6y: Exercise & anatomy library: search, filters, inspector, technique modal
> Source: task card ACs + docs/features/0001-master-gym-app/tasks/T-gym-app-4b2q6y/snapshot-TSD.md + exec-plan.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Renumbered from the exec plan: B-1 = AC-1+AC-3 (filter tracer), B-2 = AC-2
> (backfilled off B-1), B-3 = e2e (AC-4+AC-5+AC-6).

## B-1 (tracer bullet): AC-1 [behavior] + AC-3 [invariant]: filtering returns only exercises matching every active filter, each with a well-formed video reference and non-empty cues.
- Given: the full exercise reference data
- When: filtering by combinations of search text, anatomy group, difficulty, equipment, and mechanics (search+anatomy, anatomy+difficulty, equipment+mechanics)
- Then: only exercises matching every active filter in the combination are returned, each with `targetMuscle`/`difficulty`/`equipment`/`mechanics` matching the active filters, a well-formed YouTube video URL, and a non-empty `cues` list; passing no filters (or all "all"/"any") returns the full set

## B-2: AC-2 [behavior]: a filter combination with no matching exercises returns an empty list.
- Given: a filter combination that no exercise satisfies (e.g. muscle `core` + equipment `barbell`, which the data has none of)
- When: filtering with that combination
- Then: the result is an empty array

## B-3 (e2e): AC-4 [behavior] + AC-5 [behavior] + AC-6 [e2e]: a user searches/filters, resets, hits a no-match state, inspects the anatomy view, and opens/closes a technique modal.
- Given: the Exercise Library page is open
- When: the user types a search term and/or picks anatomy/difficulty/equipment/mechanics filters, then clicks Reset; then picks a filter combination with no matches; then selects an anatomy group and toggles anterior/posterior; then opens a card's technique modal and closes it; then clicks "Add to Routine" on a card
- Then: the displayed cards and the visible count narrow to match the active filters; Reset restores the full list and default filters; the no-match combination shows the no-results state (cards hidden) with a working reset; the anatomy inspector's highlighted region matches the selected group and the anterior/posterior toggle changes only the displayed view; the technique modal shows the exercise's name, cues, and a YouTube-search link, and closes via its close control; "Add to Routine" completes without error

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-3 [invariant]: covered directly inside B-1's test (video reference + cues assertions on every returned exercise), not a separate cycle.
