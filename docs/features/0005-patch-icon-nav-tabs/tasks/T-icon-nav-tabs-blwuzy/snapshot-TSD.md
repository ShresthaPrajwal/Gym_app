## TSD S-0005.01 — Icons on nav tabs and selection cards
| Aspect | Spec |
|--------|------|
| Interfaces | `App.tsx` nav buttons; `RoutineBuilder` goal cards; `ExerciseLibrary` filter group labels |
| Data / State | None |
| Behavior | Nav tabs: icon (16×16 SVG) + label stacked vertically, centred. Goal cards: thematic 20×20 icon above the label. Filter labels (Difficulty / Equipment / Mechanics / Anatomy): small 14×14 icon inline before the text. All icons use `currentColor` so they inherit the button's active/inactive colour automatically. |
| Boundaries | None |
| Tests | N/A — visual/presentational change |
