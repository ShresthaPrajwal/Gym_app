import { fireEvent, render, screen, within } from '@testing-library/react'
import { ExerciseLibrary } from './ExerciseLibrary'

// B-3 (e2e): AC-4 + AC-5 + AC-6: search/filter narrows results and updates the count,
// reset restores the full list, a no-match combination shows the no-results state, the
// anatomy inspector stays in sync, and the technique modal opens/closes.
test('search/filter narrows results, resets, shows no-results, syncs the anatomy inspector, and opens/closes the technique modal', () => {
  render(<ExerciseLibrary />)

  const anatomyGroup = screen.getByRole('group', { name: /anatomy group/i })
  const difficultyGroup = screen.getByRole('group', { name: /difficulty/i })
  const equipmentGroup = screen.getByRole('group', { name: /equipment/i })

  // search narrows to a single exercise
  fireEvent.change(screen.getByLabelText(/search exercises/i), { target: { value: 'bench' } })
  expect(screen.getByRole('heading', { name: 'Bench Press', level: 3 })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Back Squat', level: 3 })).not.toBeInTheDocument()

  // open the technique modal, check content, close it
  fireEvent.click(screen.getByRole('button', { name: /watch demo/i }))
  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByText('Bench Press')).toBeInTheDocument()
  const searchLink = within(dialog).getByRole('link', { name: /watch on youtube/i })
  expect(searchLink).toHaveAttribute('href', expect.stringContaining('youtube.com/results?search_query='))
  fireEvent.click(within(dialog).getByRole('button', { name: /close/i }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

  // add to routine doesn't throw
  fireEvent.click(screen.getByRole('button', { name: /add to routine/i }))

  // clear search, narrow by anatomy + difficulty instead
  fireEvent.change(screen.getByLabelText(/search exercises/i), { target: { value: '' } })
  // 0002: the coarse 'Legs' control was replaced by per-muscle regions; Back Squat and Lunge
  // are both quadriceps, so the same narrowing intent now runs through the Quadriceps control.
  fireEvent.click(within(anatomyGroup).getByRole('button', { name: /quadriceps/i }))
  fireEvent.click(within(difficultyGroup).getByRole('button', { name: 'Advanced' }))
  expect(screen.getByRole('heading', { name: 'Back Squat', level: 3 })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Lunge', level: 3 })).not.toBeInTheDocument()

  // reset restores the full list
  fireEvent.click(screen.getByRole('button', { name: 'Reset Matrix' }))
  expect(screen.getByRole('heading', { name: 'Lunge', level: 3 })).toBeInTheDocument()

  // a combination with no matches shows the no-results state
  fireEvent.click(within(anatomyGroup).getByRole('button', { name: /core/i }))
  fireEvent.click(within(equipmentGroup).getByRole('button', { name: 'Barbell' }))
  expect(screen.getByText(/no matching exercises/i)).toBeInTheDocument()
  expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /reset filter matrix/i }))
  expect(screen.getByRole('heading', { name: 'Bench Press', level: 3 })).toBeInTheDocument()

  // anatomy inspector stays in sync with the selected anatomy group
  fireEvent.click(within(anatomyGroup).getByRole('button', { name: /quadriceps/i }))
  expect(screen.getByRole('button', { name: /quadriceps region/i, pressed: true })).toBeInTheDocument()

  // toggling anterior/posterior changes the view without changing the selection — 'Lats' is
  // only reachable from the posterior view, as 'Back' was before the per-muscle split
  expect(screen.queryByRole('button', { name: /lats region/i })).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'POST' }))
  expect(screen.getByRole('button', { name: /lats region/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Back Squat', level: 3 })).toBeInTheDocument()
})
