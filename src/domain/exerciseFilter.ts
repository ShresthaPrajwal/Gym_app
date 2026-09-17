import { EXERCISES } from '../data/exercises'

// One entry per clickable region of the Bio-Anatomy Inspector diagram, ordered head-to-toe,
// plus 'full-body' for conditioning work that no single region owns. The diagram also draws
// a head and feet, but as silhouette rather than muscle — those are inert, so they have no
// entry here and no exercises are tagged to them.
export const MUSCLE_GROUPS = [
  'neck',
  'trapezius',
  'shoulders',
  'chest',
  'lats',
  'lower-back',
  'biceps',
  'triceps',
  'forearms',
  'core',
  'obliques',
  'hip-flexors',
  'glutes',
  'quadriceps',
  'hamstrings',
  'knees',
  'calves',
  'full-body',
] as const
export type MuscleGroup = (typeof MUSCLE_GROUPS)[number]

// bodyweight ⊂ dumbbell ⊂ full — an exercise tagged 'bodyweight' is includable under any
// hardware selection; 'full'-tagged only when Full Facility is selected. (Routine Builder's
// coarse hardware-availability tier — distinct from the granular `equipment` field below.)
export const HARDWARE_TIERS = ['bodyweight', 'dumbbell', 'full'] as const
export type HardwareTier = (typeof HARDWARE_TIERS)[number]

export const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const
export type Difficulty = (typeof DIFFICULTIES)[number]

export const EQUIPMENT_TYPES = ['barbell', 'dumbbell', 'cable', 'bodyweight'] as const
export type EquipmentType = (typeof EQUIPMENT_TYPES)[number]

export const MECHANICS = ['compound', 'isolation'] as const
export type Mechanics = (typeof MECHANICS)[number]

export type Exercise = {
  name: string
  targetMuscle: MuscleGroup
  videoUrl: string
  hardware: HardwareTier
  instructions: string
  baseSets: number
  baseReps: string
  baseRest: string
  difficulty: Difficulty
  equipment: EquipmentType
  mechanics: Mechanics
  cues: string[]
}

export type ExerciseFilters = {
  search?: string
  muscle?: MuscleGroup | 'all'
  difficulty?: Difficulty | 'all'
  equipment?: EquipmentType | 'all'
  mechanics?: Mechanics | 'any'
}

export function filterExercises(filters: ExerciseFilters): Exercise[] {
  const search = filters.search?.trim().toLowerCase()

  return EXERCISES.filter((exercise) => {
    if (filters.muscle && filters.muscle !== 'all' && exercise.targetMuscle !== filters.muscle) return false
    if (filters.difficulty && filters.difficulty !== 'all' && exercise.difficulty !== filters.difficulty) return false
    if (filters.equipment && filters.equipment !== 'all' && exercise.equipment !== filters.equipment) return false
    if (filters.mechanics && filters.mechanics !== 'any' && exercise.mechanics !== filters.mechanics) return false
    if (search) {
      const haystack = `${exercise.name} ${exercise.targetMuscle} ${exercise.equipment}`.toLowerCase()
      if (!haystack.includes(search)) return false
    }
    return true
  })
}

// Real, constructed YouTube search (not a curated video) — the technique modal's
// "Watch on YouTube" action doesn't need a per-exercise curated video reference.
export function buildTechniqueSearchUrl(exerciseName: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${exerciseName} technique tutorial`)}`
}
