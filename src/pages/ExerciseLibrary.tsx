import { useState } from 'react'
import { Badge, Button, Card, ChipGroup, Input, PageLayout, VideoThumbnail } from '../components'
import {
  DIFFICULTIES,
  EQUIPMENT_TYPES,
  MECHANICS,
  MUSCLE_GROUPS,
  filterExercises,
  type Difficulty,
  type Exercise,
  type EquipmentType,
  type Mechanics,
  type MuscleGroup,
} from '../domain/exerciseFilter'
import { AnatomyInspector } from './AnatomyInspector'
import { ExerciseTechniqueModal } from './ExerciseTechniqueModal'
import { VideoPlayerModal } from './VideoPlayerModal'

const ANATOMY_LABELS: Record<MuscleGroup, string> = {
  neck: 'Neck',
  trapezius: 'Trapezius',
  shoulders: 'Shoulders',
  chest: 'Chest',
  lats: 'Lats',
  'lower-back': 'Lower Back',
  biceps: 'Biceps',
  triceps: 'Triceps',
  forearms: 'Forearms',
  core: 'Core',
  obliques: 'Obliques',
  'hip-flexors': 'Hip Flexors',
  glutes: 'Glutes',
  quadriceps: 'Quadriceps',
  hamstrings: 'Hamstrings',
  knees: 'Knees',
  calves: 'Calves',
  'full-body': 'Full Body',
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const EQUIPMENT_LABELS: Record<EquipmentType, string> = {
  barbell: 'Barbell',
  dumbbell: 'Dumbbell',
  cable: 'Cable',
  bodyweight: 'Bodyweight',
  machine: 'Machine',
}

const MECHANICS_LABELS: Record<Mechanics, string> = {
  compound: 'Compound',
  isolation: 'Isolation',
}

const DEFAULT_FILTERS = {
  search: '',
  muscle: 'all' as MuscleGroup | 'all',
  difficulty: 'all' as Difficulty | 'all',
  equipment: 'all' as EquipmentType | 'all',
  mechanics: 'any' as Mechanics | 'any',
}

export function ExerciseLibrary() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [modalExercise, setModalExercise] = useState<Exercise | null>(null)
  const [playerExercise, setPlayerExercise] = useState<Exercise | null>(null)
  const [added, setAdded] = useState<Set<string>>(new Set())

  const results = filterExercises(filters)

  function update<K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) {
    setFilters((f) => ({ ...f, [key]: value }))
  }

  function reset() {
    setFilters(DEFAULT_FILTERS)
  }

  function toggleAdded(name: string) {
    setAdded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <PageLayout>
      <div className="flex flex-col gap-xs">
        <h1 className="font-display text-headline-lg text-white md:text-headline-xl">Exercise Library</h1>
        <p className="max-w-2xl text-body-md text-on-surface-variant">
          Movement guides, execution cues, and demo videos for every exercise in the library.
        </p>
      </div>

      <Card className="flex flex-col gap-md">
        <Input
          aria-label="Search exercises"
          placeholder="Search by name, muscle, or equipment…"
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
        />

        <ChipGroup
          label="Muscle group"
          name="Anatomy Group"
          options={[{ value: 'all' as const, label: 'All' }, ...MUSCLE_GROUPS.map((m) => ({ value: m, label: ANATOMY_LABELS[m] }))]}
          value={filters.muscle}
          onChange={(v) => update('muscle', v)}
        />

        <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
          <ChipGroup
            label="Difficulty"
            options={[{ value: 'all' as const, label: 'All' }, ...DIFFICULTIES.map((d) => ({ value: d, label: DIFFICULTY_LABELS[d] }))]}
            value={filters.difficulty}
            onChange={(v) => update('difficulty', v)}
          />
          <ChipGroup
            label="Equipment"
            options={[{ value: 'all' as const, label: 'All' }, ...EQUIPMENT_TYPES.map((e) => ({ value: e, label: EQUIPMENT_LABELS[e] }))]}
            value={filters.equipment}
            onChange={(v) => update('equipment', v)}
          />
          <ChipGroup
            label="Mechanics"
            options={[{ value: 'any' as const, label: 'Any' }, ...MECHANICS.map((m) => ({ value: m, label: MECHANICS_LABELS[m] }))]}
            value={filters.mechanics}
            onChange={(v) => update('mechanics', v)}
          />
        </div>

        <Button variant="secondary" onClick={reset} className="self-start">
          Reset filters
        </Button>
      </Card>

      {/* The anatomy diagram is a two-panel landscape figure: it gets a full-width band above the
          results rather than the narrow sidebar it used to share with them. */}
      <AnatomyInspector selected={filters.muscle} onSelect={(m) => update('muscle', m)} />

      <div className="grid grid-cols-1 items-start gap-md">
        <div className="flex flex-col gap-sm">
          <p role="status" className="text-body-sm text-on-surface-variant">
            Showing <strong className="font-semibold text-white">{results.length}</strong>{' '}
            {results.length === 1 ? 'exercise' : 'exercises'}:{' '}
            {filters.muscle === 'all' ? 'all muscle groups' : ANATOMY_LABELS[filters.muscle]}
          </p>
          {results.length === 0 ? (
            <Card className="flex flex-col items-center gap-sm py-xl text-center">
              <span className="text-2xl">🔍</span>
              <h2 className="font-display text-headline-sm text-white">No Matching Exercises</h2>
              <p className="text-body-sm text-on-surface-variant">
                No exercise matches the current search and filters. Try loosening a filter or resetting the matrix.
              </p>
              <Button variant="secondary" onClick={reset}>
                Clear all filters
              </Button>
            </Card>
          ) : (
            results.map((exercise) => (
              <Card key={exercise.name} className="flex flex-col gap-0 overflow-hidden p-0 md:flex-row">
                {/* Thumbnail — full width on mobile, fixed sidebar on desktop */}
                <div className="aspect-video w-full shrink-0 md:aspect-auto md:h-auto md:w-[280px]">
                  <VideoThumbnail
                    name={exercise.name}
                    videoUrl={exercise.videoUrl}
                    onPlay={() => setPlayerExercise(exercise)}
                    className="h-full w-full rounded-none"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-sm p-md">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-xs">
                    <Badge>{exercise.targetMuscle}</Badge>
                    <Badge>{DIFFICULTY_LABELS[exercise.difficulty]}</Badge>
                    <Badge>{EQUIPMENT_LABELS[exercise.equipment]}</Badge>
                    <Badge>{MECHANICS_LABELS[exercise.mechanics]}</Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-headline-sm text-white">{exercise.name}</h3>

                  {/* Cues */}
                  <div>
                    <p className="text-body-sm font-semibold text-on-surface-variant">Cues</p>
                    <ol className="mt-1 space-y-1 pl-md text-body-sm text-on-surface-variant" style={{ listStyleType: 'decimal' }}>
                      {exercise.cues.map((cue) => (
                        <li key={cue}>{cue}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-sm pt-sm">
                    <Button variant="secondary" onClick={() => setPlayerExercise(exercise)}>
                      Watch demo
                    </Button>
                    <Button variant={added.has(exercise.name) ? 'primary' : 'ghost'} onClick={() => toggleAdded(exercise.name)}>
                      {added.has(exercise.name) ? 'Added ✓' : '+ Add to Routine'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {modalExercise && <ExerciseTechniqueModal exercise={modalExercise} onClose={() => setModalExercise(null)} />}
      {playerExercise && (
        <VideoPlayerModal
          name={playerExercise.name}
          videoUrl={playerExercise.videoUrl}
          onClose={() => setPlayerExercise(null)}
        />
      )}
    </PageLayout>
  )
}
