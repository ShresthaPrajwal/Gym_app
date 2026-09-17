## TSD S-0004.03 — Filter pill group overflow fix  (PRD §S-0004.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `RoutineBuilder` PillGroup component; `ExerciseLibrary` filter pill rows |
| Data / State | No state change |
| Behavior | Filter groups use `flex-wrap` with `gap-1`; each pill min-h-[44px] px-3; group container never sets `overflow: hidden` or fixed width. On mobile (<768px) the 3-column grid in RoutineBuilder becomes single column. |
| Access | N/A |
| Boundaries | None |
| Tests | N/A — layout/UX change |
