---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: "3"
approved_sha256: "c9a1103096967462a3b708f602d1b53171fd309b5f9bf8909ed849fd216d00c5"
---
## Exec Plan — Task T-anatomy-svg-muscle-selector-0brfns
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- **AC-1** — Widen the shared muscle vocabulary from the 7 coarse body areas to the 17 anatomical
  regions named in the TSD plus `full-body`. The exercise filter's shape does not change; only the
  set of legal muscle values widens, so filtering by a specific region becomes expressible.
- **AC-2** — Re-tag every existing exercise from its coarse area onto the specific region it trains,
  and author new exercises for the regions that would otherwise be empty. Empty today: **neck,
  hip-flexors, knees, calves** (0 exercises each); **lower-back** has 1, too thin to be useful.
- **AC-3** — Recompose the routine generator's goal archetypes over the new vocabulary. Its
  archetypes currently request `back` / `legs` / `arms`, which cease to exist; left alone, every
  Push/Pull/Legs day would silently generate zero exercises.
- **AC-4** — Complete the Exercise Library's muscle label map so each new region is selectable and
  readable in the existing filter controls (the control list already derives from the vocabulary,
  so it picks up new members once labels exist).
- **Keep-the-app-standing (no AC, required for AC-4 to be reachable):** the existing placeholder
  block-figure inspector hard-codes `back` / `legs` / `arms` regions. It is re-pointed minimally at
  the new vocabulary so the page compiles and stays usable. It is *replaced wholesale* by the
  supplied anatomy diagram in T-anatomy-svg-muscle-selector-d5dm8h — deliberately not gold-plated here.

**Approach:** high-level only — NOT implementation prescription
The vocabulary is the single source of truth; everything else is made to conform to it. Consumers
that must handle every region exhaustively are typed as total maps over the vocabulary, so adding a
region makes each incomplete consumer fail to compile — the compiler enumerates the call sites
instead of me hunting for them. Exercise re-tagging is a data edit, not a logic change: no filter,
generator or component logic is restructured beyond what the widened value space forces.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- **Nothing is faked — no ports, no mocks.** TSD Boundaries is empty for this story: the exercise
  set is static data compiled into the bundle and is imported directly and used REAL in every test.
  No network, clock, randomness or filesystem dependency is introduced. Consequently **no smoke AC
  is required**. The per-exercise demo-video reference is a passive link/embed owned by 0001 and is
  not exercised by this task.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- **B-1 (tracer bullet, AC-1)** — Filtering by one specific *new* region returns a non-empty set in
  which every exercise is tagged to that region. Phrased against a region that does not exist at the
  task base (`calves`), so it genuinely fails first: thinnest possible cut proving vocabulary + data
  + filter line up end to end.
- **B-2 (AC-2)** — Every region of the vocabulary returns at least one exercise, asserted against the
  **explicitly enumerated** region list rather than by looping whatever the vocabulary happens to
  contain. Enumerating is both the honest RED (a loop over the vocabulary passes *vacuously* at base,
  where all 7 coarse areas are populated) and the stronger test, since the TSD requires the
  vocabulary to cover the diagram's regions "and nothing else". This is the behavior that forces the
  new exercises to exist.
- **B-3 (AC-3) — OFF-LEDGER REGRESSION GUARD, not a RED→GREEN cycle.** Routine generation returns at
  least one exercise for every training day across every goal / experience / cadence / hardware
  combination. Recorded with `lane red --regression`.
- **B-4 (AC-4, `e2e`)** — Through the rendered Exercise Library, choosing a **specific new region**
  in the filter controls narrows the listed exercises to that region and the reported count matches
  the number shown. Phrased against a region introduced by this task so it fails at base; choosing a
  surviving coarse area would pass at base and prove nothing.

**AMENDMENT 1 (2026-09-17, pre-B-2, corrects this plan as first approved):** AC-3 was planned as a
full RED→GREEN cycle on the stated grounds that it "fails at base once the coarse areas the
archetypes name are gone". That reasoning was wrong, and I verified it empirically before writing any
implementation: with the task base checked out, a test asserting every training day is non-empty
across all goal × experience × cadence × hardware combinations **PASSES**. Routine generation already
fills every day today; my change threatens that behavior rather than introducing it. A test that
passes at base is by definition a guard on EXISTING behavior, so AC-3 is now recorded off-ledger via
`lane red --regression` — the tool LANE provides for exactly this case. Driving it as a plain
`lane red` would have required either a contrived failure or leaving the generator knowingly broken
for a cycle, and would have put a non-proof on the TDD ledger. AC-3's coverage is unchanged and its
test is identical; only its ledger classification is corrected. Consequently `planned_behaviors`
drops from 4 to 3 (B-1, B-2, B-4). The same base-passes trap applied to AC-2 as originally phrased
and is addressed above by enumerating the regions explicitly instead of looping the vocabulary.

**PR will contain:**
- The widened muscle vocabulary in the shared domain module.
- The exercise data set: all existing entries re-tagged, plus new entries for neck, hip-flexors,
  knees, calves and lower-back.
- Routine-generator goal archetypes recomposed over the new vocabulary.
- Exercise Library muscle labels completed; placeholder inspector re-pointed to keep the page whole.
- Tests for B-1 … B-4.
- **Updates to two existing tests whose premise the spec change invalidates** — they assert on the
  retired coarse values and on a "no-match" filter combination that no longer has the same meaning.
  Called out here so the change is visibly spec-driven rather than a test bent to fit the code.

**Open questions / ambiguities:** (MUST be resolved before execution)
- *(resolved, product owner 2026-09-17)* Diagram fidelity — geometry exact, colour/type via existing
  design tokens; and the inspector becomes a full-width band. Both bind the NEXT task, recorded in
  the PRD; nothing here depends on them.
- *(resolved, no blocker)* Head and feet are inert, per the TSD — they carry no exercises, so the
  AC-2 non-empty invariant does not apply to them.
- **Accepted risk, no open question:** the coarse→specific re-tagging encodes ~148 individual
  judgement calls (e.g. Deadlift → `lats`, Good Morning → `lower-back`). Types and the AC-2
  invariant catch *structural* faults but cannot catch a *debatable* tag; a wrong tag is a visible,
  cheaply-corrected data edit, not a correctness or safety fault. Surfaced to the product owner
  before approval and flagged for the Critic to sample.

**Path:** L (lean, default) | R (rich)  → **Path L**
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
- Objective signals fired: **0 / 3** (amendments 0 · prior-fail none · self-flag none) per `lane route`.
- Judgment trio, confirmed by hand: **blast-radius≥3 — FIRED** (vocabulary, static data, routine
  generator, Exercise Library page, placeholder inspector = 5 independent parts). **ambiguities≥3 —
  not fired** (the two material ones were resolved with the product owner before drafting; none
  remain open). **security — not fired**; `lane route`'s keyword hit is spurious, this is a public
  no-auth static client with no secrets, no PII and no new I/O surface.
- **Total 1 signal → Path L stands.** Not an R→L override, so no SA co-sign is required on
  Verification. The one real risk (data-tag accuracy) is recorded above rather than escalated,
  because Path R's heavier apparatus would not detect a debatable muscle tag either.
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.  → N/A, Path L is the routed recommendation.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
