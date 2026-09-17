---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
approved_sha256: "ee2e7d1d0c1f32b688559d00befd7c776f769d8dc160ee4e7bf34f3b165a7fb5"
---
## Task T-anatomy-svg-muscle-selector-d5dm8h — Clickable front/back anatomy diagram selector
**Parent:** story S-0002.01 · feature 0002-enhancement-anatomy-svg-muscle-selector (docs/features/0002-enhancement-anatomy-svg-muscle-selector/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)

Replaces the placeholder block-figure inspector with the supplied anatomy diagram: front and back
panels shown together, region geometry and labelling reproduced exactly, colour and type resolved
through existing design-system tokens, presented as a full-width band above the exercise results.
Depends on the muscle vocabulary from T-anatomy-svg-muscle-selector-0brfns.

**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: clicking a muscle region in the diagram selects that muscle and narrows the exercise list to it; the selected region is rendered visually distinct from unselected regions.
- [ ] AC-2 [behavior]: the diagram names the current selection back to the user in its legend, and states that nothing is selected when no muscle is chosen.
- [ ] AC-3 [invariant]: every clickable region of the supplied diagram maps to a muscle in the vocabulary, and the regions the diagram draws as silhouette rather than muscle (head, feet) are inert — not selectable and never highlighted.
- [ ] AC-4 [behavior]: regions visible only from behind (e.g. lats, glutes, hamstrings, trapezius) are selectable without any view toggle, because front and back are presented together.
- [ ] AC-5 [e2e]: in the running app a user opens the Exercise Library, clicks a muscle on the anatomy diagram, and sees the list narrow to that muscle's exercises with the legend naming the selection.

**End-to-end AC:** AC-5 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3, AC-4, AC-5  ← ordered; first = tracer bullet
**Test scope:** src/pages/AnatomyInspector.test.tsx + src/pages/ExerciseLibrary.test.tsx   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
