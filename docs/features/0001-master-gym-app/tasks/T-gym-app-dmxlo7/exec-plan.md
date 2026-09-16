---
approved_by: ""
approved_at: ""
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: "2"
---
## Exec Plan — Task T-gym-app-dmxlo7
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/domain/nutritionCalculator.ts` — pure function `calculateNutritionPlan(input)`: Mifflin-St Jeor BMR (with inline metric/imperial unit conversion), activity-multiplier TDEE, goal-adjusted target calories (labeled deficit/maintenance/surplus), macro-preset-driven protein/carb/fat breakdown (grams/calories/%/g-per-kg), and the static micronutrient/supplement reference list. (AC-1, AC-2, AC-3, AC-4)
- `src/domain/nutritionCalculator.ts` also exports `buildExportPayload(plan, input)` — a pure function assembling the exact JSON shape Export JSON writes out (biometrics, calorie results, macro breakdown, micronutrient list). Kept separate from the DOM-touching download trigger so it's unit-testable. (AC-6)
- `src/pages/NutritionPlan.tsx` — form (sex/age/height/weight/unit/activity as pill or select controls), goal pills (Cut/Maintain/Bulk, each showing its adjustment), macro-preset pills (High Carb/Moderate/Low Carb/Keto), BMR/TDEE/Target-Calories result cards, macro breakdown with percentage bars, micronutrient reference cards, a "Save Plan" button (writes current form state to `localStorage`) and an "Export JSON" download link (a `data:application/json` URI built from `buildExportPayload`, avoiding `URL.createObjectURL` which jsdom doesn't implement). On mount, restores from `localStorage` if present. (AC-1–AC-6)
- `src/App.tsx` — add a third nav tab "Nutrition Plan".

**Approach:** high-level only — NOT implementation prescription
- Calculator stays a pure TS function, no React/DOM/network imports, mirroring `routineGenerator.ts`.
- Macro presets are a fixed lookup of {protein%, carbs%, fat%} per preset (sums to 100%); grams = target calories × percentage ÷ (4 or 9 kcal/g); g-per-kg divides by canonical bodyweight in kg.
- Goal adjustment is a fixed percentage of TDEE (cut −20%, maintain 0%, bulk +15%) — standard, commonly-used ranges, not personalized further.
- Save Plan / Export JSON are the two REAL boundaries (local storage, client-side file link) called for by the TSD; both are exercised for real in tests (jsdom supports `localStorage` and plain `<a href="data:...">` natively — no mocking needed for either).

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- Browser local storage (Save Plan) — REAL, not mocked; AC-6's e2e test saves, remounts the component, and asserts the form was restored from real `localStorage`.
- Client-side file download (Export JSON) — REAL, not mocked; implemented as a `data:` URI anchor (sidesteps jsdom's lack of `URL.createObjectURL`) so AC-6's e2e test can assert on the real anchor's `href` content without any test-only stub.
- No network, clock, or randomness dependency anywhere in this task.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 (tracer bullet, AC-1+AC-2): `calculateNutritionPlan` for one representative metric input returns BMR, TDEE, and a target-calories value correctly adjusted (and labeled) for the given goal.
- B-2 (e2e, AC-3–AC-6): render `NutritionPlan`, fill the form, pick a goal and macro preset, see live results (BMR/TDEE/target/macros/micronutrients) with no network request, Save Plan then remount and confirm restore, click Export JSON and confirm the download link's content matches `buildExportPayload`.
- AC-3 (macro preset breakdown) and AC-4 (micronutrient list) are properties of the same `calculateNutritionPlan` return value proven in B-1's function — backfilled via `lane red --backfill` right after B-1 is GREEN, same pattern as prior tasks.
- AC-5 (non-functional reference values) is a regression guard added alongside B-1: hand-calculated male/maintain/moderate and female/cut/keto cases (values resolved below), asserted within 1%.

**PR will contain:**
- `src/domain/nutritionCalculator.ts` + test (B-1, AC-3/AC-4 backfills, AC-5 reference-value guard)
- `src/pages/NutritionPlan.tsx` + test (B-2 e2e)
- `src/App.tsx` nav update

**Open questions / ambiguities:** (MUST be resolved before execution)
- Goal calorie adjustment — RESOLVED: cut = TDEE × 0.80 (20% deficit), maintain = TDEE × 1.00, bulk = TDEE × 1.15 (15% surplus). Standard, commonly-cited ranges.
- Macro preset splits — RESOLVED: High Carb = 25% protein / 50% carbs / 25% fat; Moderate = 30/40/30; Low Carb = 35/25/40; Keto = 25/5/70.
- Reference cases for AC-5 — RESOLVED:
  - Male, 30y, 180cm, 80kg, moderately-active (×1.55), goal=maintain, preset=moderate → BMR=1780, TDEE=2759, target=2759.
  - Female, 25y, 165cm, 60kg, lightly-active (×1.375), goal=cut, preset=keto → BMR=1345.25, TDEE≈1849.7, target≈1479.8.
- Activity multipliers — RESOLVED: sedentary ×1.2, light ×1.375, moderate ×1.55, active ×1.725, very-active ×1.9 (standard Mifflin-St Jeor activity scale).

**Path:** R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 (goal adjustment, macro splits, reference cases, activity multipliers — all resolved above) · amendments≥2 (this task's card/TSD were both amended after the original simpler scope)
- [ ] Refactor pass done (on green; tests unchanged) — before PR
