## TSD S-0008.01 — Shared single-choice chip group

| Aspect | Spec |
|--------|------|
| Interfaces | New shared component `ChipGroup<T extends string \| number>({ label?, name?, options: { value: T; label: string }[], value: T, onChange(value: T) })`. `name` is the group's accessible name and defaults to `label`. Exported from `src/components`. No page's props change. |
| Data / State | None; the component is controlled by its page |
| Behavior | Renders `role="group"` named `name`. Each option is a shared-Button chip; clicking one calls `onChange` with its value; the chip matching `value` reports `aria-pressed="true"` and the others `"false"`. It is used for all Routine Builder, Nutrition and Exercise Library selectors and the anatomy Front/Back switch. |
| Boundaries | None |
| Tests | Component tests (Vitest + RTL): pressed state and selection on the Routine Builder and Nutrition pages; existing Exercise Library and AnatomyInspector tests stay green |
