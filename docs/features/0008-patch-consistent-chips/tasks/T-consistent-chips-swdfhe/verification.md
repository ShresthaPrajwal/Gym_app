## Verification — Task T-consistent-chips-swdfhe — 2026-09-26
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.
> Critic: a fresh-context subagent given only snapshot-TSD.md, the task card, and `git diff main...` (src/).

✅ **Conformant:** items matching spec
- AC-1: Routine Builder's Level, Days per week and Equipment render through `ChipGroup` (RoutineBuilder.tsx:84-100). The test scopes to the Level group, starts on the real default "Intermediate", and asserts `aria-pressed` moves to "Beginner".
- AC-2: Nutrition's Sex, Units, Activity level and Macro preset render through `ChipGroup`. The test asserts all four named groups exist and that `aria-pressed` moves from "Male" to "Female". RTL names are exact by default, so "Male" does not match "Female".
- AC-3: a grep for `PillGroup|FilterRow|PillButton` over src/ is empty, and `role="group"` exists only in ChipGroup.tsx. Exercise Library and the anatomy Front/Back switch use `ChipGroup`. The group names and option order are unchanged, and the existing Exercise Library and AnatomyInspector tests pass unmodified.
- AC-4: `tsc --noEmit` is clean and the full suite is 38/38 at `lane review`. Real-browser smoke in Chrome at 390×844 and 1280×900 covered Routine Builder, Nutrition and Exercise Library: 0px horizontal page overflow on all three pages at both sizes, and 0 page errors. Clicking Female moves `aria-pressed` and the active styling onto it.
- Tripwire: the GREEN commits change only `ChipGroup` and the page call sites. `aria-pressed` is computed from real state and nothing is special-cased for tests.
- Project rules: the primitive lives once in src/components and is exported from index.ts. No new CSS files and no inline styles. The `pill` variant's classes do not collide with ChipGroup's.

⚠️ **Divergent:** deviation + severity
- Fixed after the Critic (shallow): chips were 40px tall (`h-10`), below the app's 44px touch-target convention. They are now `min-h-[44px]`.
- Accepted (shallow): the anatomy Front/Back control lost its segmented track background and now looks like every other chip group. This is the intended consistency.
- Accepted (shallow): the Exercise Library rows lost 0007's phone edge bleed. A chip cut off at the container edge still signals that the row scrolls, and dropping the bleed lets one component work in cards, grid columns and the anatomy header.
- Accepted (shallow): Nutrition chips no longer stretch to equal widths (`flex-1` dropped), and the form is one column below `md` (768px), up from below 375px. This is intended: it fixes the squeezed Sex and Units groups on phones.

🚨 **Suspected hallucination:**
- None

❌ **Missing:** acceptance criteria not addressed
- None (the Critic's AC-4 "missing" note referred to the viewport check not yet being recorded; it is recorded above)

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: Routine Builder selectors are named groups with pressed state | ✅ 3a3eabd | ✅ 89d1dc9 | ✅ | ✅ group names, roles, aria-pressed | ✅ none |
| B-2: Nutrition selectors are named groups with pressed state | ✅ 8879bff | ✅ d047932 | ✅ | ✅ | ✅ none |
| Refactor: Exercise Library + anatomy onto ChipGroup (af84064); 44px touch target (2506850) | — | suite green | — | — | — |

**Critic checklist:**
- [x] Mocks only at boundaries: no mocks in this task
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [x] Boundary contract asserted richly: n/a, since there is no external boundary; `aria-pressed` values are asserted exactly, not just presence
- [x] ≥1 `e2e` AC present and GREEN: n/a for this card (none tagged e2e); both behaviors drive the full page components, and 0007's e2e Exercise Library test stays green through this change
- [x] Boundaries non-empty ⇒ a smoke AC exists: n/a (Boundaries: none); a real-browser smoke was still run (AC-4)

**Human verdict:** confirm or dismiss each Divergent item above; the lane approve stamp records who signed
**Outcome:** clean → merge (pending human stamp)
