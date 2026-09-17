---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
approved_sha256: "8f66f200344158e07973d8294e5163cedadad3c9463fd59353a188f842fea130"
---
# Mini PRD 0002 — Per-muscle anatomy selector for the Exercise Library
> An `enhancement` iteration (LANE §8) — a small, scoped improvement on top of what already
> ships. Lighter than a full feature PRD: usually one story, no full success-metrics apparatus.
> Paired with TSD.md in this folder. If it grows past a couple of stories, it's a `feature` —
> create one instead.

**Parent:** 0001-master-gym-app (extends its Exercise Library view, story S-0001.04)
**Source:** real-usage feedback   ← why this exists (audit chain, §4; trace ↑ to docs/ROADMAP.md)

---

## Context

The Exercise Library currently filters by seven coarse body areas (`chest`, `back`, `legs`,
`shoulders`, `arms`, `core`, `full-body`) via a placeholder block-figure inspector. A user who
wants "something for my calves" or "rear delts" cannot express that: calves, quads, hamstrings
and glutes all collapse into `legs`, and biceps, triceps and forearms all collapse into `arms`.

The product promise in PRODUCT.md is answering *"what should I train for muscle X"*. This
enhancement makes muscle X actually selectable, by replacing the placeholder figure with a
detailed front/back anatomy diagram whose regions map one-to-one onto the muscles the
exercise data is tagged with.

**Design input:** an authored diagram, `human_muscle_system_clickable.svg`, supplied by the
product owner. Its clickable `data-muscle` regions are the definition of the selectable set.

**Agreed scope decisions** (product owner, 2026-09-17):
- The diagram's **geometry, regions and labels are reproduced exactly**; its colours and
  typography are mapped onto existing design-system tokens so BLUEPRINT's "styling flows
  through the design system" boundary rule holds. No new styling mechanism is introduced.
- The inspector moves to a **full-width band above the exercise results list** — the diagram
  is two side-by-side body panels and is unreadable in the present narrow sidebar slot.

---

## Story S-0002.01 — Filter exercises by clicking a specific muscle
As a gym-goer I want to click an individual muscle on a front/back anatomy diagram so that I
get exercises for exactly that muscle instead of a whole body area.

**Acceptance criteria:** (tag each: `behavior` | `invariant` | `non-functional` | `e2e`)
> `behavior` = observable outcome through an interface. `e2e` = reachable by a real user through the running system.
- [ ] AC-1 [behavior] — Selecting a muscle region in the inspector narrows the exercise list to
      only exercises whose target muscle is that region, and the displayed result count matches
      the number of exercises shown.
- [ ] AC-2 [invariant] — Every region selectable in the inspector yields at least one exercise:
      no selectable region can produce an empty list. (Covers the muscles that currently have no
      exercises at all — neck, hip flexors, knees, calves — and lower back, which has one.)
- [ ] AC-3 [behavior] — The currently selected muscle is reported back to the user by name in the
      inspector's legend, and a selected region is visually distinguished from unselected ones.
- [ ] AC-4 [invariant] — Generating a weekly routine still returns a plan with at least one
      exercise on every training day, for every goal / experience / cadence / hardware
      combination — the finer-grained muscle tagging must not empty a routine day.
- [ ] AC-5 [e2e] — From the running app a user opens the Exercise Library, clicks a muscle on the
      anatomy diagram, and sees the list narrow to that muscle's exercises with the legend naming it.

**Success metric:** every muscle region in the supplied diagram is selectable and returns a
non-empty exercise list, and no routine-generator output regresses to an empty training day.
