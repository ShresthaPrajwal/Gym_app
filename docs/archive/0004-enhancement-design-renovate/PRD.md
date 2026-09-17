---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
approved_sha256: "4a5956b0da78beb62af26ec355304e40bff074cd5e1e4b87b074485f896d34d9"
---
# Mini PRD 0004 — Design Renovation: Video Cards, Video Player, Filter UX & Mobile

**Source:** real-usage feedback — video cards too small to scan, video plays in-place (tiny), filter pill groups overflow on narrow viewports, mobile layout not optimised.

---

## Story S-0004.01 — Large exercise video cards
As an athlete I want each exercise card to be large and cinematic so that I can read the cues and see the thumbnail without squinting.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Each exercise card shows a wide 16:9 (or 9:16 for Shorts) thumbnail that fills the left column; name, badges, and cues occupy the right column
- [ ] AC-2 [behavior] — Card layout matches the reference image: thumbnail left, metadata+cues right, action buttons at the bottom of the card
- [ ] AC-3 [e2e] — On a 1280px viewport, at least 2 exercise cards are visible without scrolling and each thumbnail is at minimum 260px wide

**Success metric:** thumbnail area is ≥4× larger than the current 128×80px inline size

---

## Story S-0004.02 — Video player modal
As an athlete I want clicking the thumbnail to open a centred player modal so that I can watch the demo without leaving the page, go fullscreen, or jump to YouTube.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Clicking the play button opens a modal overlay with a 16:9 YouTube embed; modal is max-w-3xl, vertically centred, closable by clicking outside or pressing Escape
- [ ] AC-2 [behavior] — Modal includes a "Watch on YouTube" link that opens the video in a new tab
- [ ] AC-3 [behavior] — YouTube Shorts URLs (youtube.com/shorts/<id>) are handled: extracted ID embeds correctly
- [ ] AC-4 [e2e] — Modal closes on Escape key; focus returns to the trigger element

**Success metric:** video opens in a readable modal in under one click

---

## Story S-0004.03 — Filter pill group overflow fix
As an athlete I want the Adaptation Threshold / Microcycle Cadence / Hardware selector rows to never overflow or wrap badly so that all options are always reachable without horizontal scrolling.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — On viewports ≥375px all filter options are fully visible (no clipping, no overflow scroll)
- [ ] AC-2 [behavior] — On mobile (375px) each filter group stacks vertically; pills wrap naturally and remain tappable (min 44px tap target)
- [ ] AC-3 [e2e] — Selecting any option on a 375px viewport works without zooming

**Success metric:** no overflow-x or clipped content visible on 375px–1280px

---

## Story S-0004.04 — Mobile responsiveness pass
As an athlete on a phone I want the exercise library and routine builder to be comfortable to use so that I don't need a desktop to browse or build routines.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Exercise library cards stack to a single column on mobile; thumbnail stays proportional
- [ ] AC-2 [behavior] — Navigation tabs are thumb-friendly (min 44px height) on mobile
- [ ] AC-3 [e2e] — On a 375px viewport, the full library is usable with no horizontal scroll

**Success metric:** no horizontal scroll, all tap targets ≥44px on 375px viewport
