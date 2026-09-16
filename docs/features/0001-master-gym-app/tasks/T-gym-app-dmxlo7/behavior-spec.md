# Behavior Spec — T-gym-app-dmxlo7: Nutrition & macro calculator
> Source: task card ACs + docs/features/0001-master-gym-app/tasks/T-gym-app-dmxlo7/snapshot-TSD.md + exec-plan.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Renumbered from the exec plan: B-1 = AC-1+AC-2 (BMR/TDEE/goal-adjusted target),
> B-2 = e2e (AC-3–AC-6). AC-3/AC-4 backfilled off B-1's calculator; AC-5 is a
> reference-value regression guard alongside B-1.

## B-1 (tracer bullet): AC-1 [behavior] + AC-2 [behavior]: calculating a plan returns BMR/TDEE, and the target calories reflect the selected goal's adjustment.
- Given: a male, 30 years old, 180cm tall, 80kg, moderately-active, goal `maintain`, preset `moderate`
- When: `calculateNutritionPlan(input)` is called
- Then: `bmr` ≈ 1780, `tdee` ≈ 2759, `targetCalories` ≈ 2759, `goalLabel` = `'maintenance'`; calling again with goal `cut` on the same biometrics yields a `targetCalories` ≈ 80% of the same TDEE and `goalLabel` = `'deficit'`

## B-2 (e2e): AC-3 [behavior] + AC-4 [behavior] + AC-5 [non-functional, exercised here] + AC-6 [e2e]: a user fills the form, picks a goal and macro preset, sees live results, saves, and exports.
- Given: the Nutrition page is open
- When: the user enters biometrics, activity level, and unit; picks a goal; picks a macro preset; clicks Save Plan; the component remounts; the user clicks Export JSON
- Then: BMR/TDEE/target-calories/macro breakdown/micronutrient list render with no network request; changing the macro preset updates the macro breakdown; after remount the previously entered biometrics are restored; the export link's content contains the biometrics, calorie results, macro breakdown, and micronutrient list

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-3 [behavior]: macro preset breakdown internal consistency — backfilled alongside B-1 (`lane red --backfill`) once `calculateNutritionPlan` exists.
- AC-4 [behavior]: micronutrient/supplement list — backfilled alongside B-1 (`lane red --backfill`).
- AC-5 [non-functional]: hand-calculated reference values (male/maintain/moderate, female/cut/keto — values in exec-plan.md) within 1% — added as a regression guard test alongside B-1, not its own cycle.
