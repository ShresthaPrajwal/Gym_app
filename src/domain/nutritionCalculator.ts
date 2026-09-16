export const SEXES = ['male', 'female'] as const
export type Sex = (typeof SEXES)[number]

export const UNITS = ['metric', 'imperial'] as const
export type Unit = (typeof UNITS)[number]

export const ACTIVITY_LEVELS = ['sedentary', 'light', 'moderate', 'active', 'very-active'] as const
export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number]

export const GOALS = ['cut', 'maintain', 'bulk'] as const
export type Goal = (typeof GOALS)[number]

export const MACRO_PRESETS = ['high-carb', 'moderate', 'low-carb', 'keto'] as const
export type MacroPreset = (typeof MACRO_PRESETS)[number]

export type NutritionInput = {
  sex: Sex
  age: number
  height: number
  weight: number
  unit: Unit
  activityLevel: ActivityLevel
  goal: Goal
  macroPreset: MacroPreset
}

export type MacroBreakdown = {
  grams: number
  calories: number
  percentage: number
  gramsPerKg: number
}

export type NutritionPlan = {
  bmr: number
  tdee: number
  targetCalories: number
  goalLabel: 'deficit' | 'maintenance' | 'surplus'
  macros: {
    protein: MacroBreakdown
    carbs: MacroBreakdown
    fat: MacroBreakdown
  }
  micronutrients: Micronutrient[]
}

export type Micronutrient = {
  name: string
  intake: string
  purpose: string
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
}

const GOAL_ADJUSTMENT: Record<Goal, { factor: number; label: NutritionPlan['goalLabel'] }> = {
  cut: { factor: 0.8, label: 'deficit' },
  maintain: { factor: 1, label: 'maintenance' },
  bulk: { factor: 1.15, label: 'surplus' },
}

const MACRO_SPLITS: Record<MacroPreset, { protein: number; carbs: number; fat: number }> = {
  'high-carb': { protein: 0.25, carbs: 0.5, fat: 0.25 },
  moderate: { protein: 0.3, carbs: 0.4, fat: 0.3 },
  'low-carb': { protein: 0.35, carbs: 0.25, fat: 0.4 },
  keto: { protein: 0.25, carbs: 0.05, fat: 0.7 },
}

export const MICRONUTRIENTS: Micronutrient[] = [
  { name: 'Vitamin D3', intake: '2000-4000 IU/day', purpose: 'Supports bone health, immune function, and muscle strength' },
  { name: 'Calcium', intake: '1000-1200 mg/day', purpose: 'Bone density and muscle contraction' },
  {
    name: 'Magnesium Glycinate',
    intake: '300-400 mg/day',
    purpose: 'Muscle recovery, sleep quality, and nervous system function',
  },
  { name: 'Iron', intake: '8-18 mg/day', purpose: 'Oxygen transport and energy production, especially in endurance athletes' },
  { name: 'Zinc', intake: '11-15 mg/day', purpose: 'Immune function, testosterone production, and wound healing' },
  { name: 'Omega-3', intake: '1-3 g/day', purpose: 'Reduces inflammation and supports joint and cardiovascular health' },
  { name: 'Creatine Monohydrate', intake: '3-5 g/day', purpose: 'Improves strength, power output, and muscle recovery' },
]

const INCHES_TO_CM = 2.54
const LBS_TO_KG = 0.453592

function toMetric(height: number, weight: number, unit: Unit): { heightCm: number; weightKg: number } {
  if (unit === 'metric') return { heightCm: height, weightKg: weight }
  return { heightCm: height * INCHES_TO_CM, weightKg: weight * LBS_TO_KG }
}

function macroBreakdown(targetCalories: number, weightKg: number, splitFraction: number, caloriesPerGram: number): MacroBreakdown {
  const calories = targetCalories * splitFraction
  const grams = calories / caloriesPerGram
  return {
    grams: Math.round(grams * 10) / 10,
    calories: Math.round(calories),
    percentage: Math.round(splitFraction * 1000) / 10,
    gramsPerKg: Math.round((grams / weightKg) * 10) / 10,
  }
}

export function calculateNutritionPlan(input: NutritionInput): NutritionPlan {
  const { heightCm, weightKg } = toMetric(input.height, input.weight, input.unit)

  const sexOffset = input.sex === 'male' ? 5 : -161
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * input.age + sexOffset
  const tdee = bmr * ACTIVITY_MULTIPLIERS[input.activityLevel]

  const { factor, label } = GOAL_ADJUSTMENT[input.goal]
  const targetCalories = tdee * factor

  const split = MACRO_SPLITS[input.macroPreset]

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    goalLabel: label,
    macros: {
      protein: macroBreakdown(targetCalories, weightKg, split.protein, 4),
      carbs: macroBreakdown(targetCalories, weightKg, split.carbs, 4),
      fat: macroBreakdown(targetCalories, weightKg, split.fat, 9),
    },
    micronutrients: MICRONUTRIENTS,
  }
}

export function buildExportPayload(plan: NutritionPlan, input: NutritionInput) {
  return {
    biometrics: input,
    calorieResults: { bmr: plan.bmr, tdee: plan.tdee, targetCalories: plan.targetCalories, goalLabel: plan.goalLabel },
    macros: plan.macros,
    micronutrients: plan.micronutrients,
  }
}
