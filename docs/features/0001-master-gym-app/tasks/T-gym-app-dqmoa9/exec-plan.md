---
approved_by: ""
approved_at: ""
planned_behaviors: "2"
---
## Exec Plan — Task T-gym-app-dqmoa9
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- Static exercise reference data (exercise -> target muscle -> YouTube URL), at least 3 exercises per muscle group (chest, back, legs, shoulders, arms, core, full-body) [AC-1, AC-2]
- A pure exercise-filtering function: muscle group id -> matching exercises [AC-1, AC-2]
- An Exercise Library screen (muscle-group picker + filtered list with video links), built only from the shared design-system components, wired into the app alongside the Routine Builder [AC-3]
- A clickable body-map visual: a simple SVG body silhouette with one clickable region per muscle group, as a second way (alongside the Select) to pick a muscle group — both drive the same selection state [AC-3]

**Approach:** high-level only — NOT implementation prescription
Model exercises as a flat typed list, each carrying a target muscle and a YouTube URL; filtering is a straight array filter by muscle — no randomness, no async, so trivially deterministic and network-free. The screen renders a Select (shared component) AND a body-map SVG bound to the same muscle-group state; each body-map region is an accessible, labeled clickable element (button semantics, not a bare image click) so it's keyboard/screen-reader usable and testable the same way as any other control. Selecting via either control displays matches using Card/Badge etc., each with a link (or iframe embed) pointing at the exercise's YouTube URL. Since this task and the routine builder both want to be "the app," add lightweight in-app navigation (e.g. simple tab/section switch in `App.tsx`) between Routine Builder and Exercise Library rather than one replacing the other.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- YouTube is named in the TSD as the only external reference, but the app never calls a YouTube API — it only stores/renders a static URL as a link/iframe src. Nothing is faked; the "boundary" is passive (no network call is made by our code to prove or mock).

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 (tracer bullet): filtering by muscle group returns only matching exercises (>=3 per group), each with a well-formed YouTube URL.
- B-2 (e2e): clicking a muscle-group region on the body-map (or, equivalently, using the Select) renders the filtered list with video links, reachable through the app.

**PR will contain:**
- `src/data/exercises.ts` (static exercise -> muscle -> YouTube URL data)
- `src/domain/exerciseFilter.ts` (+ its unit tests, B-1)
- `src/pages/ExerciseLibrary/BodyMap.tsx` (clickable SVG body silhouette, one region per muscle group)
- `src/pages/ExerciseLibrary/index.tsx` (+ its test, B-2), wired into `src/App.tsx` alongside Routine Builder

**Open questions / ambiguities:** (MUST be resolved before execution)
- None.

**Path:** L (lean, default) | R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
None hit — 0 ambiguities, single-feature pure-function + one screen, no security/PII surface, no prior failed attempt. Path: L.
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
