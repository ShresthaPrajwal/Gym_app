import { ROUTINES } from '../data/routines'

export const GOALS = ['abs', 'bulk', 'cut-lean', 'general-fitness', 'strength', 'endurance'] as const
export type Goal = (typeof GOALS)[number]

export type Exercise = {
  name: string
  targetMuscle: string
  sets: number
  reps: string
  rest: string
}

export type RoutineDay = {
  day: string
  exercises: Exercise[]
}

export function generateRoutine(goal: Goal): RoutineDay[] {
  return ROUTINES[goal]
}
