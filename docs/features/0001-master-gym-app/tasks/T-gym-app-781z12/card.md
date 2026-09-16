---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "37a3eecfaffeba87bb224ceab16a2a542772635c5aff3201217f789354c4d131"
---
## Task T-gym-app-781z12 — Shared Tailwind design system (tokens + component library)
**Parent:** story S-0001.01 · feature 0001-master-gym-app (docs/features/0001-master-gym-app/ — its PRD + TSD)
**Slice:** a complete observable behavior end-to-end + tests (full vertical — a disconnected layer = smell)
**Acceptance criteria:** (tag each `behavior`/`invariant`/`non-functional`/`e2e`; behavior ACs = observable outcome through an interface — NO "calls X / saves to table Y / uses lib Z")
- [ ] AC-1 [invariant]: color palette, spacing scale, and type scale are defined once as design tokens; components/pages contain no ad-hoc hex/pixel values.
- [ ] AC-2 [behavior]: a rendered app screen composes only shared building blocks (button, card, text input, select, badge, page layout) — no page-local duplicate of a shared component.
- [ ] AC-3 [non-functional]: the same rendered screen adapts fluidly at mobile (~375px), tablet (~768px), and desktop (~1280px+) widths, using shared responsive breakpoints, with no horizontal scroll or overlapping content.
**End-to-end AC:** AC-2 [e2e] — a running app screen (even a placeholder page) is composed entirely from the shared component library, reachable in the browser.
**Tests:** AC-1, AC-2, AC-3
**Test scope:** tests/T-gym-app-781z12/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
