---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "7b23a0c6765ce8f03842cdda3ffcb9fa64f9aeb33f7a1cddea921f061530df0a"
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
| Interfaces | A routine-generation function: input = a primary target identifier (one of: abs, bulk, cut-lean, general-fitness, strength, endurance), an adaptation-threshold level (beginner, intermediate, advanced), a weekly training cadence (3, 4, 5, or 6 days), and an available-hardware constraint (full facility, dumbbell-only, bodyweight/home); output = a full 7-day weekly plan: exactly `cadence` of the 7 days are training days (each with a day label, a focus description, and an ordered list of exercises), and the remaining days are explicitly labeled recovery/rest days — the week is never rendered as partial or missing days. Each training-day exercise carries name, target muscle, sets, reps, rest interval, a short instructional cue for performing it, and a reference to a demonstration video. A UI surface lets a user choose adaptation threshold, cadence, and hardware, then choose a primary target, then browse the resulting 7-day plan day by day; each day's exercise list shows, per exercise, its instructions and a video thumbnail that plays in place. |
| Data / State | Static, bundled reference data (exercise pools per target/muscle, tagged with hardware requirement, instructions, and video reference; day-archetype rotations per target; rest-day placement). No persisted or server-side state; all four selections and the displayed plan are transient/in-memory in the UI only. |
| Behavior | For any given combination of the four inputs, the same deterministic 7-day plan is produced every time (no randomness, no partial/incomplete-looking days). Exactly `cadence` days are training days, matched to the primary target's appropriate muscle/movement focus; exercises requiring hardware outside the selected constraint are never included (e.g. bodyweight/home excludes barbell and machine-only exercises); the number/intensity of exercises reflects the selected adaptation threshold. Changing any one of the four inputs recomputes and replaces the entire displayed plan. Selecting a day shows that day's exercises; each exercise's video is playable without leaving the page. |
| Access | Any visitor of the Routine Builder view; no auth. |
| Boundaries | YouTube — each exercise references a demonstration video by URL/ID, playable in-page (inline embed or thumbnail-triggered player); the app does not call any YouTube API beyond that, only stores/uses a static reference per exercise. Otherwise none — pure function over bundled static data, no network dependency for the plan itself, no clock/randomness dependency. |
| Tests | unit: for a representative sample of (target, threshold, cadence, hardware) combinations, the generator returns exactly `cadence` training days out of 7 with the remainder explicitly marked as rest days, every training-day exercise has non-empty instructions and a well-formed video reference, no returned exercise violates the given hardware constraint, and output is deterministic across repeated calls with the same inputs. integration: changing any of the four selections in the UI updates the displayed 7-day plan to match the function's output; selecting a day shows its exercises with instructions and a playable video thumbnail per exercise. |

## TSD S-0001.03 — Nutrition & macro calculator (PRD §S-0001.03)
| Aspect | Spec |
|--------|------|
| Interfaces | A nutrition-calculation function: input = biological sex, age, height, weight, measurement unit (metric/imperial), activity level, a fitness goal (cut, maintain, bulk), and a macro preset (High Carb, Moderate, Low Carb, Keto); output = BMR, TDEE, a target daily calorie value (annotated as deficit/maintenance/surplus per the chosen goal), a protein/carbohydrate/fat breakdown (grams, calories, percentage of target, and grams per kg bodyweight for each), and a static micronutrient/supplement reference list (name, recommended athletic intake, purpose — covering Vitamin D3, Calcium, Magnesium Glycinate, Iron, Zinc, Omega-3, and Creatine Monohydrate). A UI form collects the inputs/goal/preset and displays the results; a save action and an export action are also exposed (see Data/State and Boundaries). |
| Data / State | Static reference tables: the micronutrient/supplement list, and the macro-preset percentage splits. Form inputs, selected goal/preset, and the computed plan are otherwise transient/in-memory — EXCEPT the explicit "Save Plan" action, which persists the current calculator state to browser local storage so it can be restored on a later visit; nothing is sent to a server. |
| Behavior | Submitting valid inputs always returns the same BMR/TDEE/macro/micronutrient output for those inputs, goal, and preset (deterministic, no randomness). BMR/TDEE use a standard, published formula, accurate to within normal rounding of hand-calculated reference values. Target calories reflect the selected goal's adjustment (cut = deficit, maintain = maintenance, bulk = surplus) applied to TDEE. Changing any input, the goal, or the macro preset recomputes and replaces the displayed results immediately (no explicit resubmit required). "Save Plan" stores the current state locally; a later "Export JSON" produces a JSON file containing the entered biometrics, the calorie calculations, the macro breakdown, and the micronutrient reference list. |
| Access | Any visitor of the Nutrition Plan view; no auth. |
| Boundaries | Browser local storage (Save Plan) and a client-side file download (Export JSON) — both local to the browser, no network call and no external service. Otherwise none — pure function over user-entered numbers and bundled static reference data, no clock/randomness dependency. |
| Tests | unit: calculation function matches hand-calculated BMR/TDEE/macro reference values (at least one male and one female case, at least one non-default goal and one non-default macro preset) within 1%; each macro preset yields grams/calories/percentages/g-per-kg that are internally consistent (grams × calories-per-gram sum to the target calories, within rounding); the micronutrient/supplement list contains all 7 named items. integration: submitting the form in the UI displays computed results matching the function's output, with no network request made; changing the goal or macro preset updates the displayed results; Export JSON produces a file/blob containing the expected fields. |

## TSD S-0001.04 — Exercise library by target muscle (PRD §S-0001.04)
| Aspect | Spec |
|--------|------|
| Interfaces | An exercise-filtering function: input = a target muscle/body part identifier (chest, back, legs, shoulders, arms, core, full-body); output = the list of exercises targeting that muscle, each with a name, target muscle, and a YouTube video reference (URL). A UI surface lets a user pick a muscle group and view/filter the exercise list, with each entry linking to (or embedding) its video. |
| Data / State | Static, bundled exercise reference data (exercise → target muscle → video URL); this is the same underlying exercise/video reference data S-0001.02's routine plan draws its per-exercise video from — one reference table, not two. No persisted state; the selected filter is transient/in-memory in the UI only. |
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
