---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-17"
approved_sha256: "3f6d8e0025458f236447d4694c4d9ab65833c0f820eafbefa640016a685e6143"
---
# TSD 0004 — Design Renovation: Video Cards, Player Modal, Filter UX & Mobile

## TSD S-0004.01 — Large exercise video cards  (PRD §S-0004.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `ExerciseLibrary` renders exercise results; `VideoThumbnail` receives `name`, `videoUrl`, optional `className` |
| Data / State | No new persistent state; `playing` state removed from VideoThumbnail (play now opens modal) |
| Behavior | Card layout: left column = thumbnail (aspect-video, min-w-[260px] on lg, full-width on mobile); right column = name, badges row, cues list, action buttons. Thumbnail is a static image button that fires `onPlay` callback. |
| Access | N/A |
| Boundaries | YouTube thumbnail CDN (img.youtube.com) |
| Tests | N/A — visual/layout change, verified by prototype |

## TSD S-0004.02 — Video player modal  (PRD §S-0004.02)
| Aspect | Spec |
|--------|------|
| Interfaces | New `VideoPlayerModal` component: `{ videoId: string, name: string, videoUrl: string, onClose: () => void }`. Extracts ID from both `?v=` watch URLs and `/shorts/<id>` URLs. |
| Data / State | `playerExercise: Exercise \| null` in `ExerciseLibrary` — set on thumbnail click, cleared on modal close |
| Behavior | Modal: fixed overlay bg-black/80, centred panel max-w-3xl, 16:9 iframe embed with autoplay, Escape key closes, click-outside closes, "Watch on YouTube" link in footer. Shorts URL pattern: `youtube.com/shorts/<id>` → extract id. |
| Access | N/A |
| Boundaries | YouTube embed (youtube.com/embed) |
| Tests | N/A — visual/interaction change, verified by prototype |

## TSD S-0004.03 — Filter pill group overflow fix  (PRD §S-0004.03)
| Aspect | Spec |
|--------|------|
| Interfaces | `RoutineBuilder` PillGroup component; `ExerciseLibrary` filter pill rows |
| Data / State | No state change |
| Behavior | Filter groups use `flex-wrap` with `gap-1`; each pill min-h-[44px] px-3; group container never sets `overflow: hidden` or fixed width. On mobile (<768px) the 3-column grid in RoutineBuilder becomes single column. |
| Access | N/A |
| Boundaries | None |
| Tests | N/A — layout/UX change |

## TSD S-0004.04 — Mobile responsiveness pass  (PRD §S-0004.04)
| Aspect | Spec |
|--------|------|
| Interfaces | `ExerciseLibrary`, `RoutineBuilder`, `PageLayout` |
| Data / State | No state change |
| Behavior | Exercise cards: on mobile stack to thumbnail-top / content-below (flex-col). PageLayout: horizontal padding scales from px-4 on mobile to px-gutter on lg. Nav tabs: min-h-[44px], text truncated not clipped. No element causes overflow-x on 375px. |
| Access | N/A |
| Boundaries | None |
| Tests | N/A — layout/UX change |
