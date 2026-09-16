import { generateWeeklyPlan } from './routineGenerator'

// B-1 (tracer bullet): generating a weekly plan returns a full 7-day week with exactly
// `cadence` training days and the rest explicit rest days, deterministically.
test('generates a full 7-day week with exactly `cadence` training days, deterministically', () => {
  const plan = generateWeeklyPlan('bulk', 'intermediate', 5, 'full')

  expect(plan.length).toBe(7)

  const trainingDays = plan.filter((d) => !d.isRest)
  const restDays = plan.filter((d) => d.isRest)
  expect(trainingDays.length).toBe(5)
  expect(restDays.length).toBe(2)

  for (const day of trainingDays) {
    if (!day.isRest) {
      expect(day.exercises.length).toBeGreaterThan(0)
    }
  }

  expect(generateWeeklyPlan('bulk', 'intermediate', 5, 'full')).toEqual(plan)
})

// B-2: no exercise in a hardware-constrained plan exceeds the selected hardware tier.
test('respects the bodyweight/home hardware constraint', () => {
  const plan = generateWeeklyPlan('bulk', 'intermediate', 5, 'bodyweight')

  for (const day of plan) {
    if (!day.isRest) {
      for (const exercise of day.exercises) {
        expect(exercise.hardware).toBe('bodyweight')
      }
    }
  }
})
