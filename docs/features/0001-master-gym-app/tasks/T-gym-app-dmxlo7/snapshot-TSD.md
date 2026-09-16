## TSD S-0001.03 — Nutrition plan calculator (PRD §S-0001.03)
| Aspect | Spec |
|--------|------|
| Interfaces | A nutrition-calculation function: input = gender, age, height, weight, activity level; output = BMR, TDEE, a calorie target, a protein/carb/fat gram breakdown, and a static list of baseline daily vitamin/mineral guidance values. A UI form collects the inputs and displays the output. |
| Data / State | Static reference table for vitamin/mineral baseline guidance. No persisted state; form inputs and computed plan are transient/in-memory. |
| Behavior | Submitting valid inputs always returns the same BMR/TDEE/macros/vitamin output for those inputs (deterministic, no randomness). Output is computed via a standard, published BMR formula appropriate to the given gender/age/height/weight/activity level, accurate to within normal rounding of hand-calculated reference values. Changing any input and resubmitting recomputes and replaces the displayed plan. |
| Access | Any visitor of the Nutrition Plan view; no auth. |
| Boundaries | None — pure function over user-entered numbers and bundled static reference data, no network/clock/randomness dependency. |
| Tests | unit: calculation function matches hand-calculated BMR/TDEE/macro reference values (at least one male and one female case) within 1%; vitamin/mineral guidance values are present in the output. integration: submitting the form in the UI displays the computed plan matching the function's output, with no network request made. |
