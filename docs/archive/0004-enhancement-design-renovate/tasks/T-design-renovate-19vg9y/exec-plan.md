---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
planned_behaviors: ""
approved_sha256: "5a43f1387b912a5eace7b38a106a3067503fb94f9c3663a9f31afe4798c90b03"
---
## Exec Plan — Task T-design-renovate-19vg9y
> Tests: N/A — layout/UX change. No TDD ledger.

**Will build:**
- Fix PillGroup in RoutineBuilder: replace fixed-column grid with flex-wrap so pills wrap naturally on narrow viewports
- Ensure pills meet 44px min tap target height

**Approach:**
- `PillGroup` in `RoutineBuilder.tsx`: replace `style={{ gridTemplateColumns: ... }}` grid with `flex flex-wrap gap-1`; add `min-h-[44px]` to each pill Button
- Outer container stays `grid grid-cols-1 gap-md lg:grid-cols-3` — already correct
- Labels: remove "01." / "02." / "03." numeric prefixes (they imply a sequence, but these are independent selectors — frontend-design principle: numbered markers only for actual sequences)

**Boundaries & mocks:** None

**Behaviors:**
- B-1: Pills wrap naturally at any viewport width, no overflow-x
- B-2: Each pill is min 44px tall — thumb-friendly on mobile
- B-3 [e2e]: All three filter groups fully usable at 375px with no horizontal scroll

**PR will contain:**
- `src/pages/RoutineBuilder.tsx` — PillGroup layout fix + label cleanup

**Open questions / ambiguities:** None

**Path:** L (lean)
- [ ] Refactor pass done — before PR
