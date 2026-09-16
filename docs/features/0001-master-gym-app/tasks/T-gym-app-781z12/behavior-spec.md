# Behavior Spec — T-gym-app-781z12: Shared Tailwind design system (tokens + component library)
> Source: task card ACs + docs/features/0001-master-gym-app/tasks/T-gym-app-781z12/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-2 [behavior]: a rendered app screen composes only shared building blocks (button, card, text input, select, badge, page layout) — no page-local duplicate of a shared component.
- Given: the app's placeholder screen, built only from the shared component library
- When: the screen is rendered
- Then: querying the rendered output finds only instances of the shared components (Button, Card, Input, Select, Badge, PageLayout) — no other element carries page-local styling/markup that duplicates one of them

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- AC-1 [invariant]: color palette, spacing scale, and type scale are defined once as design tokens; components/pages contain no ad-hoc hex/pixel values. — coverage: property of B-1 — the shared components (built during B-1) consume only token-driven utility classes; verified by code review of the diff (no literal hex/px values in component source).
- AC-3 [non-functional]: the same rendered screen adapts fluidly at mobile (~375px), tablet (~768px), and desktop (~1280px+) widths, using shared responsive breakpoints, with no horizontal scroll or overlapping content. — coverage: out-of-band manual/visual check at the three breakpoints during PR review (non-functional, not a unit test).

