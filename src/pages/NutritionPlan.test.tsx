import { fireEvent, render, screen, within } from '@testing-library/react'
import { NutritionPlan } from './NutritionPlan'

beforeEach(() => {
  localStorage.clear()
})

// B-2 (e2e): AC-3 + AC-4 + AC-5 + AC-6: a user fills the form, picks a goal and
// macro preset, sees live results, saves, and exports.
test('fills the form, updates results live, saves and restores locally, and exports JSON', () => {
  const { unmount } = render(<NutritionPlan />)

  fireEvent.change(screen.getByLabelText(/^age$/i), { target: { value: '28' } })
  fireEvent.change(screen.getByLabelText(/^height/i), { target: { value: '175' } })
  fireEvent.change(screen.getByLabelText(/^weight/i), { target: { value: '70' } })

  fireEvent.click(screen.getByRole('button', { name: /^Bulk/ }))
  fireEvent.click(screen.getByRole('button', { name: /^Keto$/ }))

  // live results, no submit needed
  expect(screen.getAllByText(/surplus/i).length).toBeGreaterThan(0)
  expect(screen.getByText('Vitamin D3')).toBeInTheDocument()

  // Save Plan persists locally
  fireEvent.click(screen.getByRole('button', { name: /save plan/i }))
  expect(localStorage.getItem('apexfit-nutrition-plan')).not.toBeNull()

  // remount restores from local storage
  unmount()
  render(<NutritionPlan />)
  expect(screen.getByLabelText(/^age$/i)).toHaveValue(28)

  // Export JSON produces a real link whose content matches the computed plan
  const link = screen.getByRole('link', { name: /export json/i }) as HTMLAnchorElement
  const encoded = link.href.replace('data:application/json;charset=utf-8,', '')
  const payload = JSON.parse(decodeURIComponent(encoded))
  expect(payload.biometrics.age).toBe(28)
  expect(payload.micronutrients).toHaveLength(7)
})

// 0008 B-2: AC-2: the selectors are named chip groups that report which option is chosen.
test('sex, units, activity and macro preset are named selector groups that report the chosen option', () => {
  render(<NutritionPlan />)

  const sex = screen.getByRole('group', { name: 'Sex' })
  for (const name of ['Units', 'Activity level', 'Macro preset']) {
    expect(screen.getByRole('group', { name })).toBeInTheDocument()
  }

  expect(within(sex).getByRole('button', { name: 'Male' })).toHaveAttribute('aria-pressed', 'true')
  fireEvent.click(within(sex).getByRole('button', { name: 'Female' }))
  expect(within(sex).getByRole('button', { name: 'Female' })).toHaveAttribute('aria-pressed', 'true')
  expect(within(sex).getByRole('button', { name: 'Male' })).toHaveAttribute('aria-pressed', 'false')
})
