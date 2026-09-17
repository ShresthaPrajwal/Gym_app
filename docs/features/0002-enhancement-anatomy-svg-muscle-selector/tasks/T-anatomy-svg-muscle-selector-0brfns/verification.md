## Verification — Task T-anatomy-svg-muscle-selector-0brfns — 2026-09-17
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

**Critic:** independent subagent, fresh context, given ONLY `snapshot-TSD.md` + `card.md` + the
branch diff. It was NOT given the exec plan, the behaviour spec, or any build reasoning.
**Critic verdict:** `PASS WITH CONCERNS` — "should not merge until the placeholder URLs are
replaced and the URL-shape assertion is widened to cover every record rather than three."
**Suite at review:** 24 tests / 7 files, all green. `tsc --noEmit` clean.
**Path:** L was retained against a 2-signal routing read (see exec-plan AMENDMENT 2), which makes
this an R→L override — **SA co-sign required on this report**, per the exec-plan template.

✅ **Conformant:** items matching spec
- **AC-1 SATISFIED** — filtering by a single region returns only that region's exercises
  (`exerciseFilter.test.ts:57-64`). `filterExercises` is byte-identical to base; only the value
  space widened.
- **AC-2 SATISFIED** — no selectable region is a dead end. Critic re-derived the per-region counts
  from the data rather than trusting the test: neck 4 · trapezius 5 · shoulders 16 · chest 8 ·
  lats 16 · lower-back 5 · biceps 12 · triceps 12 · forearms 4 · core 13 · obliques 4 ·
  hip-flexors 4 · glutes 5 · quadriceps 10 · hamstrings 7 · knees 4 · calves 3 · full-body 35.
  Minimum 3, none zero.
- **AC-3 SATISFIED** — no empty training day across GOALS × EXPERIENCE_LEVELS × CADENCES ×
  HARDWARE_TIERS. Critic confirmed real implementation support: each archetype union contains at
  least one bodyweight-tier region.
- **AC-4 SATISFIED** — page-level narrowing + reported count matches rendered count, with the
  sector readout scoped so it cannot accidentally match the filter chip.
- **Vocabulary conformance exact** — `MUSCLE_GROUPS` is the spec's 17 regions plus `full-body`; no
  extras, omissions or renames, and every record's `targetMuscle` is a member.
- **Both tripwires cleared** — the two GREENs that touched files their own tests import
  (`exerciseFilter.ts`, `ExerciseLibrary.tsx`) changed only the vocabulary array, the `machine`
  literal and two label maps. No assertion-relevant behaviour was loosened; `filterExercises` is
  unchanged. The AC-2 test compares `MUSCLE_GROUPS` against an independently spelled-out list, so
  it fails on any drift.
- **Edited pre-existing tests preserved intent** in all four cases (see Divergent for the one smell).
- **No in-scope spec requirement left unimplemented.**

⚠️ **Divergent:** deviation + severity (shallow/deep)
- 🚨 **DEEP — BLOCKING — 92 of 167 exercises carry a structurally invalid video reference.**
  90 records share `watch?v=1V3v6z4Z4E` and 2 share `watch?v=FK4rZQ8Z4E`; both IDs are **10
  characters** where YouTube IDs are 11, so they cannot resolve to any video. Independently
  confirmed by ID-length census: 92 records at length 10, 75 at length 11. The spec keeps a
  per-exercise "demo video reference" as a real field, so more than half the catalogue ships a
  dead link — the thumbnail (`img.youtube.com/vi/<id>/hqdefault.jpg`) and the embed both break the
  moment a user opens the technique modal. Origin: inherited verbatim from the product-owner-supplied
  reference list, which was flagged at hand-off as having possibly-wrong URLs; importing it did not
  fix them. **Owner decision required — see Human verdict.**
- 🚨 **DEEP — BLOCKING — a further 12 video IDs authored in this task are well-formed but dead.**
  Not a Critic finding; found by this session network-checking its own work via the YouTube oEmbed
  endpoint. Of the 19 records authored fresh here, 12 return 404: Barbell Calf Raise, Plate Neck
  Flexion, Plate Neck Extension, Lateral Neck Flexion, Chin Tuck, Hanging Knee Raise, Cable Hip
  Flexion, Psoas March, Terminal Knee Extension, Step-Down, Reverse Nordic Curl, Reverse
  Hyperextension. 7 resolve. These IDs were fabricated to look plausible rather than sourced —
  the same defect class as the item above, self-inflicted. **Owner decision required.**
- ⚠️ **SHALLOW — the URL-shape assertion cannot catch either problem.** `YOUTUBE_URL_RE`
  (`exerciseFilter.test.ts:3`) uses `[\w-]+`, which matches any length, and the only test using it
  runs over `{search:'press', muscle:'chest'}` — 3 records, all with real IDs. Critic's
  recommendation: widen it to enforce an 11-character ID and apply it to **every** record.
  Not yet done; it is a new guard on existing data, so it belongs in this task or its follow-up.
