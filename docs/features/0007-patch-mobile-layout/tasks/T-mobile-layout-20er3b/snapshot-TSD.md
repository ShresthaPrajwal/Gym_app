## TSD S-0007.01 — Mobile layout: anatomy view switch, chip rows, bottom nav

| Aspect | Spec |
|--------|------|
| Interfaces | `AnatomyInspector({ selected, onSelect })` unchanged. New UI: a Front/Back switch (two buttons, `aria-pressed`) shown only below `md`. Filter chips gain `aria-pressed`. Exercise Library count readout becomes one `role="status"` line. |
| Data / State | `AnatomyInspector` holds a local `view: 'front' \| 'back'` (UI state only, default front). The viewport check reads `window.matchMedia('(max-width: 767px)')`. When `matchMedia` is unavailable, it falls back to the desktop layout. |
| Behavior | Narrow viewport: only the chosen body's regions render, enlarged. The switch flips the view. Selecting a region that is absent from the current view (via chips) flips to the side that has it. Wide viewport: both bodies render and there is no switch. |
| Boundaries | `window.matchMedia` (browser API): stubbed in the narrow-viewport test |
| Tests | Component tests (Vitest + RTL): narrow-viewport view switch; chip pressed state; nav/cadence regressions; repaired Exercise Library assertions |
