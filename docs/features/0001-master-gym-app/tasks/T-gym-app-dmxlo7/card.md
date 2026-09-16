---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "5e84992b1efa31fbe84a7f5b45683d45c84b7c14b6711451338c4aad3e3eeea2"
---
## Task T-gym-app-dmxlo7 — Nutrition plan calculator
**Parent:** story S-0001.03 · feature 0001-master-gym-app (docs/features/0001-master-gym-app/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: given gender, age, height, weight, and activity level, calculating a plan returns BMR, TDEE, calorie target, and a protein/carb/fat gram breakdown.
- [ ] AC-2 [behavior]: the returned plan includes baseline daily vitamin/mineral guidance values.
- [ ] AC-3 [non-functional]: BMR/TDEE/macro output matches hand-calculated reference values (one male case, one female case) within 1%.
- [ ] AC-4 [e2e]: a user opens the Nutrition page, submits the form, and sees the computed plan rendered with no network request made.
**End-to-end AC:** AC-4 [e2e] — reachable through the running app.
**Tests:** AC-3, AC-1, AC-2, AC-4
**Test scope:** tests/T-gym-app-dmxlo7/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
