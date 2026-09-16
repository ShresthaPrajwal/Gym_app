---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "a4edc968cbb3c09f9f141496dadf964ca67b3dd42d7b009d0ccdf83f9d5d6043"
---
## Task T-gym-app-yby142 — Routine Builder: full deterministic weekly plan (threshold/cadence/hardware/target → 7-day plan with instructions + video)
**Parent:** story S-0001.02 · feature 0001-master-gym-app (docs/features/0001-master-gym-app/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: a user selects an adaptation threshold (Beginner/Intermediate/Advanced), a microcycle cadence (3/4/5/6 Days), and available hardware (Full Facility/Dumbbell Only/Bodyweight-Home) before choosing a primary target.
- [ ] AC-2 [behavior]: after the three selections above, choosing a primary target (Core Shred/Mass Hypertrophy/Lean Definition/Total Health/Peak Strength/Endurance) produces a full 7-day plan — exactly `cadence` days are training days matched to the target's focus, and the remaining days are explicit, clearly labeled rest/recovery days (never blank or missing days).
- [ ] AC-3 [behavior]: no exercise in the produced plan requires hardware outside the selected constraint (e.g. Bodyweight/Home never includes a barbell- or machine-only exercise).
- [ ] AC-4 [invariant]: the same four selections always produce the identical 7-day plan (deterministic, no randomness); changing any one of the four selections recomputes and replaces the entire displayed plan.
- [ ] AC-5 [e2e]: selecting a day in the plan shows that day's exercises in a left column, each with its target muscle, sets/reps/rest, a short instructional cue for performing it, and a video thumbnail that plays in place (no navigating away from the page).
**End-to-end AC:** AC-5 [e2e] — reachable through the running app.
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5
**Test scope:** tests/T-gym-app-yby142/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
