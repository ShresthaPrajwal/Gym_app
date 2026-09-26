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

  // open the demo video dialog, check content, close it
  // (the technique modal this once opened is no longer reachable — Watch demo plays the video in place)
  fireEvent.click(screen.getByRole('button', { name: /watch demo/i }))
  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByText('Bench Press')).toBeInTheDocument()
  const youtubeLink = within(dialog).getByRole('link', { name: /watch on youtube/i })
  expect(youtubeLink).toHaveAttribute('href', expect.stringContaining('youtube.com/'))
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
  fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }))
  expect(screen.getByRole('heading', { name: 'Lunge', level: 3 })).toBeInTheDocument()

  // a combination with no matches shows the no-results state
  // 0002: Core+Barbell became a real match (Weighted Plank); Core+Dumbbell is the pairing
  // that is still legitimately empty.
  fireEvent.click(within(anatomyGroup).getByRole('button', { name: /core/i }))
  fireEvent.click(within(equipmentGroup).getByRole('button', { name: 'Dumbbell' }))
  expect(screen.getByText(/no matching exercises/i)).toBeInTheDocument()
  expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /clear all filters/i }))
  expect(screen.getByRole('heading', { name: 'Bench Press', level: 3 })).toBeInTheDocument()

  // anatomy inspector stays in sync with the selected anatomy group.
  // The ANT/POST view toggle this section used to drive is gone by design: the anatomy diagram
  // now presents front and back together (card AC-4), so a back-only region needs no toggle to
  // reach. Region coverage here is broadened as the diagram's regions land.
  fireEvent.click(within(anatomyGroup).getByRole('button', { name: /^calves$/i }))
  // 0007: chips report which one is active
  expect(within(anatomyGroup).getByRole('button', { name: /^calves$/i })).toHaveAttribute('aria-pressed', 'true')
  expect(within(anatomyGroup).getByRole('button', { name: /^all$/i })).toHaveAttribute('aria-pressed', 'false')
  expect(screen.getAllByRole('button', { name: /calves.*region/i }).some((el) => el.getAttribute('aria-pressed') === 'true')).toBe(true)
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
  expect(screen.getByRole('status')).toHaveTextContent(new RegExp(`Showing ${listed.length} exercises?`))

  // and the active-sector readout names the chosen region back to the user (scoped, since
  // the region's name also appears on its filter control)
  expect(screen.getByRole('status')).toHaveTextContent('Calves')
})

// B-4: AC-5 [e2e]: clicking a muscle on the anatomy diagram itself (not the filter chips)
// narrows the listing and the diagram's legend names the selection. Driven through `glutes`,
// which the asset only draws on the back panel, so the click cannot have come from anywhere else.
test('clicking a region on the anatomy diagram narrows the listing and the legend names it', () => {
  render(<ExerciseLibrary />)

  fireEvent.click(screen.getByRole('button', { name: /glutes region/i }))

  const listed = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
  expect(listed.length).toBeGreaterThan(0)
  expect(listed).toContain('Barbell Hip Thrust')
  expect(listed).not.toContain('Bench Press')

  expect(screen.getByRole('status')).toHaveTextContent(new RegExp(`Showing ${listed.length} exercises?`))
  expect(screen.getByTestId('anatomy-legend').textContent).toMatch(/glutes/i)

  // The diagram is a two-panel landscape figure, so the owner's decision was to present it as a
  // full-width band ABOVE the results rather than in the old narrow sidebar. Asserted as document
  // order — an observable structural fact — rather than by inspecting CSS classes.
  const inspector = screen.getByTestId('anatomy-inspector')
  const firstResult = screen.getAllByRole('heading', { level: 3 })[0]
  expect(inspector.compareDocumentPosition(firstResult) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})
