---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-26"
approved_sha256: "ff05e34205d51f320a2ce959cde90313c94de4bc64d7df15a10b9e5f5f591e47"
---
# Patch 0006 — Visual polish: remove generic AI design tells, improve nav and typography

**Severity:** minor
**Source:** user request + frontend-design audit

**Current behavior:** The app hits several well-known AI-generated design tells: ALL-CAPS eyebrow labels on every section, acid-green accent on a near-black background, nav tabs styled as stacked-icon pill buttons, and a verbose "ALGORITHMIC PROGRAM ENGINE" eyebrow above the routine builder title. Every card uses the same border/radius/shadow, making sections feel undifferentiated.

**Expected behavior:** A cleaner, more distinctive visual identity: nav tabs use a horizontal underline-indicator pattern (no filled background), ALL-CAPS section labels are replaced with sentence-case text, the routine builder eyebrow is removed, and stat cards in the nutrition section have stronger typographic presence. No logic, data, or accessibility changes.

**Must NOT change:** Tailwind design tokens (tailwind.config.ts), component logic, domain functions, routing/state, accessibility attributes (aria-*), or the existing color palette values.

## TSD S-0006.01 — Visual polish: nav tabs, typography, label hierarchy

| Aspect | Spec |
|--------|------|
| Interfaces | No API or component prop changes — only className strings and JSX structure inside existing components |
| Data / State | No state changes |
| Behavior | App navigates identically; all three sections render identically in terms of content and interaction. Visual output differs: nav uses underline-indicator tabs; section labels are sentence case; RoutineBuilder eyebrow label removed |
| Boundaries | None |
| Tests | Tests: N/A — pure visual/presentational change, no logic altered |

## Task T-visual-ui-redesign-4ksxi5 — Visual polish

**Slice:** All visual changes shipped together as one presentational PR
**Acceptance criteria:**
- [ ] AC-1 [behavior]: Nav tabs show an underline indicator on the active tab instead of a filled background; inactive tabs have no background fill
- [ ] AC-2 [behavior]: No ALL-CAPS section labels remain in RoutineBuilder, NutritionPlan, or ExerciseLibrary (form field labels that are short words like "Age", "Height", "Weight" are already sentence-case and stay; only the ALL-CAPS eyebrow/section labels change)
- [ ] AC-3 [behavior]: "Algorithmic Program Engine" eyebrow label is removed from RoutineBuilder
- [ ] AC-4 [behavior]: Nutrition stat cards (BMR, TDEE, Target Calories) have more visual presence — larger metric numbers, sentence-case labels
- [ ] AC-5 [non-functional]: No TypeScript errors introduced

**Tests:** Tests: N/A — pure visual/presentational change, no logic altered

## Execution Plan

**Approach:** Edit className strings and a small amount of JSX in five files. No new components, no new files, no logic changes.

**Boundaries & mocks:** None

**Behaviors (TDD order):**
- B-1: Redesign nav tabs in App.tsx — replace Button variant="primary/secondary" with plain button elements using an underline-indicator active state (border-b-2 border-primary-container for active, transparent for inactive, no background fill on any tab)
- B-2: Remove "Algorithmic Program Engine" eyebrow from RoutineBuilder.tsx; change ALL-CAPS section label strings to sentence case (e.g. "Training goal", "7-day plan", "Cues"); simplify meta strings
- B-3: In NutritionPlan.tsx, change ALL-CAPS field labels and section labels to sentence case; give stat cards (BMR/TDEE/Calories) larger metric number size using text-metric-lg/text-metric-huge
- B-4: In ExerciseLibrary.tsx, change ALL-CAPS filter/section labels to sentence case

**Open questions:** none
