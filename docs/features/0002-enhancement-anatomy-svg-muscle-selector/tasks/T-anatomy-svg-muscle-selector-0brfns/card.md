---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
approved_sha256: "b00c31a0d8b22f17992d3d64a4f576e64cc3d5cfffbe7387be803de60f46b35b"
---
## Task T-anatomy-svg-muscle-selector-0brfns — Per-muscle exercise vocabulary, data & filtering
**Parent:** story S-0002.01 · feature 0002-enhancement-anatomy-svg-muscle-selector (docs/features/0002-enhancement-anatomy-svg-muscle-selector/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)

Replaces the seven coarse body areas with the 17-region muscle vocabulary + `full-body`, re-tags
every existing exercise onto the specific muscle it trains, authors exercises for the regions that
would otherwise be empty, and keeps routine generation whole. Observable end-to-end today through
the Exercise Library's existing muscle filter controls — the anatomy diagram is the NEXT task, and
this one must stand on its own without it.

**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [behavior]: filtering the exercise set by a single muscle returns only exercises whose target muscle is that muscle, and returns nothing tagged to any other muscle.
- [ ] AC-2 [invariant]: every muscle in the vocabulary that is selectable returns at least one exercise — no selectable muscle yields an empty list.
- [ ] AC-3 [invariant]: generating a weekly routine returns at least one exercise for every training day, for every goal / experience / cadence / hardware combination.
- [ ] AC-4 [e2e]: in the running app a user picks a specific muscle in the Exercise Library filter controls and sees the list narrow to that muscle's exercises with the reported count matching the number shown.

**End-to-end AC:** AC-4 [e2e] — reachable through the running app (required: green component/unit ≠ reachable)
**Tests:** AC-1, AC-2, AC-3, AC-4  ← ordered; first = tracer bullet
**Test scope:** src/domain/*.test.ts + src/pages/ExerciseLibrary.test.tsx   ← documentation: where this task's OWN tests live. Scope is NOT configured — red/green scope to the changed test files and `verify` derives it from the RED commits (ADR-0002); `review` runs the FULL suite. This line is a human pointer only.
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
