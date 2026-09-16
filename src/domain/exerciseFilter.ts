import { EXERCISES } from '../data/exercises'

export const MUSCLE_GROUPS = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full-body'] as const
export type MuscleGroup = (typeof MUSCLE_GROUPS)[number]

export type Exercise = {
  name: string
  targetMuscle: MuscleGroup
  videoUrl: string
}

export function filterByMuscle(muscle: MuscleGroup): Exercise[] {
  return EXERCISES.filter((exercise) => exercise.targetMuscle === muscle)
}
