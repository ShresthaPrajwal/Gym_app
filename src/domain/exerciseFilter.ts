import { EXERCISES } from '../data/exercises'

export const MUSCLE_GROUPS = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full-body'] as const
export type MuscleGroup = (typeof MUSCLE_GROUPS)[number]

// bodyweight ⊂ dumbbell ⊂ full — an exercise tagged 'bodyweight' is includable under any
// hardware selection; 'full'-tagged only when Full Facility is selected.
export const HARDWARE_TIERS = ['bodyweight', 'dumbbell', 'full'] as const
export type HardwareTier = (typeof HARDWARE_TIERS)[number]

export type Exercise = {
  name: string
  targetMuscle: MuscleGroup
  videoUrl: string
  hardware: HardwareTier
  instructions: string
  baseSets: number
  baseReps: string
  baseRest: string
}

export function filterByMuscle(muscle: MuscleGroup): Exercise[] {
  return EXERCISES.filter((exercise) => exercise.targetMuscle === muscle)
}
