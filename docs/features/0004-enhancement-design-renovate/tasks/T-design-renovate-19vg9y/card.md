## Task T-design-renovate-19vg9y — Filter pill group overflow fix (RoutineBuilder)
**Parent:** story S-0004.03 · feature 0004-enhancement-design-renovate
**Slice:** Fix Adaptation Threshold / Microcycle Cadence / Hardware selector overflow in RoutineBuilder
**Acceptance criteria:**
- [ ] AC-1 [behavior]: All filter options visible on viewports from 375px to 1280px with no clipping or horizontal scroll
- [ ] AC-2 [behavior]: Pills wrap naturally on narrow viewports and remain tappable (min 44px tap target height)
- [ ] AC-3 [e2e]: On 375px, user can select any option in all three filter groups without zooming or scrolling horizontally
**End-to-end AC:** AC-3 [e2e]
**Tests:** N/A — layout/UX change verified by manual review
**Test scope:** tests/T-design-renovate-19vg9y/
**Done =** reviewable PR, no overflow on 375px–1280px.
