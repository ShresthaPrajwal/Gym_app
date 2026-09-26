---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-26"
approved_sha256: "bbe4ef7ab516c082061b624e19df4dc303b08fc27be5620453f7489554963d6f"
---
# Patch 0008 — One shared chip selector across every page

**Severity:** minor
**Source:** user request (2026-09-26), following 0007's Exercise Library chip redesign

**Current behavior:** The chip style from 0007 exists only in the Exercise Library. Routine Builder (Level, Days per week, Equipment) and Nutrition (Sex, Units, Activity level, Macro preset) each define their own page-local `PillGroup`. Those groups render tight segmented boxes with no borders, and they expose no pressed state to assistive tech. The anatomy Front/Back switch uses a third variant. This is three copies of one control, which CONSTITUTION rule 3 forbids (shared primitives live in `src/components/`, not duplicated per page). On phones the Nutrition form also splits into two columns (`sm` is 375px), which squeezes the Sex and Units groups.

**Expected behavior:** One shared `ChipGroup` component in `src/components/` renders every single-choice selector in the app: an optional visible label, then a named group of bordered, padded chips. The row is one swipeable line on phones and wraps from `md` up. The active chip is highlighted and reports `aria-pressed="true"`; every other chip reports `"false"`. The page-local `PillGroup`, `FilterRow` and `PillButton` are deleted. On phones the Nutrition form stacks to one column.

**Must NOT change:** Selection semantics (clicking a chip selects that value); option labels and order; the accessible group names the existing tests rely on ("Anatomy Group", "Difficulty", "Equipment"); the Front/Back switch behavior from 0007; goal cards and the day strip (these are cards, not chips); domain logic and data; design tokens.

## TSD S-0008.01 — Shared single-choice chip group

| Aspect | Spec |
|--------|------|
| Interfaces | New shared component `ChipGroup<T extends string \| number>({ label?, name?, options: { value: T; label: string }[], value: T, onChange(value: T) })`. `name` is the group's accessible name and defaults to `label`. Exported from `src/components`. No page's props change. |
| Data / State | None; the component is controlled by its page |
| Behavior | Renders `role="group"` named `name`. Each option is a shared-Button chip; clicking one calls `onChange` with its value; the chip matching `value` reports `aria-pressed="true"` and the others `"false"`. It is used for all Routine Builder, Nutrition and Exercise Library selectors and the anatomy Front/Back switch. |
| Boundaries | None |
| Tests | Component tests (Vitest + RTL): pressed state and selection on the Routine Builder and Nutrition pages; existing Exercise Library and AnatomyInspector tests stay green |

## Task T-consistent-chips-swdfhe — Shared chip selector

**Slice:** one shared control replacing three page-local copies, verified through the pages that use it
**Acceptance criteria:**
- [ ] AC-1 [behavior]: On Routine Builder, the Level, Days per week and Equipment selectors are named groups whose chips report `aria-pressed`. Picking "Beginner" presses it and un-presses "Intermediate".
- [ ] AC-2 [behavior]: On Nutrition, the Sex, Units, Activity level and Macro preset selectors are named groups whose chips report `aria-pressed`. Picking "Female" presses it and un-presses "Male".
- [ ] AC-3 [invariant]: No page-local `PillGroup`, `FilterRow` or `PillButton` remains. The Exercise Library chips and the anatomy Front/Back switch render through `ChipGroup`, and their existing tests stay green.
- [ ] AC-4 [non-functional]: `tsc --noEmit` is clean, the full suite is green, and a phone-width (390px) check shows no horizontal page overflow.

**Tests:** AC-1, AC-2

## Execution Plan

**Approach:** Lift 0007's `FilterRow` + `PillButton` from ExerciseLibrary into `src/components/ChipGroup.tsx` as one options-driven component, built on the shared Button (`pill` variant) and existing Tailwind tokens. Drop the negative-margin bleed, so the row works in any container (card, grid column, or the anatomy header). Swap every page-local group for `ChipGroup` and delete the local copies. On Nutrition, change the form grid from `sm:grid-cols-2` to `md:grid-cols-2` so phones get one column, and drop the old equal-width `flex-1` pills.
**Boundaries & mocks:** none
**Behaviors (TDD order):**
- B-1: RED: RoutineBuilder.test and NutritionPlan.test assert that the named selector groups exist and that choosing an option moves `aria-pressed` to it (AC-1, AC-2). GREEN: add `ChipGroup` and move Routine Builder and Nutrition onto it.
- Refactor: move Exercise Library and the anatomy switch onto `ChipGroup` and delete `FilterRow`/`PillButton`, with the suite green throughout (AC-3). Their existing tests already cover this.
**Open questions:** none
