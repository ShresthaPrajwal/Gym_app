---
approved_by: ""
approved_at: ""
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: "3"
---
## Exec Plan — Task T-gym-app-yby142
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/data/exercises.ts` — one shared exercise reference table (name, targetMuscle, hardware tier, instructions, videoUrl), extending the existing exercise-library data with `hardware`/`instructions` fields. Both `filterByMuscle` (S-0001.04) and the new weekly-plan generator (S-0001.02) read from this single table, per the TSD note — S-0001.04's existing contract/tests are unaffected (same shape, superset of fields). (AC-3, AC-5)
- `src/domain/routineGenerator.ts` — replaces `generateRoutine(goal)` with `generateWeeklyPlan(goal, experience, cadence, hardware)`, returning a fixed 7-entry array (`WeekDay[]`); exactly `cadence` entries are training days, the rest are `{ isRest: true }`. Pure function, deterministic (fixed pool array order, no `Math.random`/`Date`). (AC-1, AC-2, AC-4)
- `src/pages/RoutineBuilder.tsx` — rebuilt selection flow: three pill-group controls (threshold/cadence/hardware) using `Button variant="pill"`, then the existing goal-card grid, then the 7-day plan (day rail always showing all 7 entries — rest days rendered as a distinct, clearly-labeled row, never omitted) with a day-detail column showing exercises, instructions, and a click-to-play video thumbnail per exercise. (AC-1, AC-2, AC-5)
- A small inline video-thumbnail component (new, in `src/components/` since it's a reusable building block, not page-local) — renders a YouTube thumbnail image (`img.youtube.com/vi/<id>/hqdefault.jpg`) that swaps to an inline `<iframe>` embed on click. Derives the video ID from the existing stored watch-URL format. (AC-5)

**Approach:** high-level only — NOT implementation prescription
- Exercise pool organized per goal × day-archetype (e.g. bulk: Push/Pull/Legs rotation; abs: Core-focus rotation), each archetype tagged with 1+ target muscles to draw from.
- Rest-day placement: deterministic spacing formula over the fixed 7 slots based on `cadence` (not "all training days first, all rest at the end") — resolved below, not left as an implementation-time guess.
- Experience tier changes exercise *count* per day and a small deterministic sets/reps adjustment on top of each pool entry's base values — not separate hardcoded pools per tier (avoids tripling the data set).
- Hardware filtering happens before exercise selection: pool entries below the selected hardware tier are excluded, then selection proceeds deterministically (fixed array order) from what remains.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- YouTube thumbnail image + inline embed iframe are REAL (no mocking) — same boundary S-0001.04 already has. AC-5's e2e test asserts the thumbnail element and its `src`/embed URL shape are present in the rendered DOM; it does not require the image/iframe to actually load over the network in the test environment (jsdom doesn't fetch external resources).

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 (tracer bullet, AC-2 + AC-4): `generateWeeklyPlan` for one representative (goal, experience, cadence, hardware) combo returns a 7-entry week with exactly `cadence` training days and the rest explicitly marked rest; a repeated call with the same inputs returns an identical result (covers AC-4's determinism invariant as an assertion in this same test, per the "invariant holds as a property of a behavior above" guidance — no separate cycle for AC-4).
- B-2 (AC-3): for a hardware-constrained combo (bodyweight/home), no returned exercise exceeds that tier.
- B-3 (e2e, AC-1 + AC-5): a user selects threshold, cadence, and hardware, then a primary target; the full 7-day plan renders (rest days visibly labeled, never missing); selecting a day shows its exercises with instructions; clicking a video thumbnail swaps it to a playable embed.

**PR will contain:**
- `src/data/exercises.ts` (extended shared table) + existing `exerciseFilter.test.ts` re-run unchanged (regression guard the merge didn't break S-0001.04)
- `src/domain/routineGenerator.ts` rewritten + new `routineGenerator.test.ts` (old test file's assertions no longer apply to the new signature and are replaced, not kept alongside)
- `src/components/VideoThumbnail.tsx` (new shared component)
- `src/pages/RoutineBuilder.tsx` rebuilt
- `src/data/routines.ts` removed (superseded by the pool-based generator + shared exercise table)

**Open questions / ambiguities:** (MUST be resolved before execution)
- Rest-day placement formula — RESOLVED: place training days at positions computed by even spacing (`round(i * 7 / cadence)` for i=0..cadence-1, de-duplicated/shifted to stay in-bounds), remaining positions are rest. Deterministic, no day-1-heavy cramming.
- Exercise count per experience tier — RESOLVED: beginner=3, intermediate=4, advanced=5 exercises per training day (capped by pool size for that archetype).
- Sets/reps adjustment per tier — RESOLVED: pool's base (intermediate) sets/reps; beginner = base sets−1 (min 2); advanced = base sets+1.
- Hardware tiers — RESOLVED: `bodyweight` ⊂ `dumbbell` ⊂ `full` (an exercise tagged `bodyweight` is includable under any hardware selection; `full`-tagged only under Full Facility).

**Path:** R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 (rest-day placement, exercise count/tier, sets/reps scaling, hardware tiering — all resolved above before execution) · blast-radius≥3 (domain module rewrite, shared data file, new component, page rebuild)
- [ ] Refactor pass done (on green; tests unchanged) — before PR
