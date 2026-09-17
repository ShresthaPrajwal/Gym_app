import { EXERCISES } from '../data/exercises'
import type { Exercise, HardwareTier, MuscleGroup } from './exerciseFilter'

export const GOALS = ['abs', 'bulk', 'cut-lean', 'general-fitness', 'strength', 'endurance'] as const
export type Goal = (typeof GOALS)[number]

export const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced'] as const
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]

export const CADENCES = [3, 4, 5, 6] as const
export type Cadence = (typeof CADENCES)[number]

export type Hardware = HardwareTier

export type PlanExercise = Exercise & { sets: number; reps: string; rest: string }

export type WeekDay =
  | { day: string; isRest: true }
  | { day: string; isRest: false; focus: string; exercises: PlanExercise[] }

const HARDWARE_RANK: Record<Hardware, number> = { bodyweight: 0, dumbbell: 1, full: 2 }

type Archetype = { focus: string; muscles: readonly MuscleGroup[] }

// A training day now draws from a UNION of specific regions rather than one coarse area.
// Every day deliberately includes at least one region that has a bodyweight-tier exercise,
// otherwise that day comes back empty for a user on the bodyweight hardware tier.
const PUSH: readonly MuscleGroup[] = ['chest', 'shoulders', 'triceps']
const PULL: readonly MuscleGroup[] = ['lats', 'trapezius', 'biceps', 'forearms']
const LEGS: readonly MuscleGroup[] = ['quadriceps', 'hamstrings', 'glutes', 'calves']
const TRUNK: readonly MuscleGroup[] = ['core', 'obliques', 'lower-back']

const GOAL_ARCHETYPES: Record<Goal, Archetype[]> = {
  abs: [{ focus: 'Core', muscles: TRUNK }],
  bulk: [
    { focus: 'Push', muscles: PUSH },
    { focus: 'Pull', muscles: PULL },
    { focus: 'Legs', muscles: LEGS },
  ],
  'cut-lean': [
    { focus: 'Full Body Conditioning', muscles: ['full-body'] },
    { focus: 'Core', muscles: TRUNK },
    { focus: 'Legs', muscles: LEGS },
  ],
  'general-fitness': [
    { focus: 'Upper Body', muscles: [...PUSH, ...PULL] },
    { focus: 'Lower Body', muscles: LEGS },
    { focus: 'Full Body', muscles: ['full-body', ...TRUNK] },
  ],
  strength: [
    { focus: 'Push', muscles: PUSH },
    { focus: 'Pull', muscles: PULL },
    { focus: 'Legs', muscles: LEGS },
  ],
  endurance: [
    { focus: 'Full Body Conditioning', muscles: ['full-body'] },
    { focus: 'Legs', muscles: LEGS },
    { focus: 'Core', muscles: TRUNK },
  ],
}

const EXERCISE_COUNT: Record<ExperienceLevel, number> = { beginner: 3, intermediate: 4, advanced: 5 }
const SET_ADJUST: Record<ExperienceLevel, number> = { beginner: -1, intermediate: 0, advanced: 1 }

// Even spacing over the 7-day week — training days are never front-loaded, so a
// cadence of 3 still reads as a spread-out week rather than "3 days then 4 rest days".
function trainingDayPositions(cadence: Cadence): number[] {
  const positions = new Set<number>()
  for (let i = 0; i < cadence; i++) {
    let pos = Math.round((i * 7) / cadence)
    while (positions.has(pos)) pos = (pos + 1) % 7
    positions.add(pos)
  }
  return [...positions].sort((a, b) => a - b)
}

function pickExercises(archetype: Archetype, hardware: Hardware, experience: ExperienceLevel): PlanExercise[] {
  const maxRank = HARDWARE_RANK[hardware]
  const pool = EXERCISES.filter(
    (exercise) => archetype.muscles.includes(exercise.targetMuscle) && HARDWARE_RANK[exercise.hardware] <= maxRank,
  )
  const count = Math.min(EXERCISE_COUNT[experience], pool.length)
  return pool.slice(0, count).map((exercise) => ({
    ...exercise,
    sets: Math.max(2, exercise.baseSets + SET_ADJUST[experience]),
    reps: exercise.baseReps,
    rest: exercise.baseRest,
  }))
}

export function generateWeeklyPlan(
  goal: Goal,
  experience: ExperienceLevel,
  cadence: Cadence,
  hardware: Hardware,
): WeekDay[] {
  const archetypes = GOAL_ARCHETYPES[goal]
  const trainingDays = trainingDayPositions(cadence)

  const week: WeekDay[] = []
  let archetypeIndex = 0
  for (let i = 0; i < 7; i++) {
    const day = `Day ${i + 1}`
    if (trainingDays.includes(i)) {
      const archetype = archetypes[archetypeIndex % archetypes.length]
      archetypeIndex++
      week.push({
        day: `${day} — ${archetype.focus}`,
        isRest: false,
        focus: archetype.focus,
        exercises: pickExercises(archetype, hardware, experience),
      })
    } else {
      week.push({ day: `${day} — Rest & Recovery`, isRest: true })
    }
  }
  return week
}
