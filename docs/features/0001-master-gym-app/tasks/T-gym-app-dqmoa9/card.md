---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "d24178abf3c98a463de7e451da7ca3a9d98108bc25be3d9f90f152f34d378a58"
---
## Task T-gym-app-dqmoa9 — Exercise library by target muscle
**Parent:** story S-0001.04 · feature 0001-master-gym-app (docs/features/0001-master-gym-app/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: given a target muscle/body part, filtering returns only exercises targeting that muscle, at least 3 per group.
- [ ] AC-2 [invariant]: every returned exercise carries a well-formed YouTube video URL; no external API call is made to list/filter.
- [ ] AC-3 [e2e]: a user opens the Exercise Library page, picks a muscle group, and sees the filtered list with working video links/embeds.
**End-to-end AC:** AC-3 [e2e] — reachable through the running app.
**Tests:** AC-1, AC-2, AC-3
**Test scope:** tests/T-gym-app-dqmoa9/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
