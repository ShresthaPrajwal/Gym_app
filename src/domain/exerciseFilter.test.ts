import { filterByMuscle, MUSCLE_GROUPS } from './exerciseFilter'

const YOUTUBE_URL_RE = /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/

// B-1 (tracer bullet): given a target muscle/body part, filtering returns only
// exercises targeting that muscle, at least 3 per group, each with a well-formed
// YouTube URL.
test.each(MUSCLE_GROUPS)('filters at least 3 well-formed exercises for "%s"', (muscle) => {
  const exercises = filterByMuscle(muscle)

  expect(exercises.length).toBeGreaterThanOrEqual(3)
  for (const exercise of exercises) {
    expect(exercise.targetMuscle).toBe(muscle)
    expect(exercise.videoUrl).toMatch(YOUTUBE_URL_RE)
  }
})
