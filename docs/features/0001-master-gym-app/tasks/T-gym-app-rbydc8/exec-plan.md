---
approved_by: ""
approved_at: ""
planned_behaviors: "3"
---
## Exec Plan — Task T-gym-app-rbydc8
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- Static goal→routine reference data (per goal: a week of days, each day an ordered list of exercises with sets/reps/rest) [AC-1, AC-2]
- A pure routine-generation function: goal id -> weekly routine, reading only the static data [AC-1, AC-2, AC-3]
- A Routine Builder screen (goal picker + rendered routine), built only from the shared design-system components from T-gym-app-781z12 [AC-4]

**Approach:** high-level only — NOT implementation prescription
Model the routine data as a typed lookup keyed by goal id, each entry a fixed list of days/exercises reflecting that goal's focus (e.g. abs -> core-heavy days, bulk -> compound-lift-heavy days). The generation function is a straight lookup/copy — no randomness, no async — so it's naturally deterministic and network-free. The screen renders a Select (shared component) bound to the goal, and displays the returned routine using Card/Badge etc. for each day.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- None — TSD Boundaries for S-0001.02 is empty (pure function over bundled static data).

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 (tracer bullet): generating a routine for each supported goal returns a non-empty weekly routine whose exercises match that goal's expected focus.
- B-2: generating a routine twice for the same goal returns an identical (deep-equal) routine.
- B-3 (e2e): selecting a goal in the Routine Builder screen renders the generated routine on screen.

**PR will contain:**
- `src/data/routines.ts` (static goal -> routine reference data)
- `src/domain/routineGenerator.ts` (+ its unit tests, B-1/B-2)
- `src/pages/RoutineBuilder.tsx` (+ its test, B-3), wired into `src/App.tsx`

**Open questions / ambiguities:** (MUST be resolved before execution)
- None.

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
None hit — 0 ambiguities, single-feature pure-function + one screen, no security/PII surface, no prior failed attempt. Path: L.
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
