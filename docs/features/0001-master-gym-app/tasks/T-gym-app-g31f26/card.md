---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "d1558e23da8072ba57da0603bbbd84ba0150621d686dee8736251f1bbe8be650"
---
## Task T-gym-app-g31f26 — Static, serverless build & deploy
**Parent:** story S-0001.05 · feature 0001-master-gym-app (docs/features/0001-master-gym-app/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [invariant]: the build command produces a static output directory (HTML/CSS/JS) requiring no server process to serve.
- [ ] AC-2 [e2e]: serving the build output via any static file server renders and fully operates all three pages (routine builder, nutrition plan, exercise library) with zero runtime errors and no network calls other than page load and optional YouTube embeds.
**End-to-end AC:** AC-2 [e2e] — reachable through a statically-served build.
**Tests:** AC-2
**Test scope:** tests/T-gym-app-g31f26/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
