import { useState, type JSX } from 'react'
import { Badge, Button, Card, ChipGroup, PageLayout, VideoThumbnail } from '../components'
import {
  CADENCES,
  EXPERIENCE_LEVELS,
  GOALS,
  generateWeeklyPlan,
  type Cadence,
  type ExperienceLevel,
  type Goal,
  type Hardware,
  type PlanExercise,
} from '../domain/routineGenerator'
import { VideoPlayerModal } from './VideoPlayerModal'

const GOAL_META: Record<Goal, { label: string; description: string; icon: JSX.Element }> = {
  abs: {
    label: 'Core Shred',
    description: 'Visceral density & rotational stability',
    icon: <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  },
  bulk: {
    label: 'Mass Hypertrophy',
    description: 'Cross-sectional myofibrillar enlargement',
    icon: <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M6.5 6.5h11M6.5 17.5h11M4 12h16M9 4l-2 2M15 4l2 2M9 20l-2-2M15 20l2-2"/></svg>,
  },
  'cut-lean': {
    label: 'Lean Definition',
    description: 'Fat loss with lean mass retention',
    icon: <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 2C9 2 6 5 6 9c0 3.5 2.5 6.5 6 8.5 3.5-2 6-5 6-8.5C18 5 15 2 12 2z"/><path d="M12 2v18"/></svg>,
  },
  'general-fitness': {
    label: 'Total Health',
    description: 'Cardiometabolic longevity and resilience',
    icon: <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  },
  strength: {
    label: 'Peak Strength',
    description: 'Neural recruitment & 1RM capacity',
    icon: <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  endurance: {
    label: 'Endurance',
    description: 'Aerobic capacity & work tolerance',
    icon: <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
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
  const [playerExercise, setPlayerExercise] = useState<PlanExercise | null>(null)

  const plan = goal ? generateWeeklyPlan(goal, experience, cadence, hardware) : null
  const day = plan?.[dayIndex]

  return (
    <PageLayout>
      <div className="flex flex-col gap-xs">
        <h1 className="font-display text-headline-lg md:text-headline-xl leading-none tracking-tight text-white">
          Routine Generator
        </h1>
        <p className="max-w-2xl text-body-md text-on-surface-variant">
          Pick your level, schedule, and equipment, then choose a goal to get a full 7-day plan generated in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-md rounded bg-surface-container-low p-md lg:grid-cols-3">
        <ChipGroup
          label="Level"
          options={EXPERIENCE_LEVELS.map((level) => ({ value: level, label: EXPERIENCE_LABELS[level] }))}
          value={experience}
          onChange={setExperience}
        />
        <ChipGroup
          label="Days per week"
          options={CADENCES.map((c) => ({ value: c, label: `${c} Days` }))}
          value={cadence}
          onChange={setCadence}
        />
        <ChipGroup
          label="Equipment"
          options={HARDWARE_OPTIONS.map((h) => ({ value: h.value, label: h.label }))}
          value={hardware}
          onChange={setHardware}
        />
      </div>

      <div>
        <p className="text-body-sm text-on-surface-variant">
          Training goal <span className="text-outline">— pick one</span>
        </p>
        <div className="mt-sm grid grid-cols-2 gap-sm md:grid-cols-3 lg:grid-cols-6">
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
                className={`flex flex-col items-start gap-xs text-left ${
                  active ? 'bg-surface-container shadow-[0_0_24px_rgba(195,244,0,0.15)]' : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                {active && <div className="absolute inset-x-0 top-0 h-0.5 rounded-t bg-primary-container" />}
                <span className={active ? 'text-primary-container' : 'text-on-surface-variant'}>{meta.icon}</span>
                <span className="font-display text-headline-sm text-white">{meta.label}</span>
                <span className="font-body text-body-sm text-on-surface-variant">{meta.description}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {plan && day && (
        <div className="grid grid-cols-1 items-start gap-md lg:grid-cols-[280px_1fr]">
          <div className="flex min-w-0 flex-col gap-xs">
            <p className="text-body-sm text-on-surface-variant">7-day plan</p>
            {/* swipeable day strip on phones and tablets, vertical list beside the day from lg up */}
            <div className="-mx-md flex gap-xs overflow-x-auto px-md pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
              {plan.map((d, i) => {
                const selected = i === dayIndex
                return (
                  <Button
                    key={d.day}
                    variant="card"
                    onClick={() => setDayIndex(i)}
                    className={`flex min-w-[180px] shrink-0 items-center justify-between gap-sm text-left lg:min-w-0 ${
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
                          {d.exercises.length} exercises / {[...new Set(d.exercises.map((e) => e.targetMuscle))].join(', ')}
                        </span>
                      )}
                    </div>
                    {d.isRest ? (
                      <Badge>rest</Badge>
                    ) : (
                      <span className="rounded bg-surface-container-lowest px-sm py-0.5 font-display text-body-sm text-on-surface-variant">
                        {d.exercises.reduce((s, e) => s + e.sets, 0)} sets
                      </span>
                    )}
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-sm">
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
                  <div className="mt-sm grid grid-cols-2 gap-sm md:grid-cols-3">
                    <Stat label="Total sets" value={String(day.exercises.reduce((s, e) => s + e.sets, 0))} />
                    <Stat label="Exercises" value={String(day.exercises.length)} />
                    <Stat className="col-span-2 md:col-span-1" label="Muscles" value={[...new Set(day.exercises.map((e) => e.targetMuscle))].join(', ')} />
                  </div>
                </Card>

                {day.exercises.map((exercise, i) => (
                  <Card key={exercise.name} className="flex flex-col gap-0 overflow-hidden p-0 md:flex-row">
                    <div className="aspect-video w-full shrink-0 md:aspect-auto md:h-auto md:w-[280px]">
                      <VideoThumbnail
                        name={exercise.name}
                        videoUrl={exercise.videoUrl}
                        onPlay={() => setPlayerExercise(exercise)}
                        className="h-full w-full rounded-none"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-sm p-md">
                      <div className="flex flex-wrap items-center gap-xs">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-surface-container-highest font-display text-label-caps text-primary-container">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <Badge>{exercise.targetMuscle}</Badge>
                        <Badge>{exercise.difficulty}</Badge>
                        <Badge>{exercise.equipment}</Badge>
                      </div>

                      <h3 className="font-display text-headline-sm text-white">{exercise.name}</h3>

                      <p className="font-display text-label-md text-primary-container">
                        {exercise.sets} sets × {exercise.reps} &nbsp;·&nbsp; rest {exercise.rest}
                      </p>

                      {exercise.cues?.length > 0 && (
                        <div>
                          <p className="text-body-sm font-semibold text-on-surface-variant">Cues</p>
                          <ol className="mt-1 space-y-1 pl-md text-body-sm text-on-surface-variant" style={{ listStyleType: 'decimal' }}>
                            {exercise.cues.map((cue) => (
                              <li key={cue}>{cue}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      <div className="mt-auto pt-sm">
                        <Button variant="secondary" onClick={() => setPlayerExercise(exercise)}>
                          Watch demo
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>
      )}

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

function Stat({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded bg-surface-container-lowest p-sm ${className}`}>
      <div className="text-body-sm text-on-surface-variant">{label}</div>
      <div className="mt-1 truncate font-display text-metric-md text-white">{value}</div>
    </div>
  )
}
