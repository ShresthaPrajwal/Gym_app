import { calculateNutritionPlan } from './nutritionCalculator'

// B-1 (tracer bullet): AC-1 + AC-2: calculating a plan returns BMR/TDEE, and the
// target calories reflect the selected goal's adjustment.
test('returns BMR/TDEE and a goal-adjusted, labeled target-calorie value', () => {
  const input = {
    sex: 'male' as const,
    age: 30,
    height: 180,
    weight: 80,
    unit: 'metric' as const,
    activityLevel: 'moderate' as const,
    goal: 'maintain' as const,
    macroPreset: 'moderate' as const,
  }

  const plan = calculateNutritionPlan(input)

  expect(plan.bmr).toBeCloseTo(1780, 0)
  expect(plan.tdee).toBeCloseTo(2759, 0)
  expect(plan.targetCalories).toBeCloseTo(2759, 0)
  expect(plan.goalLabel).toBe('maintenance')

  const cutPlan = calculateNutritionPlan({ ...input, goal: 'cut' })
  expect(cutPlan.targetCalories).toBeCloseTo(plan.tdee * 0.8, 0)
  expect(cutPlan.goalLabel).toBe('deficit')
})

// AC-3: macro preset breakdown is internally consistent — grams×kcal/g sum to
// target calories (within rounding), for every preset.
const MACRO_PRESETS_UNDER_TEST = ['high-carb', 'moderate', 'low-carb', 'keto'] as const
test.each(MACRO_PRESETS_UNDER_TEST)('macro preset "%s" is internally consistent with target calories', (preset) => {
  const plan = calculateNutritionPlan({
    sex: 'male',
    age: 30,
    height: 180,
    weight: 80,
    unit: 'metric',
    activityLevel: 'moderate',
    goal: 'maintain',
    macroPreset: preset,
  })

  const { protein, carbs, fat } = plan.macros
  const reconstructed = protein.grams * 4 + carbs.grams * 4 + fat.grams * 9
  expect(reconstructed).toBeCloseTo(plan.targetCalories, -1)
  expect(protein.percentage + carbs.percentage + fat.percentage).toBeCloseTo(100, 0)
  expect(protein.gramsPerKg).toBeGreaterThan(0)
})

// AC-4: the micronutrient/supplement reference list covers all 7 named items.
test('includes the full micronutrient/supplement reference list', () => {
  const plan = calculateNutritionPlan({
    sex: 'female',
    age: 25,
    height: 165,
    weight: 60,
    unit: 'metric',
    activityLevel: 'light',
    goal: 'cut',
    macroPreset: 'keto',
  })

  const names = plan.micronutrients.map((m) => m.name)
  expect(names).toEqual(
    expect.arrayContaining([
      'Vitamin D3',
      'Calcium',
      'Magnesium Glycinate',
      'Iron',
      'Zinc',
      'Omega-3',
      'Creatine Monohydrate',
    ]),
  )
  for (const m of plan.micronutrients) {
    expect(m.intake.length).toBeGreaterThan(0)
    expect(m.purpose.length).toBeGreaterThan(0)
  }
})

// AC-5 (non-functional): hand-calculated reference values, within 1%.
test('matches hand-calculated reference values within 1%', () => {
  const male = calculateNutritionPlan({
    sex: 'male',
    age: 30,
    height: 180,
    weight: 80,
    unit: 'metric',
    activityLevel: 'moderate',
    goal: 'maintain',
    macroPreset: 'moderate',
  })
  expect(male.bmr).toBeCloseTo(1780, -1)
  expect(male.tdee).toBeCloseTo(2759, -1)
  expect(male.targetCalories).toBeCloseTo(2759, -1)

  const female = calculateNutritionPlan({
    sex: 'female',
    age: 25,
    height: 165,
    weight: 60,
    unit: 'metric',
    activityLevel: 'light',
    goal: 'cut',
    macroPreset: 'keto',
  })
  expect(female.bmr).toBeCloseTo(1345.25, 0)
  expect(female.tdee).toBeCloseTo(1849.7, 0)
  expect(female.targetCalories).toBeCloseTo(1479.8, 0)
})
