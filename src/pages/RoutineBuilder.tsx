import { useState } from 'react'
import { Badge, Button, Card, PageLayout, Select } from '../components'
import { GOALS, generateWeeklyPlan, type Goal, type WeekDay } from '../domain/routineGenerator'

// TODO(B-3): temporary fixed threshold/cadence/hardware until the pill controls +
// rest-day/video UI land — see task T-gym-app-yby142.
function isTrainingDay(d: WeekDay): d is Extract<WeekDay, { isRest: false }> {
  return !d.isRest
}

const GOAL_META: Record<Goal, { label: string; description: string }> = {
  abs: { label: 'Core Shred', description: 'Visceral density & rotational stability' },
  bulk: { label: 'Mass Hypertrophy', description: 'Cross-sectional myofibrillar enlargement' },
  'cut-lean': { label: 'Lean Definition', description: 'Fat loss with lean mass retention' },
  'general-fitness': { label: 'Total Health', description: 'Cardiometabolic longevity and resilience' },
  strength: { label: 'Peak Strength', description: 'Neural recruitment & 1RM capacity' },
  endurance: { label: 'Endurance', description: 'Aerobic capacity & work tolerance' },
}

export function RoutineBuilder() {
  const [goal, setGoal] = useState<Goal | ''>('')
  const [dayIndex, setDayIndex] = useState(0)
  const routine = goal ? generateWeeklyPlan(goal, 'intermediate', 5, 'full').filter(isTrainingDay) : null
  const day = routine?.[Math.min(dayIndex, routine.length - 1)]

  function selectGoal(g: Goal) {
    setGoal(g)
    setDayIndex(0)
  }

  return (
    <PageLayout>
      <div className="flex flex-col justify-between gap-md lg:flex-row lg:items-end">
        <div className="flex flex-col gap-xs">
          <span className="w-fit rounded bg-surface-container-high px-sm py-0.5 font-display text-label-caps uppercase tracking-wider text-primary-container">
            Algorithmic Program Engine
          </span>
          <h1 className="font-display text-headline-xl uppercase leading-none tracking-tight text-white">
            Goal-Based Routine Generator
          </h1>
          <p className="max-w-2xl text-body-md text-on-surface-variant">
            Pick a training goal and get a deterministic weekly routine, generated entirely in your browser — no
            account, no server round-trip.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-sm">
          <Button
            variant="secondary"
            disabled={!routine}
            onClick={() => routine && navigator.clipboard?.writeText(JSON.stringify(routine, null, 2)).catch(() => {})}
          >
            Copy JSON
          </Button>
          <Button variant="secondary" disabled={!routine} onClick={() => window.print()}>
            Print Blueprint
          </Button>
        </div>
      </div>

      <div>
        <div className="mb-sm flex items-center justify-between">
          <span className="font-display text-label-caps uppercase text-on-surface-variant">
            Primary Adaptational Target <span className="text-slate-500">· Select 1 of {GOALS.length}</span>
          </span>
          <label className="flex shrink-0 items-center gap-sm">
            <span className="font-display text-label-caps uppercase text-on-surface-variant">Goal</span>
            <Select
              aria-label="Goal"
              value={goal}
              onChange={(e) => selectGoal(e.target.value as Goal)}
            >
              <option value="" disabled>
                Select a goal
              </option>
              {GOALS.map((g) => (
                <option key={g} value={g}>
                  {GOAL_META[g].label}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-sm sm:grid-cols-3 lg:grid-cols-6">
          {GOALS.map((g) => {
            const active = g === goal
            const meta = GOAL_META[g]
            return (
              <Button
                key={g}
                variant="card"
                onClick={() => selectGoal(g)}
                className={`flex flex-col items-start gap-xs ${
                  active ? 'bg-surface-container shadow-[0_0_24px_rgba(195,244,0,0.15)]' : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                {active && <div className="absolute inset-x-0 top-0 h-0.5 rounded-t bg-primary-container" />}
                <span className="font-display text-headline-sm text-white">{meta.label}</span>
                <span className="font-body text-body-sm text-on-surface-variant">{meta.description}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {routine && day && (
        <div className="grid grid-cols-1 items-start gap-md lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-xs">
            <span className="font-display text-label-caps uppercase text-on-surface-variant">
              {routine.length}-Day Rotation
            </span>
            {routine.map((d, i) => {
              const selected = i === dayIndex
              return (
                <Button
                  key={d.day}
                  variant="card"
                  onClick={() => setDayIndex(i)}
                  className={`flex items-center justify-between gap-sm ${
                    selected ? 'bg-surface-container-high shadow-[inset_0_-2px_0_0_#c3f400]' : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-display text-label-md font-bold text-white">{d.day}</span>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      {d.exercises.length} exercises · {[...new Set(d.exercises.map((e) => e.targetMuscle))].join(' / ')}
                    </span>
                  </div>
                  <span className="rounded bg-surface-container-lowest px-sm py-0.5 font-display text-label-caps uppercase text-on-surface-variant">
                    {d.exercises.reduce((s, e) => s + e.sets, 0)} sets
                  </span>
                </Button>
              )
            })}
          </div>

          <div className="flex flex-col gap-sm">
            <Card>
              <h2 className="font-display text-headline-lg text-white">{day.day}</h2>
              <div className="mt-sm grid grid-cols-3 gap-sm">
                <Stat label="Total sets" value={String(day.exercises.reduce((s, e) => s + e.sets, 0))} />
                <Stat label="Exercises" value={String(day.exercises.length)} />
                <Stat label="Focal muscles" value={[...new Set(day.exercises.map((e) => e.targetMuscle))].join(' / ')} />
              </div>
            </Card>

            {day.exercises.map((exercise, i) => (
              <Card key={exercise.name} className="flex items-center justify-between gap-sm">
                <div className="flex items-center gap-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded bg-surface-container-highest font-display text-label-caps text-primary-container">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-sm">
                      <span className="font-display text-base font-bold text-white">{exercise.name}</span>
                      <Badge>{exercise.targetMuscle}</Badge>
                    </div>
                    <span className="text-sm text-on-surface-variant">
                      {exercise.sets} × {exercise.reps} · rest {exercise.rest}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-surface-container-lowest p-sm">
      <div className="font-display text-label-caps uppercase text-on-surface-variant">{label}</div>
      <div className="mt-1 truncate font-display text-metric-md text-white">{value}</div>
    </div>
  )
}
