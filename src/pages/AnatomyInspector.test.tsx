import { fireEvent, render, screen } from '@testing-library/react'
import { AnatomyInspector } from './AnatomyInspector'
import type { MuscleGroup } from '../domain/exerciseFilter'

// B-1 (tracer bullet): AC-1: activating a region control on the diagram selects that muscle.
// Driven through `calves` — a region the supplied diagram depicts but the placeholder figure
// never exposed — so this proves the real diagram is wired to the page's filter, rather than
// re-proving something the placeholder already did.
test('activating a muscle region on the diagram selects that muscle', () => {
  const onSelect = vi.fn()
  render(<AnatomyInspector selected="all" onSelect={onSelect} />)

  fireEvent.click(screen.getByRole('button', { name: /calves region/i }))

  expect(onSelect).toHaveBeenCalledWith('calves')
})

// B-2: AC-3: the diagram's region set is exactly the trainable regions the asset depicts.
// Spelled out rather than derived from MUSCLE_GROUPS on purpose — reading the vocabulary back
// out of the component under test would pass vacuously no matter what shipped.
const DEPICTED_REGIONS: MuscleGroup[] = [
  'neck',
  'trapezius',
  'shoulders',
  'chest',
  'lats',
  'lower-back',
  'biceps',
  'triceps',
  'forearms',
  'core',
  'obliques',
  'hip-flexors',
  'glutes',
  'quadriceps',
  'hamstrings',
  'knees',
  'calves',
]

test('every region the diagram depicts is selectable and reports itself', () => {
  const unreachable: MuscleGroup[] = []

  for (const muscle of DEPICTED_REGIONS) {
    const onSelect = vi.fn()
    const { unmount } = render(<AnatomyInspector selected="all" onSelect={onSelect} />)

    const controls = screen
      .queryAllByRole('button')
      .filter((el) => (el.getAttribute('aria-label') ?? '').toLowerCase().includes(muscle.replace('-', ' ')))

    if (controls.length === 0) {
      unreachable.push(muscle)
    } else {
      fireEvent.click(controls[0])
      if (!onSelect.mock.calls.some(([m]) => m === muscle)) unreachable.push(muscle)
    }

    unmount()
  }

  expect(unreachable).toEqual([])
})

// B-3: AC-2: the legend reports the current selection back to the user.
test('the legend names the selected region, and says so when nothing is selected', () => {
  const { unmount } = render(<AnatomyInspector selected="all" onSelect={() => {}} />)
  expect(screen.getByTestId('anatomy-legend').textContent).toMatch(/no.*select|none/i)
  unmount()

  render(<AnatomyInspector selected="hamstrings" onSelect={() => {}} />)
  expect(screen.getByTestId('anatomy-legend').textContent).toMatch(/hamstrings/i)
})

// B-3: AC-4: front and back are drawn together, so a back-only region needs no view toggle.
test('regions only visible from behind are selectable with no view toggle', () => {
  render(<AnatomyInspector selected="all" onSelect={() => {}} />)

  const backOnly = ['trapezius', 'lats', 'triceps', 'lower back', 'glutes', 'hamstrings']
  const labels = screen.queryAllByRole('button').map((el) => (el.getAttribute('aria-label') ?? '').toLowerCase())

  const missing = backOnly.filter((region) => !labels.some((l) => l.includes(region)))
  expect(missing).toEqual([])

  // there is no anterior/posterior switch to operate — the toggle is gone by design
  expect(screen.queryByRole('button', { name: /^(ant|post|anterior|posterior)$/i })).not.toBeInTheDocument()
})

test('full-body is not reachable from the diagram, and head and feet are inert', () => {
  const onSelect = vi.fn()
  render(<AnatomyInspector selected="all" onSelect={onSelect} />)

  const labels = screen.queryAllByRole('button').map((el) => (el.getAttribute('aria-label') ?? '').toLowerCase())

  // the body depicts no whole-body region — full-body stays reachable via the page's filter chips
  expect(labels.filter((l) => l.includes('full body') || l.includes('full-body'))).toEqual([])
  // the asset draws head and feet as silhouette, not muscle: presented, never selectable
  expect(labels.filter((l) => l.includes('head') || l.includes('feet') || l.includes('foot'))).toEqual([])
})
