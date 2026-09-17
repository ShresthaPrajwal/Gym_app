---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
approved_sha256: "214e676bc28f3e3bb823edf3d418365d2e343fc962bd51fc9a9ba7d7791d8074"
---
## Task T-design-renovate-nprdy3 — Large cinematic exercise video cards
**Parent:** story S-0004.01 · feature 0004-enhancement-design-renovate
**Slice:** Restyle exercise result cards in ExerciseLibrary to a large two-column layout (thumbnail left, metadata right) matching the reference design
**Acceptance criteria:**
- [ ] AC-1 [behavior]: Each card shows a 16:9 thumbnail ≥260px wide on desktop, with name, badges, cues, and action buttons in the right column
- [ ] AC-2 [behavior]: On mobile (≤768px) cards switch to stacked layout (thumbnail on top, content below)
- [ ] AC-3 [e2e]: Opening the exercise library at 1280px shows cards with large thumbnails; opening at 375px shows stacked cards with no horizontal scroll
**End-to-end AC:** AC-3 [e2e]
**Tests:** N/A — visual layout change verified by prototype and manual review
**Test scope:** tests/T-design-renovate-nprdy3/
**Done =** reviewable PR, layout matches reference, no regressions.
