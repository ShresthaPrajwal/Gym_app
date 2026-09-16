---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "7589784ce84247a777728d58a67866a066a8d3e44d9f6a339b94dda40497a8b1"
---
# PRD 0001 — Static Gym App MVP
> User stories + acceptance criteria + success metrics. Signed off by PM + SA + DS.
> Feature-scoped (LANE §8): one PRD per feature/milestone, under docs/features/0001-master-gym-app/.

**Source:** Briefing 0001 — Static Gym App MVP
**Parent:** (none — this is the master/umbrella PRD)

---

## Story S-0001.01 — Shared Tailwind design system
As a developer I want one Tailwind-based design system (tokens + reusable components) so that all three pages look and behave consistently.

**Acceptance criteria:**
- [ ] AC-1 [invariant] — Design tokens (color palette, spacing, type scale) are defined once in Tailwind config and are the only source of visual styling values (no ad-hoc hex codes/pixel values in components).
- [ ] AC-2 [behavior] — A shared component library (e.g. Button, Card, Input, Select, Badge, PageLayout) is reused across all three pages; no page defines its own one-off styled equivalents.
- [ ] AC-3 [non-functional] — The app is responsive: layout, spacing, and typography adapt fluidly across viewport widths (mobile ~375px, tablet ~768px, desktop ~1280px+) with no horizontal scrolling or overlapping content, using the design system's responsive breakpoints rather than page-specific media queries.

**Success metric:** all three pages import components exclusively from the shared component library; zero page-local component/style duplication; every page passes a visual check at mobile, tablet, and desktop breakpoints with no layout defects.

---

## Story S-0001.02 — Goal-based routine builder
As a gym user I want to pick a fitness goal so that I get a workout routine matched to that goal.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Selecting a goal (abs, bulk, cut/lean, general fitness, strength, endurance) produces a weekly routine of workout days, each listing exercises with sets/reps/rest.
- [ ] AC-2 [behavior] — Changing the selected goal regenerates the routine deterministically (same goal + inputs always yield the same routine).
- [ ] AC-3 [invariant] — Routine generation is pure client-side logic over static data; no network/API call is made.
- [ ] AC-4 [e2e] — A user opens the Routine Builder page, selects a goal from the UI, and sees the generated routine rendered on screen.

**Success metric:** every supported goal produces a non-empty, goal-appropriate routine (e.g. "abs" routine includes core-focused exercises; "bulk" includes compound lifts) verified by unit tests over the generator function.

---

## Story S-0001.03 — Nutrition plan calculator
As a gym user I want to enter my gender, age, height, and weight so that I get a personalized nutrition plan (calories, macros, key vitamins).

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Submitting gender, age, height, weight, and activity level returns BMR, TDEE, calorie target, and a protein/carb/fat gram breakdown.
- [ ] AC-2 [behavior] — The plan also lists baseline daily vitamin/mineral guidance (e.g. vitamin D, calcium, iron) as static reference values.
- [ ] AC-3 [non-functional] — Calculations use the Mifflin-St Jeor formula and are accurate to within rounding of hand-calculated reference values (verified by unit tests).
- [ ] AC-4 [e2e] — A user opens the Nutrition page, fills in the form, submits, and sees the computed plan rendered without any network request.

**Success metric:** nutrition calculator unit tests cover at least one male and one female reference case matching hand-calculated BMR/TDEE within 1%.

---

## Story S-0001.04 — Exercise library by target muscle
As a gym user I want to browse exercises by target muscle/body part so that I can find exercises for the area I want to train, with a demo video.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — Selecting a muscle/body part (e.g. chest, back, legs, shoulders, arms, core, full body) filters the exercise list to only exercises targeting that muscle.
- [ ] AC-2 [behavior] — Each exercise entry links to (or embeds) a related YouTube demo video.
- [ ] AC-3 [invariant] — Exercise data is static (bundled JSON/TS data), no external API call is required to list or filter exercises.
- [ ] AC-4 [e2e] — A user opens the Exercise Library page, picks a muscle group, and sees the filtered list with working video links.

**Success metric:** every muscle group filter returns at least 3 exercises, each with a valid YouTube URL.

---

## Story S-0001.05 — Static, serverless deployability
As an operator I want the app to build to static files so that I can deploy it to any static host with no backend.

**Acceptance criteria:**
- [ ] AC-1 [invariant] — `npm run build` produces a static output directory (HTML/CSS/JS) with no server process required to serve it.
- [ ] AC-2 [e2e] — Serving the build output via any static file server (e.g. `npx serve dist`) renders and fully operates all three pages (routine, nutrition, exercise library).

**Success metric:** a fresh `npm ci && npm run build` followed by serving `dist/` works with zero runtime errors and zero network calls other than loading the page and (optionally) embedded YouTube iframes.