- ⚠️ **SHALLOW — `machine` added to the equipment vocabulary is unspecified by the TSD**, which says
  only the muscle value space widens and other per-exercise fields are "unchanged in meaning". This
  adds a fifth user-visible equipment chip. **Already disclosed and human-ratified** in exec-plan
  AMENDMENT 2 before implementation; recorded here because the Critic, correctly, could not see that
  the approver had been told.
- ⚠️ **SHALLOW — test smell in an edited pre-existing test.** `'bench' → 'bench press chest'`
  (`ExerciseLibrary.test.tsx:18`) restores the single-result precondition, but only works because
  search is a substring match over the internal concatenation `name targetMuscle equipment`. The
  test now depends on that internal layout and on a search string no real user would type — an
  implementation detail leaking into an integration test. A name-unique term would be cleaner.
- ⚠️ **SHALLOW — the archetype union is largely cosmetic.** `pickExercises` takes
  `pool.slice(0, count)` in file order, so a Legs day fills from the first quadriceps entries and
  may never surface hamstrings / glutes / calves. Pre-existing selection logic, not introduced
  here, and not spec-violating — but it means the per-region split buys less routine variety than
  it appears to.
- ⚠️ **SHALLOW — questionable muscle tags (judgement, not error).** Critic sampled ~40 records
  across all 18 regions and found nothing anatomically absurd, but flagged: `Deadlift → lats`
  (erector/hamstring/glute dominant — `lower-back` or `hamstrings` arguably fit better);
  `Farmer's Carry` (forearms) and `Farmer's Walk` (trapezius) being the same movement split across
  two regions, which reads as filler to populate `forearms`; `Glute-Ham Raise` marked `isolation`;
  and `Pistol`/`Cossack`/`Shrimp` squats tagged `full-body` rather than `quadriceps`. The exec plan
  flagged tag accuracy as accepted risk precisely because types cannot catch a debatable tag.

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- None. The Critic reported no fabricated API, invented dependency, or non-existent identifier in
  the diff. Note the inverse did occur in the *data*: fabricated video IDs, recorded above as
  Divergent rather than here because they are shipped content, not an imagined code interface.

❌ **Missing:** acceptance criteria not addressed
- None. All four ACs are satisfied and green. The blocking items above are data-quality defects
  inside satisfied ACs, not unmet criteria — no AC in this card asserts anything about video
  references, which is itself why the defect survived to review.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1 (AC-1): filter by one specific region | ✅ `6a23b1e`→ RED failed `expected 0 to be greater than 0` | ✅ `a7dd333` | ✅ asserts filter output, not internals | ✅ `filterExercises` only | ✅ none used — Boundaries empty |
| B-2 (AC-2): no region is a dead end | ✅ `91e04b5`, re-anchored `ed29677` after test refinement | ✅ `e53b1fb` | ✅ enumerated regions, resists vacuous pass | ✅ `filterExercises` + `MUSCLE_GROUPS` | ✅ none used |
| AC-3: no empty training day | ⬜ **off-ledger regression guard** `130ce27` — lane independently confirmed the behaviour existed at base | n/a | ✅ asserts generated plans | ✅ `generateWeeklyPlan` | ✅ none used |
| AC-4: e2e page narrowing | ⬜ **off-ledger back-fill** `e01bba4` — behaviour was already implemented before its test was written | n/a | ✅ asserts rendered output | ✅ via rendered page | ✅ none used |

Net ledger: **2 proven RED→GREEN cycles, 1 regression guard, 1 back-fill.** The plan as first
approved claimed 4 cycles; both reclassifications are recorded in exec-plan AMENDMENT 1 and the
behaviour-spec note, and the back-fill is a process shortfall (the total label map forced the
vocabulary labels into B-1's GREEN, pre-satisfying AC-4).

**Critic checklist:** (checkboxes — `done` only enforces checkboxes; resolve each)
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts — *no mocks at all; TSD Boundaries is empty, static data used real throughout*
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness) — *AC-1/AC-4 through interfaces, AC-2/AC-3 as exhaustive properties*
- [x] Boundary contract asserted richly (args/content), not bare "was called" — *n/a, no boundary crossed*
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system) — *AC-4, via the rendered Exercise Library*
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging) — *n/a, Boundaries empty, no smoke AC required*

**Human verdict:** each item confirmed/dismissed (Path R: + SA) — the lane approve stamp records who signed

*Unresolved and awaiting the owner — this report is NOT ready to stamp as-is:*
1. **The two BLOCKING video-reference flags.** ~104 of 167 exercises have a broken demo video
   (92 structurally invalid + 12 fabricated-but-dead). Options put to the owner: (a) source and
   network-verify real IDs for every record; (b) treat the curated video as genuinely optional and
   fall back to the existing per-exercise YouTube *search* link, which already exists in the domain
   layer — no fabricated data, degrades honestly, but it is a design change needing a spec
   amendment or a follow-up task; (c) accept known-broken now, widen the URL guard, and file a
   follow-up to curate. This session recommends (b) over (a): its own attempt at (a) produced a
   12-of-19 failure rate, which is the defect, not the fix.
2. **Whether to widen the URL-shape guard in this task or the follow-up.**
3. **Whether any flagged muscle tag should be re-assigned** (`Deadlift`, the Farmer's split, the
   single-leg squat variants).

**Outcome:** divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
