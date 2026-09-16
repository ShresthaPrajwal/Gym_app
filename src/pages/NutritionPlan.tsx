import { useState } from 'react'
import { Button, Card, Input, PageLayout } from '../components'
import {
  ACTIVITY_LEVELS,
  GOALS,
  MACRO_PRESETS,
  SEXES,
  UNITS,
  buildExportPayload,
  calculateNutritionPlan,
  type ActivityLevel,
  type Goal,
  type MacroPreset,
  type Sex,
  type Unit,
} from '../domain/nutritionCalculator'

const STORAGE_KEY = 'apexfit-nutrition-plan'

type FormState = {
  sex: Sex
  age: number
  height: number
  weight: number
  unit: Unit
  activityLevel: ActivityLevel
  goal: Goal
  macroPreset: MacroPreset
}

const DEFAULTS: FormState = {
  sex: 'male',
  age: 30,
  height: 180,
  weight: 80,
  unit: 'metric',
  activityLevel: 'moderate',
  goal: 'maintain',
  macroPreset: 'moderate',
}

function loadSaved(): FormState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    // ignore malformed/unavailable storage — fall back to defaults
  }
  return DEFAULTS
}

const SEX_LABELS: Record<Sex, string> = { male: 'Male', female: 'Female' }
const UNIT_LABELS: Record<Unit, string> = { metric: 'Metric', imperial: 'Imperial' }
const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary',
  light: 'Light',
  moderate: 'Moderate',
  active: 'Active',
  'very-active': 'Very Active',
}
const GOAL_META: Record<Goal, { label: string; adjustment: string }> = {
  cut: { label: 'Cut', adjustment: '-20% (deficit)' },
  maintain: { label: 'Maintain', adjustment: '±0% (maintenance)' },
  bulk: { label: 'Bulk', adjustment: '+15% (surplus)' },
}
const MACRO_PRESET_LABELS: Record<MacroPreset, string> = {
  'high-carb': 'High Carb',
  moderate: 'Moderate',
  'low-carb': 'Low Carb',
  keto: 'Keto',
}

