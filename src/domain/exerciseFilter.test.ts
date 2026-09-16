import { filterExercises } from './exerciseFilter'

const YOUTUBE_URL_RE = /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/

// B-1 (tracer bullet): AC-1 + AC-3: filtering returns only exercises matching every
// active filter, each with a well-formed video reference and non-empty cues.
test('search + anatomy group narrows to matching exercises only', () => {
  const results = filterExercises({ search: 'press', muscle: 'chest' })

  expect(results.length).toBeGreaterThan(0)
  for (const exercise of results) {
    expect(exercise.targetMuscle).toBe('chest')
    expect(exercise.name.toLowerCase()).toContain('press')
    expect(exercise.videoUrl).toMatch(YOUTUBE_URL_RE)
    expect(exercise.cues.length).toBeGreaterThan(0)
  }
})

test('anatomy group + difficulty narrows to matching exercises only', () => {
  const results = filterExercises({ muscle: 'core', difficulty: 'beginner' })

  expect(results.length).toBeGreaterThan(0)
  for (const exercise of results) {
    expect(exercise.targetMuscle).toBe('core')
    expect(exercise.difficulty).toBe('beginner')
  }
})

test('equipment + mechanics narrows to matching exercises only', () => {
  const results = filterExercises({ equipment: 'bodyweight', mechanics: 'isolation' })

  expect(results.length).toBeGreaterThan(0)
  for (const exercise of results) {
    expect(exercise.equipment).toBe('bodyweight')
    expect(exercise.mechanics).toBe('isolation')
  }
})

// B-2: AC-2: a filter combination with no matching exercises returns an empty list.
test('a filter combination with no matches returns an empty list', () => {
  const results = filterExercises({ muscle: 'core', equipment: 'barbell' })
  expect(results).toEqual([])
})

test('no filters returns the full exercise set', () => {
  const all = filterExercises({})
  const withAll = filterExercises({ muscle: 'all', difficulty: 'all', equipment: 'all', mechanics: 'any' })
  expect(withAll).toEqual(all)
  expect(all.length).toBeGreaterThan(0)
})
