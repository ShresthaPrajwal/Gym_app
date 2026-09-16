## Task T-gym-app-yby142 — Routine Builder: goal-card + day-rail redesign
**Parent:** story S-0001.02 · feature 0001-master-gym-app (docs/features/0001-master-gym-app/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: clicking a goal's card (not just the underlying select) selects that goal and displays its generated routine.
- [ ] AC-2 [behavior]: when a routine has more than one day, clicking a day in the day list displays that day's exercises instead of the first day's.
- [ ] AC-3 [invariant]: the page still composes only shared design-system building blocks (no page-local duplicate of Button/Card/Badge/Select) — re-checked by the existing app-level invariant test, not a new one.
**End-to-end AC:** AC-1 [behavior] — reachable through the running app (the existing RoutineBuilder e2e test already covers reaching the page; this AC covers the new click-to-select affordance specifically).
**Tests:** AC-1, AC-2
<!-- AC-3 is an existing invariant re-checked by App.test.tsx; not a new RED→GREEN cycle. -->
**Test scope:** tests/T-gym-app-yby142/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
