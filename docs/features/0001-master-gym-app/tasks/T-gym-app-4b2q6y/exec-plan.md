---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: "2"
approved_sha256: "ea4944f81ea1620a3825f60d7dc72338383df73e31b2523a8fdeb646cb42e16e"
---
## Exec Plan — Task T-gym-app-4b2q6y
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- `src/domain/exerciseFilter.ts` — extends the shared `Exercise` type with `difficulty` (beginner/intermediate/advanced), `equipment` (barbell/dumbbell/cable/bodyweight), `mechanics` (compound/isolation), and `cues: string[]` (ordered execution steps). Replaces `filterByMuscle` with `filterExercises(filters)`, filters = `{ search?, muscle?, difficulty?, equipment?, mechanics? }`, all optional/AND-combined, "all"/"any"/unset excluded from narrowing. (AC-1, AC-2, AC-3)
- `src/data/exercises.ts` — backfills the 4 new fields onto all 21 existing exercises (real data, no new exercises added). (AC-1, AC-3)
- `src/pages/AnatomyInspector.tsx` (renames/replaces `BodyMap.tsx`) — adds an anterior/posterior toggle; each view has its own clickable region set (a region only clickable from the view it's actually visible in — e.g. "back" only from posterior); both views share the same selected-muscle state/highlight, set either by clicking a region or by the page's anatomy-group selector. (AC-5)
- `src/pages/ExerciseTechniqueModal.tsx` (new, page-local — only one consumer today) — shows the exercise's name, cues, its playable video (reusing `VideoThumbnail`), a real "Watch on YouTube" link built as a YouTube search-query URL from the exercise name, and closes on its close control or an outside click. (AC-6)
- `src/pages/ExerciseLibrary.tsx` — rebuilt: search input, anatomy-group pill selector (incl. "All"), difficulty/equipment/mechanics pill filters, a reset action, a live result count, the card list (richer fields + "Watch Demo" opening the technique modal + a session-only "Add to Routine" per-card acknowledgment), a no-results state, and the anatomy inspector in a sticky column. (AC-1, AC-2, AC-4, AC-5, AC-6)

**Approach:** high-level only — NOT implementation prescription
- `filterExercises` stays a pure function over the static array — same shape as `filterByMuscle`, just more filter fields ANDed together.
- Search matches case-insensitive substring against the exercise's name, target muscle, and equipment.
- "Add to Routine" is UI-only (per-card local state flips a button to an "Added" acknowledgment) — no cross-page state, no change to Routine Builder's deterministic generation, per the TSD amendment's explicit scope note.
- The technique modal's "Watch on YouTube" link is a real, constructed `https://www.youtube.com/results?search_query=...` URL — no per-exercise curated video is required for this specific action (distinct from the card's own stored `videoUrl`, which continues to work exactly as it does today).

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- YouTube (per-exercise stored video) — REAL, not mocked; same mechanism as Routine Builder's `VideoThumbnail` (already proven there).
- YouTube (technique-modal search link) — REAL, not mocked; AC-6's e2e test asserts the link's `href` is a well-formed `youtube.com/results?search_query=...` URL for the exercise's name; it does not require the search to actually resolve over the network (jsdom doesn't fetch external resources, consistent with how the Routine Builder task treated this same boundary).

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- B-1 (tracer bullet, AC-1 + AC-3): `filterExercises` for representative combinations (search+anatomy, anatomy+difficulty, equipment+mechanics) returns only exercises matching every active filter, each with a well-formed video reference and non-empty cues.
- B-2 (backfill, AC-2): a filter combination with no matches returns an empty list — a property of the same filtering function proven in B-1, backfilled via `lane red --backfill`.
- B-3 (e2e, AC-4 + AC-5 + AC-6): a user searches/filters and sees the narrowed cards + matching count; resets and gets the full list back; hits a no-match combination and sees the no-results state; selects an anatomy group and sees the inspector highlight update; toggles anterior/posterior and sees the view change without losing the selection; opens a card's technique modal (name/cues/YouTube-search link) and closes it; uses "Add to Routine" without error.

**PR will contain:**
- `src/domain/exerciseFilter.ts` (extended type + `filterExercises`) + `src/domain/exerciseFilter.test.ts` rewritten for the new function (old `filterByMuscle` tests replaced, not kept alongside — same pattern as the routine-builder task's `generateRoutine` → `generateWeeklyPlan` replacement)
- `src/data/exercises.ts` (new fields backfilled onto existing 21 exercises)
- `src/pages/AnatomyInspector.tsx` (replaces `BodyMap.tsx`)
- `src/pages/ExerciseTechniqueModal.tsx` (new)
- `src/pages/ExerciseLibrary.tsx` (rebuilt) + test

**Open questions / ambiguities:** (MUST be resolved before execution)
- Equipment categorization for machine-based lifts (Leg Press) — RESOLVED: the PRD's equipment enum has no "machine" option; categorized as `barbell` (plate-loaded), an approximation, not a claim of literal barbell use.
- Anterior/posterior region coverage — RESOLVED: each view only exposes regions actually visible from it (e.g. `back` only from posterior, `chest`/`core` only from anterior); `shoulders`/`arms`/`legs`/`full-body` are visible-enough from both and clickable in both views.
- "Add to Routine" scope — RESOLVED (per TSD amendment): session-only UI acknowledgment, not integrated with S-0001.02's plan generation.

**Path:** R (rich)
**Escalation signals hit (≥2 → R):** ambiguities≥3 (equipment categorization, anterior/posterior coverage, add-to-routine scope — all resolved above) · blast-radius≥3 (shared data/domain rewrite, two new page files, page rebuild)
- [ ] Refactor pass done (on green; tests unchanged) — before PR
