---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
# planned_behaviors — machine-read count of RED→GREEN cycles (B-N). Leave empty to let
# lane infer from B-N labels below; SET it when an AC becomes a regression guard so
# `lane next` knows the remaining count (frontmatter edits need no re-approval).
planned_behaviors: "4"
approved_sha256: "91305a8fbf2bbb689f42377d15cc6058962a0438789eae12da86910bd8a23747"
---
## Exec Plan — Task T-anatomy-svg-muscle-selector-d5dm8h
> Authored during planning, before any code. ★GATE: DEV/SA approve via `lane approve` BEFORE any code (lane writes the stamp). Resolve all ambiguities first.

**Will build:** (mapped to each AC)
- **AC-1** — Each muscle region of the supplied diagram becomes a selectable control that sets the
  page's muscle filter, and the selected region renders visually distinct from the rest.
- **AC-2** — A legend names the current selection back to the user, and says plainly when nothing
  is selected.
- **AC-3** — The region set is exactly the diagram's own trainable regions. Verified mapping: the
  asset's `data-muscle` values are **Neck · Shoulders · Chest · Biceps · Forearms · Core · Obliques ·
  Hip Flexors · Quadriceps · Knees · Calves/Lower Legs · Trapezius · Lats · Triceps · Lower Back ·
  Glutes · Hamstrings** — 17 values corresponding one-for-one to the 17 anatomical regions in the
  vocabulary, with `Calves / Lower Legs` (front) and `Calves` (back) both resolving to `calves`.
  **Head and Feet are inert**: the asset draws their inner shapes with its silhouette style rather
  than its muscle style, so they are presented but never selectable and never highlighted.
  `full-body` is deliberately unreachable from the body, exactly as the TSD states — it stays
  reachable through the existing filter controls.
- **AC-4** — Front and back are rendered together in one view, so regions only visible from behind
  (trapezius, lats, triceps, lower back, glutes, hamstrings, calves) are selectable with no toggle.
- **AC-5** — The whole flow works through the running Exercise Library page.
- **Layout (owner's decision, recorded in the PRD):** the inspector moves from the narrow
  `lg:col-span-4` sidebar to a **full-width band above the results list**, and the results list
  becomes full width. The asset is a two-panel landscape diagram and is unreadable at a third of
  the page width.

**Approach:** high-level only — NOT implementation prescription
The diagram is brought in as real markup rather than an image, because an image can neither expose
per-region controls nor take the app's colour tokens. Its geometry — every path, coordinate, label
and leader line — is reproduced as authored. What is deliberately NOT carried over is the asset's
own presentation and behaviour layer:
- its embedded stylesheet and literal hex palette are replaced by the existing design-system tokens,
  because BLUEPRINT requires styling to flow through the design system and forbids a second,
  parallel styling mechanism. The asset's selected-state colour is already close to the system's
  existing accent, so this is a substitution, not a redesign.
- its embedded script is dropped entirely. Selection state belongs to the page (the inspector is
  specified as holding no state of its own), so region controls are wired to the page's existing
  selection callback rather than the asset's DOM-mutating handler.
Each region is an accessible control — keyboard reachable, carrying its region name and selected
state — so behaviour is assertable through the interface rather than through fill colours.

**Boundaries & mocks:** (from TSD Boundaries) what's FAKED (network/external services, clock, randomness, filesystem) vs REAL. Each fake = an injected port. Boundaries non-empty ⇒ name the smoke AC that hits the real one in a realistic environment.
- **Nothing is faked — no ports, no mocks.** TSD Boundaries is empty for this story. The diagram is
  static markup compiled into the bundle; the exercise set is static data used REAL. No network,
  clock, randomness or filesystem dependency is introduced, and **no smoke AC is required**. The
  per-exercise demo video remains a passive link/embed owned by 0001 and is not exercised here.

**Behaviors (TDD order):** B-1 first (tracer bullet), then B-2, B-3 … ; include the `e2e` behavior
- **B-1 (tracer bullet, AC-1)** — Activating one region control selects that muscle and narrows the
  exercise listing to it. Thinnest cut proving the diagram is wired to the page's filter at all.
- **B-2 (AC-3)** — The diagram exposes a control for every one of the 17 vocabulary regions it
  depicts, and none for the inert head/feet. Asserted against an explicitly enumerated list, not by
  reading the vocabulary back out of the component — the same vacuity trap that had to be corrected
  mid-flight in the sibling task.
- **B-3 (AC-2 + AC-4)** — The legend names the selected region and reports plainly when nothing is
  selected; and a back-only region is selectable with no view toggle. Grouped because both are
  observations of the same single rendered view.
- **B-4 (AC-5, `e2e`)** — End to end through the rendered page: click a region on the diagram, the
  listing narrows to that region and the legend names it.

**PR will contain:**
- The anatomy diagram as an interactive, token-styled component replacing the placeholder
  block-figure inspector.
- The Exercise Library re-laid-out with the inspector as a full-width band above a full-width
  results list.
- Tests for B-1 … B-4.
- **Updates to the inherited page test, which this task's own ACs invalidate.** It currently asserts
  an `ANT`/`POST` view toggle and that a back-only region is absent until the user switches view
  (`ExerciseLibrary.test.tsx:63-65`). AC-4 removes that toggle by design, so those assertions must
  become "front and back are both present at once". Flagged here so the change reads as
  spec-driven rather than as a test bent to fit new code.

**Open questions / ambiguities:** (MUST be resolved before execution)
- *(resolved, product owner 2026-09-17)* Fidelity: geometry exact, colour/type through existing
  tokens. Recorded in the PRD, so the token substitution above is not a silent divergence.
- *(resolved, product owner 2026-09-17)* Placement: full-width band above the results list.
- *(resolved by inspection, no blocker)* Head/Feet inert, per the TSD and the asset's own styling.
- **Accepted risk, not an open question:** "geometry exact" is only testable here in so far as the
  right regions exist and respond. Whether the rendered picture is *visually* faithful to the asset
  cannot be proven by this suite — no visual-regression harness exists in this project and adding
  one is out of scope. Mitigation: paths are transcribed rather than re-drawn, and the owner reviews
  the running page. Stated so the verification report cannot overclaim on this point.

**Path:** L (lean, default) | R (rich)  → **Path L**
**Escalation signals hit (≥2 → R):** ambiguities≥3 · blast-radius≥3 · security · amendments≥2 · prior-fail · self-flag
- Objective signals: amendments 0 · prior-fail none · self-flag none.
- Judgment trio: **blast-radius — NOT fired** (two files: the inspector component and the page
  hosting it; domain layer, data and generator are all untouched). **ambiguities≥3 — not fired**,
  the two material ones were settled before the PRD. **security — not fired**, no new I/O surface,
  no auth, no user input beyond a click.
- **Total 0 signals → Path L**, and unambiguously so. Noting for the approver that the sibling
  task's Path L was retained *against* a 2-signal read; this task adds no data, no vocabulary and
  no domain logic, so it is genuinely the lighter piece of work.
**If overriding R→L:** risk acknowledged here + SA co-signs Verification.  → N/A, no override.
- [ ] Refactor pass done (on green; tests unchanged) — before PR
