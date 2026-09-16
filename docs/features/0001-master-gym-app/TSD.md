---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "0f03c2c3e68272d8cf9e4b32165b81c5acf8f0b0fb938756e17f5780b59fa37e"
---
# TSD 0001 — Static Gym App MVP
> Behavior + contracts ONLY. Never name the library/method/pattern (over-spec = defeats spec-first).
> One section per PRD story. Critic anchors to this as the external executable spec.

## TSD S-0001.01 — Shared design system (PRD §S-0001.01)
| Aspect | Spec |
|--------|------|
| Interfaces | A shared set of visual design tokens (color palette, spacing scale, type scale, responsive breakpoints) and a shared library of reusable UI building blocks (e.g. button, card, text input, select, badge, page layout) consumed by all three views. |
| Data / State | None — presentational only. |
| Behavior | Every page's visual styling (color, spacing, typography, layout) derives from the shared tokens; no page defines a competing, page-local visual value, breakpoint, or duplicate of a shared building block. Layout, spacing, and typography adapt fluidly across mobile (~375px), tablet (~768px), and desktop (~1280px+) viewport widths with no horizontal scrolling or overlapping content. |
| Access | N/A — internal implementation constraint, not user-facing behavior. |
| Boundaries | None. |
| Tests | unit: none (presentational/structural — enforced by code review and story S-0001.05's build check, see PRD AC). integration: a rendered instance of each page uses only shared building blocks (no duplicate/one-off equivalents) and renders without layout defects at mobile, tablet, and desktop breakpoints, verified by a smoke-level render check per page. |

## TSD S-0001.02 — Goal-based routine builder (PRD §S-0001.02)
| Aspect | Spec |
|--------|------|
| Interfaces | A routine-generation function: input = a goal identifier (one of: abs, bulk, cut-lean, general-fitness, strength, endurance); output = a weekly routine: a list of workout days, each with a day label and an ordered list of exercises, each exercise carrying name, target muscle, sets, reps, and rest interval. A UI surface lets a user select a goal and view the resulting routine. |
| Data / State | Static, bundled routine/exercise reference data (goal → day → exercise mapping). No persisted or server-side state; selection state is transient/in-memory in the UI only. |
| Behavior | Selecting a goal always yields the same non-empty weekly routine for that goal; the routine's exercises are drawn from muscles/movement types appropriate to the goal (e.g. abs → core-focused exercises; bulk → compound lifts). Re-selecting the same goal again yields an identical routine. Selecting a different goal replaces the displayed routine entirely. |
| Access | Any visitor of the Routine Builder view; no auth. |
| Boundaries | None — pure function over bundled static data, no network/clock/randomness dependency. |
| Tests | unit: routine-generation function for every supported goal returns a non-empty routine whose exercises match that goal's expected muscle/movement focus, and is deterministic across repeated calls with the same goal. integration: selecting a goal in the UI updates the displayed routine to match the function's output. |

## TSD S-0001.03 — Nutrition plan calculator (PRD §S-0001.03)
| Aspect | Spec |
|--------|------|
| Interfaces | A nutrition-calculation function: input = gender, age, height, weight, activity level; output = BMR, TDEE, a calorie target, a protein/carb/fat gram breakdown, and a static list of baseline daily vitamin/mineral guidance values. A UI form collects the inputs and displays the output. |
| Data / State | Static reference table for vitamin/mineral baseline guidance. No persisted state; form inputs and computed plan are transient/in-memory. |
| Behavior | Submitting valid inputs always returns the same BMR/TDEE/macros/vitamin output for those inputs (deterministic, no randomness). Output is computed via a standard, published BMR formula appropriate to the given gender/age/height/weight/activity level, accurate to within normal rounding of hand-calculated reference values. Changing any input and resubmitting recomputes and replaces the displayed plan. |
| Access | Any visitor of the Nutrition Plan view; no auth. |
| Boundaries | None — pure function over user-entered numbers and bundled static reference data, no network/clock/randomness dependency. |
| Tests | unit: calculation function matches hand-calculated BMR/TDEE/macro reference values (at least one male and one female case) within 1%; vitamin/mineral guidance values are present in the output. integration: submitting the form in the UI displays the computed plan matching the function's output, with no network request made. |

## TSD S-0001.04 — Exercise library by target muscle (PRD §S-0001.04)
| Aspect | Spec |
|--------|------|
| Interfaces | An exercise-filtering function: input = a target muscle/body part identifier (chest, back, legs, shoulders, arms, core, full-body); output = the list of exercises targeting that muscle, each with a name, target muscle, and a YouTube video reference (URL). A UI surface lets a user pick a muscle group and view/filter the exercise list, with each entry linking to (or embedding) its video. |
| Data / State | Static, bundled exercise reference data (exercise → target muscle → video URL). No persisted state; the selected filter is transient/in-memory in the UI only. |
| Behavior | Selecting a muscle group always returns the same non-empty list of exercises targeting only that muscle (at least 3 per group). Each returned exercise carries a valid, non-empty YouTube video reference. Changing the selected muscle group replaces the displayed list entirely. |
| Access | Any visitor of the Exercise Library view; no auth. |
| Boundaries | YouTube — the only external reference: each exercise links to (or embeds) a YouTube video by URL. The app does not call any YouTube API; it only stores/uses a static URL per exercise. |
| Tests | unit: filtering function for every muscle group returns only matching exercises, each with a well-formed YouTube URL, and returns at least 3 exercises per group. integration: selecting a muscle group in the UI updates the displayed list to match the function's output, and each entry's video link/embed points at a YouTube URL. |

## TSD S-0001.05 — Static, serverless deployability (PRD §S-0001.05)
| Aspect | Spec |
|--------|------|
| Interfaces | A build step that produces a static output directory (HTML/CSS/JS and static assets) from source; the output is servable by any static file server with no accompanying backend process. |
| Data / State | None beyond the static build output itself. |
| Behavior | Running the build step from a clean checkout (after installing dependencies) succeeds and produces a static output directory. Serving that output directory via any static file server renders and fully operates all three views (routine builder, nutrition plan, exercise library) with zero runtime errors and no network calls other than the initial page load and (optionally) YouTube video embeds. |
| Access | N/A — build/deployment behavior, not end-user-facing. |
| Boundaries | The local filesystem (build output location) and, at runtime, the optional YouTube embed/link (see S-0001.04). No other network/service dependency. |
| Tests | smoke: a clean install + build + static-serve cycle loads each of the three views without a runtime error and without any non-YouTube network call. |
