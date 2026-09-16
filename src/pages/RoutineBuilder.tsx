import { useState } from 'react'
import { Badge, Card, PageLayout, Select } from '../components'
import { GOALS, generateRoutine, type Goal } from '../domain/routineGenerator'

const GOAL_LABELS: Record<Goal, string> = {
  abs: 'Abs',
  bulk: 'Bulk',
  'cut-lean': 'Cut / Lean',
  'general-fitness': 'General fitness',
  strength: 'Strength',
  endurance: 'Endurance',
}

export function RoutineBuilder() {
  const [goal, setGoal] = useState<Goal | ''>('')
  const routine = goal ? generateRoutine(goal) : null

  return (
    <PageLayout>
      <h1 className="text-2xl font-semibold">Routine Builder</h1>
      <Select
        aria-label="Goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value as Goal)}
      >
        <option value="" disabled>
          Select a goal
        </option>
        {GOALS.map((g) => (
          <option key={g} value={g}>
            {GOAL_LABELS[g]}
          </option>
        ))}
      </Select>

      {routine && (
        <div className="flex flex-col gap-md">
          {routine.map((day) => (
            <Card key={day.day}>
              <h2 className="text-lg font-medium">{day.day}</h2>
              <ul className="flex flex-col gap-sm">
                {day.exercises.map((exercise) => (
                  <li key={exercise.name} className="flex items-center gap-sm">
                    <span>{exercise.name}</span>
                    <Badge>{exercise.targetMuscle}</Badge>
                    <span className="text-sm">
                      {exercise.sets} × {exercise.reps} · rest {exercise.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
