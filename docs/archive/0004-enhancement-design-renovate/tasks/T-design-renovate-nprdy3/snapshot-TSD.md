## TSD S-0004.01 — Large exercise video cards  (PRD §S-0004.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `ExerciseLibrary` renders exercise results; `VideoThumbnail` receives `name`, `videoUrl`, optional `className` |
| Data / State | No new persistent state; `playing` state removed from VideoThumbnail (play now opens modal) |
| Behavior | Card layout: left column = thumbnail (aspect-video, min-w-[260px] on lg, full-width on mobile); right column = name, badges row, cues list, action buttons. Thumbnail is a static image button that fires `onPlay` callback. |
| Access | N/A |
| Boundaries | YouTube thumbnail CDN (img.youtube.com) |
| Tests | N/A — visual/layout change, verified by prototype |
