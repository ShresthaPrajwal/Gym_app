## TSD S-0004.02 — Video player modal  (PRD §S-0004.02)
| Aspect | Spec |
|--------|------|
| Interfaces | New `VideoPlayerModal` component: `{ videoId: string, name: string, videoUrl: string, onClose: () => void }`. Extracts ID from both `?v=` watch URLs and `/shorts/<id>` URLs. |
| Data / State | `playerExercise: Exercise \| null` in `ExerciseLibrary` — set on thumbnail click, cleared on modal close |
| Behavior | Modal: fixed overlay bg-black/80, centred panel max-w-3xl, 16:9 iframe embed with autoplay, Escape key closes, click-outside closes, "Watch on YouTube" link in footer. Shorts URL pattern: `youtube.com/shorts/<id>` → extract id. |
| Access | N/A |
| Boundaries | YouTube embed (youtube.com/embed) |
| Tests | N/A — visual/interaction change, verified by prototype |
