## Task T-gym-app-4b2q6y — Exercise & anatomy library: search, filters, inspector, technique modal
**Parent:** story S-0001.04 · feature 0001-master-gym-app (docs/features/0001-master-gym-app/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: given a search text and/or anatomy group, difficulty, equipment, and mechanics filters, filtering returns only exercises matching every active filter (filters combine with AND; an unset filter/"all"/"any" doesn't narrow on that criterion).
- [ ] AC-2 [behavior]: a filter combination with no matching exercises returns an empty list.
- [ ] AC-3 [invariant]: every returned exercise carries a well-formed video reference and a non-empty ordered list of execution cues.
- [ ] AC-4 [behavior]: the visible result count always equals the number of rendered exercise cards; a reset action restores every filter to its default and the full list.
- [ ] AC-5 [behavior]: selecting an anatomy group updates the anatomy inspector's highlighted region; toggling anterior/posterior changes the displayed body view without changing the selected anatomy group or the filtered list.
- [ ] AC-6 [e2e]: a user opens the Exercise Library, searches and applies anatomy/difficulty/equipment/mechanics filters, sees the narrowed cards and matching count; sees the no-results state (with a working reset) when a combination matches nothing; opens an exercise's technique modal (showing its name, cues, and a YouTube-search link) and closes it; and can use "Add to Routine" without error.
**End-to-end AC:** AC-6 [e2e] — reachable through the running app.
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
**Test scope:** tests/T-gym-app-4b2q6y/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
