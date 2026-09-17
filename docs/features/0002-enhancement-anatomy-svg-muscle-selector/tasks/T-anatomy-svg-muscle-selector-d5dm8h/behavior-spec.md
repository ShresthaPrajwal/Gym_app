# Behavior Spec — T-anatomy-svg-muscle-selector-d5dm8h: Clickable front/back anatomy diagram selector
> Source: task card ACs + docs/features/0002-enhancement-anatomy-svg-muscle-selector/tasks/T-anatomy-svg-muscle-selector-d5dm8h/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.
>
> NOTE: numbering follows the APPROVED exec plan, which differs from this file's scaffold.
> The plan drives AC-3 as a real cycle (B-2) rather than leaving it an off-ledger invariant,
> because it fails at the task base: the placeholder figure exposes only 9 of the 17 regions
> the diagram depicts. AC-2 and AC-4 are grouped into B-3 as the plan states, since both are
> observations of the same single rendered view.

## B-1 (tracer bullet): AC-1 [behavior]: clicking a muscle region in the diagram selects that muscle and narrows the exercise list to it; the selected region is rendered visually distinct from unselected regions.
- Given: the anatomy inspector rendered with nothing selected, and a selection handler supplied by
  the host page
- When: the user activates the `calves` region control — a region the supplied diagram depicts but
  the placeholder figure never exposed, so a passing result cannot be inherited from the old component
- Then: the handler is invoked with exactly that region, which is how the host page's muscle filter
  is driven (the inspector itself holds no filter state, per the TSD)

## B-2: AC-3 [invariant, driven as a cycle — see note above]: every region the diagram depicts is selectable, and the silhouette-only regions are inert.
- Given: the inspector rendered, and the diagram's trainable regions enumerated explicitly in the
  test (NOT read back out of `MUSCLE_GROUPS` — that would assert "whatever we shipped is what we
  shipped" and pass vacuously, the trap that had to be corrected mid-flight in the sibling task)
- When: the diagram's region controls are collected, and each enumerated region is activated in turn
- Then: every one of the 17 depicted regions has a control that reports exactly that region to the
  host page; `full-body` has none, because the TSD makes it unreachable from the body; and the
  asset's head and feet expose no control at all

## B-3: AC-2 + AC-4 [behavior]: the legend names the current selection (and says so when there is none), and back-only regions are selectable with no view toggle.
- Given: the inspector rendered twice — once with nothing selected, once with a back-only region
  selected
- When: the legend is read in each case, and the controls for regions the asset only draws from
  behind (trapezius, lats, triceps, lower back, glutes, hamstrings) are looked for in the single
  rendered view
- Then: the legend names the selected region when there is one and says plainly that none is
  selected otherwise; and every back-only region is present without any view having been switched,
  because front and back are drawn together — there is no view-toggle control to find
- Honesty note on what this cycle actually drives: only the **legend** assertion fails at the
  moment of RED. The AC-4 assertion (back-only regions reachable, no toggle) fails at the task
  BASE — the placeholder had an ANT/POST switch and exposed neither glutes nor lower back — but it
  was already satisfied by the dual-panel diagram landed in B-1/B-2, so within this cycle it
  guards that design rather than driving it. Recorded rather than presented as test-first.

## B-4: AC-5 [e2e]: in the running app a user opens the Exercise Library, clicks a muscle on the anatomy diagram, and sees the list narrow to that muscle's exercises with the legend naming the selection.
- Given: the Exercise Library page rendered with no filters applied
- When: the user clicks a region directly on the anatomy diagram — not the filter chips — choosing
  a back-only region (`glutes`) so the click can only have come from the diagram's back panel
- Then: the listing narrows to exactly that region's exercises, the count the page reports equals
  the number of exercises rendered, and the diagram's legend names the selection back to the user

## B-5 (surfaced by a mechanical geometry audit before review): the asset's inert anatomy is PRESENTED, not omitted.
> AC-3 says head and feet are "inert — not selectable and never highlighted", which means drawn but
> non-interactive. A script-driven comparison of every shape in the source asset against the
> transcription found 53 of 57 path `d` attributes reproduced exactly and **4 missing: both feet,
> front and back**. The head was carried over, the feet were dropped, so the rendered figure ends
> at the ankles. "Inert" was mis-implemented as "absent", which is both a geometry-fidelity gap and
> an AC-3 deviation. No existing test caught it because every AC-3 assertion checks that head/feet
> are NOT selectable — none checks they are still drawn.
- Given: the inspector rendered
- When: the shapes the asset draws for the inert head and feet are looked for, and the region
  controls are enumerated
- Then: those shapes are present in the rendered diagram, and none of them exposes a control —
  presented and inert, rather than simply missing

## Invariants & non-functional ACs (NOT RED→GREEN cycles)
> Not standalone behaviors to drive. An invariant usually holds as a property of a
> behavior above (state which) or is locked by a guard test recorded off-ledger with
> `lane red --regression`. Non-functional ACs are validated out-of-band (load test, etc.).
- None. AC-3 is tagged `invariant` on the card but is driven as cycle B-2: a `--regression` guard
  must pass at the task base, and this assertion fails there because the placeholder figure exposes
  only 9 of the 17 depicted regions (missing neck, forearms, obliques, hip-flexors, knees, calves,
  glutes and lower-back). That makes it new behavior by definition.
- Not assertable by this suite, and deliberately not claimed as covered: whether the rendered
  diagram is *visually* faithful to the supplied asset. The exec plan records this as accepted risk
  — the paths are transcribed rather than re-drawn, and the owner reviews the running page.
