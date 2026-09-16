## TSD S-0001.02 — Goal-based routine builder (PRD §S-0001.02)
| Aspect | Spec |
|--------|------|
| Interfaces | A routine-generation function: input = a goal identifier (one of: abs, bulk, cut-lean, general-fitness, strength, endurance); output = a weekly routine: a list of workout days, each with a day label and an ordered list of exercises, each exercise carrying name, target muscle, sets, reps, and rest interval. A UI surface lets a user select a goal and view the resulting routine. |
| Data / State | Static, bundled routine/exercise reference data (goal → day → exercise mapping). No persisted or server-side state; selection state is transient/in-memory in the UI only. |
| Behavior | Selecting a goal always yields the same non-empty weekly routine for that goal; the routine's exercises are drawn from muscles/movement types appropriate to the goal (e.g. abs → core-focused exercises; bulk → compound lifts). Re-selecting the same goal again yields an identical routine. Selecting a different goal replaces the displayed routine entirely. |
| Access | Any visitor of the Routine Builder view; no auth. |
| Boundaries | None — pure function over bundled static data, no network/clock/randomness dependency. |
| Tests | unit: routine-generation function for every supported goal returns a non-empty routine whose exercises match that goal's expected muscle/movement focus, and is deterministic across repeated calls with the same goal. integration: selecting a goal in the UI updates the displayed routine to match the function's output. |
