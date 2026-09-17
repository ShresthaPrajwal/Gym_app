---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
approved_sha256: "dcc01b7547b65db76b99c0b868a65fbdabfa7d038fdf765fc8b6caa57e142e6d"
---
# Patch 0005 — Icons on nav tabs and selection cards

**Severity:** minor
**Source:** UX feedback — selection tabs feel plain; icons would aid scannability and make the UI more distinctive

**Current behavior:** Nav tabs (Routine Builder / Exercise Library / Nutrition Plan) and the RoutineBuilder goal cards show text only — no visual icons to differentiate them at a glance.
**Expected behavior:** Each nav tab has a relevant inline SVG icon above or beside the label. Each goal card in RoutineBuilder has a thematic icon. Filter group labels in ExerciseLibrary get a small icon prefix. No new npm dependency — inline SVGs only.
**Must NOT change:** Tab switching logic, filter behaviour, active/inactive state styling, existing Tailwind classes on Button variants.

## TSD S-0005.01 — Icons on nav tabs and selection cards
| Aspect | Spec |
|--------|------|
| Interfaces | `App.tsx` nav buttons; `RoutineBuilder` goal cards; `ExerciseLibrary` filter group labels |
| Data / State | None |
| Behavior | Nav tabs: icon (16×16 SVG) + label stacked vertically, centred. Goal cards: thematic 20×20 icon above the label. Filter labels (Difficulty / Equipment / Mechanics / Anatomy): small 14×14 icon inline before the text. All icons use `currentColor` so they inherit the button's active/inactive colour automatically. |
| Boundaries | None |
| Tests | N/A — visual/presentational change |

## Task T-icon-nav-tabs-blwuzy — Icons on nav tabs and selection cards
**Slice:** Add inline SVG icons to nav tabs, goal cards, and filter group labels
**Acceptance criteria:**
- [ ] AC-1 [behavior]: Nav tabs show a relevant icon + label, icon inherits active/inactive color
- [ ] AC-2 [behavior]: RoutineBuilder goal cards show a thematic icon above the label
- [ ] AC-3 [behavior]: ExerciseLibrary filter group labels (Anatomy / Difficulty / Equipment / Mechanics) show a small icon
- [ ] AC-4 [e2e]: All tabs and cards remain fully functional — clicking still switches sections/goals/filters
**Tests:** N/A — visual/presentational change, no logic altered

## Execution Plan
**Approach:**
- `App.tsx`: wrap each Button content in `flex flex-col items-center gap-1`; add a 16×16 inline SVG per tab (dumbbell for Routine Builder, magnifier for Exercise Library, leaf/apple for Nutrition Plan)
- `RoutineBuilder.tsx`: add a 20×20 SVG to each goal card above `meta.label` — one distinct icon per goal (target, muscle, flame, heart, bolt, timer)
- `ExerciseLibrary.tsx`: prepend a 14×14 icon to each filter group label span (person for Anatomy, bar-chart for Difficulty, wrench for Equipment, link for Mechanics)
- All SVGs inline, `currentColor`, `aria-hidden="true"`, `focusable="false"`

**Boundaries & mocks:** None

**Behaviors (TDD order):**
- B-1 [e2e]: Nav tabs render with icon + label and remain clickable

**Open questions:** none
