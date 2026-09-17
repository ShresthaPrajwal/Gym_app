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
  // 0002: 'bench' alone now matches three exercises (Bench Press, Close-Grip Bench Press,
  // Bench Dip) in the grown catalogue; this term still resolves to exactly Bench Press,
  // which the single-result assertions below depend on.
  fireEvent.change(screen.getByLabelText(/search exercises/i), { target: { value: 'bench press chest' } })
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
  // 0002: Core+Barbell became a real match (Weighted Plank); Core+Dumbbell is the pairing
  // that is still legitimately empty.
  fireEvent.click(within(anatomyGroup).getByRole('button', { name: /core/i }))
  fireEvent.click(within(equipmentGroup).getByRole('button', { name: 'Dumbbell' }))
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

// ── 0002 S-0002.01 ────────────────────────────────────────────────────────────
// B-4: AC-4 [e2e]: a user selects one specific muscle region in the Exercise Library and the
// listing narrows to exactly that region, with the reported count matching what is shown.
// Driven through 'Calves' — a region this feature introduces — because selecting one of the
// surviving coarse areas would have passed before the change and proved nothing.
test('selecting a specific muscle region narrows the listing and the reported count matches', () => {
  render(<ExerciseLibrary />)

  const anatomyGroup = screen.getByRole('group', { name: /anatomy group/i })
  fireEvent.click(within(anatomyGroup).getByRole('button', { name: /^calves$/i }))

  const listed = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)

  // every calves exercise and nothing else
  expect(listed).toContain('Standing Calf Raise')
  expect(listed).not.toContain('Bench Press')
  expect(listed).not.toContain('Back Squat')

  // the count the page reports is the count it actually rendered
  expect(screen.getByText(`Indexed Drills: ${listed.length}`)).toBeInTheDocument()

  // and the active-sector readout names the chosen region back to the user (scoped, since
  // the region's name also appears on its filter control)
  const sector = screen.getByText('Active Sector').parentElement as HTMLElement
  expect(within(sector).getByText('Calves')).toBeInTheDocument()
})
