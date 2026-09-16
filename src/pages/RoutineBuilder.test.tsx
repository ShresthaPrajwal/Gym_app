import { fireEvent, render, screen } from '@testing-library/react'
import { RoutineBuilder } from './RoutineBuilder'

// B-3 (e2e): a user opens the Routine Builder page, selects a goal, and sees the
// generated routine rendered on screen.
test('selecting a goal renders the generated routine', () => {
  render(<RoutineBuilder />)

  const select = screen.getByLabelText(/goal/i)
  fireEvent.change(select, { target: { value: 'abs' } })

  expect(screen.getByText('Plank')).toBeInTheDocument()
})
