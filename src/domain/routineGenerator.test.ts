import { CADENCES, EXPERIENCE_LEVELS, GOALS, generateWeeklyPlan } from './routineGenerator'
import { HARDWARE_TIERS } from './exerciseFilter'

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

// ── 0002 S-0002.01 ────────────────────────────────────────────────────────────
// AC-3 [invariant], recorded as an OFF-LEDGER REGRESSION GUARD (see exec-plan AMENDMENT 1):
// this assertion already passes at the task base, so it guards existing behavior rather than
// specifying new behavior. It exists because splitting the coarse body areas into per-muscle
// regions silently orphans this generator: its goal archetypes name muscles, and any archetype
// naming only regions with no exercise at the selected hardware tier produces a training day
// with zero exercises — invisible until a user opens that particular goal.
test('every training day has at least one exercise, for every goal/experience/cadence/hardware', () => {
  const empty: string[] = []

  for (const goal of GOALS) {
    for (const experience of EXPERIENCE_LEVELS) {
      for (const cadence of CADENCES) {
        for (const hardware of HARDWARE_TIERS) {
          for (const day of generateWeeklyPlan(goal, experience, cadence, hardware)) {
            if (!day.isRest && day.exercises.length === 0) {
              empty.push(`${goal}/${experience}/${cadence}/${hardware} — ${day.day}`)
            }
          }
        }
      }
    }
  }

  expect(empty).toEqual([])
})