export function NutritionPlan() {
  const [state, setState] = useState<FormState>(loadSaved)

  const plan = calculateNutritionPlan(state)
  const exportPayload = buildExportPayload(plan, state)
  const exportHref = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportPayload))}`

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }))
  }

  return (
    <PageLayout>
      <div className="flex flex-col gap-xs">
        <h1 className="font-display text-headline-xl text-white">Nutrition &amp; Macro Calculator</h1>
        <p className="max-w-2xl text-body-md text-on-surface-variant">
          Enter your body information and fitness goal to calculate your daily calorie and macro targets, entirely in
          your browser.
        </p>
      </div>

      <Card className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
        <PillGroup label="Biological Sex" options={SEXES.map((v) => ({ value: v, label: SEX_LABELS[v] }))} value={state.sex} onChange={(v) => update('sex', v)} />
        <PillGroup label="Unit" options={UNITS.map((v) => ({ value: v, label: UNIT_LABELS[v] }))} value={state.unit} onChange={(v) => update('unit', v)} />
        <label className="flex flex-col gap-xs">
          <span className="font-display text-label-caps uppercase text-on-surface-variant">Age</span>
          <Input type="number" aria-label="Age" value={state.age} onChange={(e) => update('age', Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-xs">
          <span className="font-display text-label-caps uppercase text-on-surface-variant">
            Height ({state.unit === 'metric' ? 'cm' : 'in'})
          </span>
          <Input
            type="number"
            aria-label={`Height (${state.unit === 'metric' ? 'cm' : 'in'})`}
            value={state.height}
            onChange={(e) => update('height', Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col gap-xs">
          <span className="font-display text-label-caps uppercase text-on-surface-variant">
            Weight ({state.unit === 'metric' ? 'kg' : 'lbs'})
          </span>
          <Input
            type="number"
            aria-label={`Weight (${state.unit === 'metric' ? 'kg' : 'lbs'})`}
            value={state.weight}
            onChange={(e) => update('weight', Number(e.target.value))}
          />
        </label>
        <PillGroup
          label="Activity Level"
          options={ACTIVITY_LEVELS.map((v) => ({ value: v, label: ACTIVITY_LABELS[v] }))}
          value={state.activityLevel}
          onChange={(v) => update('activityLevel', v)}
        />
      </Card>

      <div>
        <span className="font-display text-label-caps uppercase text-on-surface-variant">Fitness Goal</span>
        <div className="mt-sm grid grid-cols-1 gap-sm sm:grid-cols-3">
          {GOALS.map((g) => {
            const active = g === state.goal
            const meta = GOAL_META[g]
            return (
              <Button
                key={g}
                variant="card"
                onClick={() => update('goal', g)}
                className={active ? 'bg-surface-container shadow-[0_0_24px_rgba(195,244,0,0.15)]' : 'bg-surface-container-low hover:bg-surface-container'}
              >
                <div className="flex flex-col items-start">
                  <span className="font-display text-headline-sm text-white">{meta.label}</span>
                  <span className="text-body-sm text-on-surface-variant">{meta.adjustment}</span>
                </div>
              </Button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-sm sm:grid-cols-3">
        <Card>
          <div className="font-display text-label-caps uppercase text-on-surface-variant">BMR</div>
          <div className="mt-1 font-display text-metric-lg text-white">{plan.bmr}</div>
        </Card>
        <Card>
          <div className="font-display text-label-caps uppercase text-on-surface-variant">TDEE</div>
          <div className="mt-1 font-display text-metric-lg text-white">{plan.tdee}</div>
        </Card>
        <Card>
          <div className="font-display text-label-caps uppercase text-on-surface-variant">Target Calories</div>
          <div className="mt-1 font-display text-metric-lg text-primary-container">{plan.targetCalories}</div>
          <div className="text-body-sm capitalize text-on-surface-variant">{plan.goalLabel}</div>
        </Card>
      </div>

      <div>
        <span className="font-display text-label-caps uppercase text-on-surface-variant">Macronutrient Breakdown</span>
        <div className="mt-sm mb-sm">
          <PillGroup
            label="Macro Preset"
            options={MACRO_PRESETS.map((v) => ({ value: v, label: MACRO_PRESET_LABELS[v] }))}
            value={state.macroPreset}
            onChange={(v) => update('macroPreset', v)}
          />
        </div>
        <div className="flex flex-col gap-sm">
          {(['protein', 'carbs', 'fat'] as const).map((macro) => {
            const m = plan.macros[macro]
            return (
              <Card key={macro}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-base font-bold capitalize text-white">{macro}</span>
                  <span className="text-body-sm text-on-surface-variant">
                    {m.grams}g · {m.calories} kcal · {m.percentage}% · {m.gramsPerKg}g/kg
                  </span>
                </div>
                <div className="mt-sm h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <div className="h-full bg-primary-container" style={{ width: `${m.percentage}%` }} />
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <div>
        <span className="font-display text-label-caps uppercase text-on-surface-variant">Micronutrients &amp; Supplements</span>
        <div className="mt-sm grid grid-cols-1 gap-sm sm:grid-cols-2">
          {plan.micronutrients.map((m) => (
            <Card key={m.name}>
              <div className="font-display text-base font-bold text-white">{m.name}</div>
              <div className="text-body-sm text-primary-container">{m.intake}</div>
              <div className="mt-1 text-body-sm text-on-surface-variant">{m.purpose}</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex gap-sm">
        <Button variant="secondary" onClick={() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state))}>
          Save Plan
        </Button>
        <a
          href={exportHref}
          download="nutrition-plan.json"
          className="inline-flex items-center justify-center rounded bg-white/[0.04] border border-outline-variant px-md py-sm font-display text-label-md font-bold uppercase tracking-wide text-white hover:border-secondary"
        >
          Export JSON
        </a>
      </div>
    </PageLayout>
  )
}

function PillGroup<T extends string>({
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
            key={opt.value}
            variant="pill"
            onClick={() => onChange(opt.value)}
            className={`flex-1 ${
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
