---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "61364125211243ac2b0a1c6ec5afe0a2947c36028f6273654fb6767cb378867d"
---
## Task T-gym-app-dmxlo7 — Nutrition & macro calculator
**Parent:** story S-0001.03 · feature 0001-master-gym-app (docs/features/0001-master-gym-app/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: given biological sex, age, height, weight (metric or imperial), and activity level, calculating returns BMR and TDEE.
- [ ] AC-2 [behavior]: given a fitness goal (Cut, Maintenance, or Bulk), the target daily calories reflect that goal's adjustment to TDEE (deficit, maintenance, or surplus respectively), and the result is labeled with which one it is.
- [ ] AC-3 [behavior]: given a macro preset (High Carb, Moderate, Low Carb, or Keto), the protein/carbohydrate/fat breakdown (grams, calories, percentage of target calories, and grams per kg bodyweight, for each) reflects that preset, and the three macros' calories sum to the target calories within rounding.
- [ ] AC-4 [behavior]: the results include a micronutrient/supplement reference list covering Vitamin D3, Calcium, Magnesium Glycinate, Iron, Zinc, Omega-3, and Creatine Monohydrate, each with its recommended athletic intake and purpose.
- [ ] AC-5 [non-functional]: BMR/TDEE/macro output matches hand-calculated reference values (one male case, one female case, at least one non-default goal, at least one non-default macro preset) within 1%.
- [ ] AC-6 [e2e]: a user opens the Nutrition page, fills the form, picks a goal and a macro preset, sees the results update with no network request made, uses Save Plan (state persists locally — e.g. survives a remount), and uses Export JSON (produces a file/blob containing the biometrics, calorie calculations, macro breakdown, and micronutrient list).
**End-to-end AC:** AC-6 [e2e] — reachable through the running app.
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
**Test scope:** tests/T-gym-app-dmxlo7/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
