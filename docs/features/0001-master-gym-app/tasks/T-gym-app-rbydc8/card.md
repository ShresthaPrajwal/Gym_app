---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "926fa2e2831879c4cb99c52d4f5ee5b4ff809bcc6547e495bcc69de3d49131bc"
---
## Task T-gym-app-rbydc8 — Goal-based routine builder
**Parent:** story S-0001.02 · feature 0001-master-gym-app (docs/features/0001-master-gym-app/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: given a goal (abs, bulk, cut-lean, general-fitness, strength, endurance), generating a routine returns a non-empty weekly routine whose exercises match that goal's expected focus.
- [ ] AC-2 [behavior]: generating a routine twice for the same goal returns an identical routine (deterministic).
- [ ] AC-3 [invariant]: routine generation makes no network call.
- [ ] AC-4 [e2e]: a user opens the Routine Builder page, selects a goal, and sees the generated routine rendered on screen.
**End-to-end AC:** AC-4 [e2e] — reachable through the running app.
**Tests:** AC-1, AC-2, AC-4
**Test scope:** tests/T-gym-app-rbydc8/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
