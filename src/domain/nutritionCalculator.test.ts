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
