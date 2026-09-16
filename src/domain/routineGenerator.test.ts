import { generateRoutine, GOALS } from './routineGenerator'

// B-1 (tracer bullet): given a goal, generating a routine returns a non-empty
// weekly routine whose exercises match that goal's expected focus.
const EXPECTED_MUSCLES: Record<(typeof GOALS)[number], string[]> = {
  abs: ['core'],
  bulk: ['chest', 'back', 'legs', 'shoulders', 'arms'],
  'cut-lean': ['full-body', 'core', 'legs'],
  'general-fitness': ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full-body'],
  strength: ['chest', 'back', 'legs', 'shoulders'],
  endurance: ['full-body', 'legs', 'core'],
}

test.each(GOALS)('generates a non-empty, goal-appropriate routine for "%s"', (goal) => {
  const routine = generateRoutine(goal)

  expect(routine.length).toBeGreaterThan(0)
  for (const day of routine) {
    expect(day.exercises.length).toBeGreaterThan(0)
    for (const exercise of day.exercises) {
      expect(EXPECTED_MUSCLES[goal]).toContain(exercise.targetMuscle)
    }
  }
})

// B-2: generating a routine twice for the same goal returns an identical routine.
test.each(GOALS)('is deterministic for "%s"', (goal) => {
  expect(generateRoutine(goal)).toEqual(generateRoutine(goal))
})
