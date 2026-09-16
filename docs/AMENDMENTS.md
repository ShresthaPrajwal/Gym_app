# Amendment Log
> Append-only. Entries written once, NEVER edited. The immutable record of how the project changed.
> Commits reference the ID: `fix: swap auth provider (Amendment-003)`.

<!-- newest at bottom. Template: copy .lane/templates/AMENDMENT.md -->

## Amendment 001 — 2026-09-16
**Type:** Deep
**Trigger:** client request
**What changed:** TSD S-0001.02 (Routine Builder) expanded from a simple goal→weekly-routine function to: adaptation-threshold + microcycle-cadence + hardware-constraint inputs, a full deterministic 7-day plan (exactly `cadence` training days, the rest explicit rest days — never partial/missing), and per-exercise instructions + a demonstration-video reference.
**Why:** the client supplied a detailed reference design (screenshot + working reference code) specifying this richer interaction model; the original TSD only covered a bare goal-selection dropdown.
**Cascade:** TSD §S-0001.02 · Task T-gym-app-yby142 (card + exec-plan rewritten) · Code (`routineGenerator.ts` rewritten, shared `exercises.ts` extended with hardware/instructions, `RoutineBuilder.tsx` rebuilt)
**ADR update:** No

## Amendment 002 — 2026-09-16
**Type:** Deep
**Trigger:** client request
**What changed:** TSD S-0001.03 (Nutrition Calculator) expanded from a bare BMR/TDEE/macro/vitamin function to: measurement-unit input, a fitness-goal (cut/maintain/bulk) calorie adjustment, selectable macro presets (High Carb/Moderate/Low Carb/Keto) with per-macro grams/calories/%/g-per-kg, a specific 7-item micronutrient/supplement reference table, and a local-storage Save Plan + client-side Export JSON action.
**Why:** the client supplied a detailed page-wise PRD for this page specifying the richer form/results/save-export flow; the original TSD only covered a bare form submit.
**Cascade:** TSD §S-0001.03 · Task T-gym-app-dmxlo7 (card + exec-plan rewritten) · Code (`nutritionCalculator.ts` new, `NutritionPlan.tsx` new, `App.tsx` nav update)
**ADR update:** No
