## TSD S-0004.04 — Mobile responsiveness pass  (PRD §S-0004.04)
| Aspect | Spec |
|--------|------|
| Interfaces | `ExerciseLibrary`, `RoutineBuilder`, `PageLayout` |
| Data / State | No state change |
| Behavior | Exercise cards: on mobile stack to thumbnail-top / content-below (flex-col). PageLayout: horizontal padding scales from px-4 on mobile to px-gutter on lg. Nav tabs: min-h-[44px], text truncated not clipped. No element causes overflow-x on 375px. |
| Access | N/A |
| Boundaries | None |
| Tests | N/A — layout/UX change |
