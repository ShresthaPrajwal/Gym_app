import { useState } from 'react'
import { Badge, Button, Card, PageLayout, VideoThumbnail } from '../components'
import {
  CADENCES,
  EXPERIENCE_LEVELS,
  GOALS,
  generateWeeklyPlan,
  type Cadence,
  type ExperienceLevel,
  type Goal,
  type Hardware,
} from '../domain/routineGenerator'

const GOAL_META: Record<Goal, { label: string; description: string }> = {
  abs: { label: 'Core Shred', description: 'Visceral density & rotational stability' },
  bulk: { label: 'Mass Hypertrophy', description: 'Cross-sectional myofibrillar enlargement' },
  'cut-lean': { label: 'Lean Definition', description: 'Fat loss with lean mass retention' },
  'general-fitness': { label: 'Total Health', description: 'Cardiometabolic longevity and resilience' },
  strength: { label: 'Peak Strength', description: 'Neural recruitment & 1RM capacity' },
  endurance: { label: 'Endurance', description: 'Aerobic capacity & work tolerance' },
}

const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const HARDWARE_OPTIONS: { value: Hardware; label: string }[] = [
  { value: 'full', label: 'Full Facility' },
  { value: 'dumbbell', label: 'Dumbbell Only' },
  { value: 'bodyweight', label: 'Bodyweight/Home' },
]

export function RoutineBuilder() {
  const [experience, setExperience] = useState<ExperienceLevel>('intermediate')
  const [cadence, setCadence] = useState<Cadence>(5)
  const [hardware, setHardware] = useState<Hardware>('full')
  const [goal, setGoal] = useState<Goal | ''>('')
  const [dayIndex, setDayIndex] = useState(0)

  const plan = goal ? generateWeeklyPlan(goal, experience, cadence, hardware) : null
  const day = plan?.[dayIndex]

  return (
    <PageLayout>
      <div className="flex flex-col gap-xs">
        <span className="w-fit rounded bg-surface-container-high px-sm py-0.5 font-display text-label-caps uppercase tracking-wider text-primary-container">
          Algorithmic Program Engine
        </span>
        <h1 className="font-display text-headline-xl uppercase leading-none tracking-tight text-white">
          Goal-Based Routine Generator
        </h1>
        <p className="max-w-2xl text-body-md text-on-surface-variant">
          Set your adaptation threshold, cadence, and hardware, pick a primary target, and get a full deterministic
          7-day plan — generated entirely in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-md rounded bg-surface-container-low p-md lg:grid-cols-3">
        <PillGroup
          label="Adaptation Threshold"
          options={EXPERIENCE_LEVELS.map((level) => ({ value: level, label: EXPERIENCE_LABELS[level] }))}
          value={experience}
          onChange={setExperience}
        />
        <PillGroup
          label="Microcycle Cadence"
          options={CADENCES.map((c) => ({ value: c, label: `${c} Days` }))}
          value={cadence}
          onChange={setCadence}
        />
        <PillGroup
          label="Available Hardware"
          options={HARDWARE_OPTIONS.map((h) => ({ value: h.value, label: h.label }))}
          value={hardware}
          onChange={setHardware}
        />
      </div>

      <div>
        <span className="font-display text-label-caps uppercase text-on-surface-variant">
          Primary Adaptational Target <span className="text-slate-500">· Select 1 of {GOALS.length}</span>
        </span>
        <div className="mt-sm grid grid-cols-2 gap-sm sm:grid-cols-3 lg:grid-cols-6">
          {GOALS.map((g) => {
            const active = g === goal
            const meta = GOAL_META[g]
            return (
              <Button
                key={g}
                variant="card"
                onClick={() => {
                  setGoal(g)
                  setDayIndex(0)
                }}
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

      {plan && day && (
        <div className="grid grid-cols-1 items-start gap-md lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-xs">
            <span className="font-display text-label-caps uppercase text-on-surface-variant">7-Day Plan</span>
            {plan.map((d, i) => {
              const selected = i === dayIndex
              return (
                <Button
                  key={d.day}
                  variant="card"
                  onClick={() => setDayIndex(i)}
                  className={`flex items-center justify-between gap-sm ${
                    d.isRest
                      ? 'bg-surface-container-lowest opacity-80 hover:bg-surface-container-low'
                      : selected
                        ? 'bg-surface-container-high shadow-[inset_0_-2px_0_0_#c3f400]'
                        : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-display text-label-md font-bold text-white">{d.day}</span>
                    {!d.isRest && (
                      <span className="font-body text-body-sm text-on-surface-variant">
                        {d.exercises.length} exercises · {[...new Set(d.exercises.map((e) => e.targetMuscle))].join(' / ')}
                      </span>
                    )}
                  </div>
                  {d.isRest ? (
                    <Badge>rest</Badge>
                  ) : (
                    <span className="rounded bg-surface-container-lowest px-sm py-0.5 font-display text-label-caps uppercase text-on-surface-variant">
                      {d.exercises.reduce((s, e) => s + e.sets, 0)} sets
                    </span>
                  )}
                </Button>
              )
            })}
          </div>

          <div className="flex flex-col gap-sm">
            {day.isRest ? (
              <Card>
                <h2 className="font-display text-headline-lg text-white">{day.day}</h2>
                <p className="mt-sm text-body-md text-on-surface-variant">
                  Recovery day — no training scheduled. Rest, hydrate, and let adaptation happen.
                </p>
              </Card>
            ) : (
              <>
                <Card>
                  <h2 className="font-display text-headline-lg text-white">{day.day}</h2>
                  <div className="mt-sm grid grid-cols-3 gap-sm">
                    <Stat label="Total sets" value={String(day.exercises.reduce((s, e) => s + e.sets, 0))} />
                    <Stat label="Exercises" value={String(day.exercises.length)} />
                    <Stat label="Focal muscles" value={[...new Set(day.exercises.map((e) => e.targetMuscle))].join(' / ')} />
                  </div>
                </Card>

                {day.exercises.map((exercise, i) => (
                  <Card key={exercise.name} className="flex items-center gap-sm">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-surface-container-highest font-display text-label-caps text-primary-container">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-sm">
                        <span className="font-display text-base font-bold text-white">{exercise.name}</span>
                        <Badge>{exercise.targetMuscle}</Badge>
                      </div>
                      <span className="text-sm text-on-surface-variant">
                        {exercise.sets} × {exercise.reps} · rest {exercise.rest}
                      </span>
                      <p className="mt-1 text-body-sm text-on-surface-variant">{exercise.instructions}</p>
                    </div>
                    <VideoThumbnail name={exercise.name} videoUrl={exercise.videoUrl} />
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  )
}

function PillGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-col gap-xs">
      <span className="font-display text-label-caps uppercase tracking-wider text-on-surface-variant">{label}</span>
      <div className="flex flex-wrap gap-1 rounded bg-surface-container-lowest p-1">
        {options.map((opt) => (
          <Button
            key={String(opt.value)}
            variant="pill"
            onClick={() => onChange(opt.value)}
            className={`min-h-[44px] px-3 ${
              value === opt.value
                ? 'bg-surface-container-high text-primary-container shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
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
