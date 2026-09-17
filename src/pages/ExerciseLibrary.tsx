import { useState, type ReactNode } from 'react'
import { Badge, Button, Card, Input, PageLayout, VideoThumbnail } from '../components'
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
      <div className="flex flex-col justify-between gap-md lg:flex-row lg:items-end">
        <div className="flex flex-col gap-xs">
          <span className="w-fit rounded bg-surface-container-high px-sm py-0.5 font-display text-label-caps uppercase tracking-wider text-primary-container">
            Static Biomechanic Kinematics
          </span>
          <h1 className="font-display text-headline-xl text-white">Exercise &amp; Anatomy Library</h1>
          <p className="max-w-2xl text-body-md text-on-surface-variant">
            Movement information, execution guidance, and safety cues for every exercise in the library.
          </p>
        </div>
        <div className="flex gap-md">
          <div className="rounded bg-surface-container-low p-sm">
            <div className="font-display text-label-caps uppercase text-on-surface-variant">Active Sector</div>
            <div className="font-display text-base font-bold text-white">
              {filters.muscle === 'all' ? 'All' : ANATOMY_LABELS[filters.muscle]}
            </div>
          </div>
          <div className="rounded bg-surface-container-low p-sm">
            <div className="font-display text-label-caps uppercase text-on-surface-variant">Indexed Drills</div>
            <div className="font-display text-base font-bold text-primary-container">{results.length}</div>
          </div>
        </div>
      </div>

      <Card className="flex flex-col gap-sm">
        <Input
          aria-label="Search exercises"
          placeholder="Search by name, muscle, or equipment…"
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
        />

        <div role="group" aria-label="Anatomy Group" className="flex flex-wrap gap-1 rounded bg-surface-container-lowest p-1">
          <PillButton active={filters.muscle === 'all'} onClick={() => update('muscle', 'all')}>
            All
          </PillButton>
          {MUSCLE_GROUPS.map((m) => (
            <PillButton key={m} active={filters.muscle === m} onClick={() => update('muscle', m)}>
              {ANATOMY_LABELS[m]}
            </PillButton>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-sm sm:grid-cols-3">
          <div role="group" aria-label="Difficulty" className="flex flex-wrap gap-1 rounded bg-surface-container-lowest p-1">
            <PillButton active={filters.difficulty === 'all'} onClick={() => update('difficulty', 'all')}>
              All
            </PillButton>
            {DIFFICULTIES.map((d) => (
              <PillButton key={d} active={filters.difficulty === d} onClick={() => update('difficulty', d)}>
                {DIFFICULTY_LABELS[d]}
              </PillButton>
            ))}
          </div>
          <div role="group" aria-label="Equipment" className="flex flex-wrap gap-1 rounded bg-surface-container-lowest p-1">
            <PillButton active={filters.equipment === 'all'} onClick={() => update('equipment', 'all')}>
              All
            </PillButton>
            {EQUIPMENT_TYPES.map((e) => (
              <PillButton key={e} active={filters.equipment === e} onClick={() => update('equipment', e)}>
                {EQUIPMENT_LABELS[e]}
              </PillButton>
            ))}
          </div>
          <div role="group" aria-label="Mechanics" className="flex flex-wrap gap-1 rounded bg-surface-container-lowest p-1">
            <PillButton active={filters.mechanics === 'any'} onClick={() => update('mechanics', 'any')}>
              Any
            </PillButton>
            {MECHANICS.map((m) => (
              <PillButton key={m} active={filters.mechanics === m} onClick={() => update('mechanics', m)}>
                {MECHANICS_LABELS[m]}
              </PillButton>
            ))}
          </div>
        </div>

        <Button variant="secondary" onClick={reset} className="self-start">
          Reset Matrix
        </Button>
      </Card>

      {/* The anatomy diagram is a two-panel landscape figure: it gets a full-width band above the
          results rather than the narrow sidebar it used to share with them. */}
      <AnatomyInspector selected={filters.muscle} onSelect={(m) => update('muscle', m)} />

      <div className="grid grid-cols-1 items-start gap-md">
        <div className="flex flex-col gap-sm">
          {results.length === 0 ? (
            <Card className="flex flex-col items-center gap-sm py-xl text-center">
              <span className="text-2xl">🔍</span>
              <h2 className="font-display text-headline-sm text-white">No Matching Exercises</h2>
              <p className="text-body-sm text-on-surface-variant">
                No exercise matches the current search and filters. Try loosening a filter or resetting the matrix.
              </p>
              <Button variant="secondary" onClick={reset}>
                Reset Filter Matrix
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
                    <span className="font-display text-label-caps uppercase text-on-surface-variant">
                      Cues &amp; Kinematic Path
                    </span>
                    <ol className="mt-1 space-y-1 pl-md text-body-sm text-on-surface-variant" style={{ listStyleType: 'decimal' }}>
                      {exercise.cues.map((cue) => (
                        <li key={cue}>{cue}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Actions — pinned to bottom */}
                  <div className="mt-auto flex flex-wrap gap-sm pt-sm">
                    <Button variant="secondary" onClick={() => setPlayerExercise(exercise)}>
                      Open in YouTube / Demo
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

function PillButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <Button
      variant="pill"
      onClick={onClick}
      className={active ? 'bg-surface-container-high text-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}
    >
      {children}
    </Button>
  )
}
