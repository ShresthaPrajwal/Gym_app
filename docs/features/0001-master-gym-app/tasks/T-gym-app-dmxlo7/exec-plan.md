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
- `src/domain/nutritionCalculator.ts` — pure function `calculateNutritionPlan(input)` implementing Mifflin-St Jeor BMR, activity-level TDEE multiplier, calorie target, protein/carb/fat gram macro split, and baseline vitamin/mineral guidance (AC-1, AC-2, AC-3)
- `src/pages/NutritionPlan.tsx` — form (gender/age/height/weight/activity) using shared `Input`/`Select`/`Button`/`Card` components, calls the pure calculator on submit and renders the plan (AC-4)
- `src/App.tsx` — add a third nav tab "Nutrition Plan" wired to the new page (AC-4)

**Approach:** high-level only — NOT implementation prescription
- Calculator is a pure TS function with no React/DOM/network imports, mirroring `routineGenerator.ts` / `exerciseFilter.ts`.
- Form state is local React state; submit computes and stores the result in state, no persistence, no network call.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- No boundaries — no network, clock, randomness, or filesystem involved. AC-4 asserts no network request is made, exercised through the real rendered app (jsdom), no mocking needed.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1: unit test `calculateNutritionPlan` returns BMR/TDEE/calorie target/macro grams for a given input (AC-1)
- B-3 (e2e): render `NutritionPlan` page, fill form, submit, assert computed plan appears (AC-4)
- B-2 (backfill after B-1 GREEN): vitamin/mineral guidance is a property of the same `calculateNutritionPlan` return value — proven via `lane red --backfill` once the calculator exists, same as prior tasks' pattern

**PR will contain:**
- `src/domain/nutritionCalculator.ts` + test
- `src/pages/NutritionPlan.tsx` + test
- `src/App.tsx` nav update
- Reference-value check for AC-3 (male + female case) added as a regression guard alongside B-1's test

**Open questions / ambiguities:** (MUST be resolved before execution)
- None — formula (Mifflin-St Jeor), activity multipliers, and macro split are standard and unambiguous; vitamin/mineral guidance uses static baseline RDAs (not personalized beyond the plan object shape).

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
