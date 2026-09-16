import { useState } from 'react'
import { Badge, Card, PageLayout, Select } from '../components'
import { MUSCLE_GROUPS, filterByMuscle, type MuscleGroup } from '../domain/exerciseFilter'
import { BodyMap } from './BodyMap'

const MUSCLE_LABELS: Record<MuscleGroup, string> = {
  chest: 'Chest',
  back: 'Back',
  legs: 'Legs',
  shoulders: 'Shoulders',
  arms: 'Arms',
  core: 'Core',
  'full-body': 'Full body',
}

export function ExerciseLibrary() {
  const [muscle, setMuscle] = useState<MuscleGroup | ''>('')
  const exercises = muscle ? filterByMuscle(muscle) : null

  return (
    <PageLayout>
      <h1 className="text-2xl font-semibold">Exercise Library</h1>

      <BodyMap onSelect={setMuscle} />

      <Select
        aria-label="Muscle group"
        value={muscle}
        onChange={(e) => setMuscle(e.target.value as MuscleGroup)}
      >
        <option value="" disabled>
          Select a muscle group
        </option>
        {MUSCLE_GROUPS.map((m) => (
          <option key={m} value={m}>
            {MUSCLE_LABELS[m]}
          </option>
        ))}
      </Select>

      {exercises && (
        <div className="flex flex-col gap-md">
          {exercises.map((exercise) => (
            <Card key={exercise.name}>
              <div className="flex items-center gap-sm">
                <span>{exercise.name}</span>
                <Badge>{exercise.targetMuscle}</Badge>
              </div>
              <a
                href={exercise.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-brand-700 underline"
              >
                {exercise.name} demo
              </a>
            </Card>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
