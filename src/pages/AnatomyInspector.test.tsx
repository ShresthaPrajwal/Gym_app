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

test('full-body is not reachable from the diagram, and head and feet are inert', () => {
  const onSelect = vi.fn()
  render(<AnatomyInspector selected="all" onSelect={onSelect} />)

  const labels = screen.queryAllByRole('button').map((el) => (el.getAttribute('aria-label') ?? '').toLowerCase())

  // the body depicts no whole-body region — full-body stays reachable via the page's filter chips
  expect(labels.filter((l) => l.includes('full body') || l.includes('full-body'))).toEqual([])
  // the asset draws head and feet as silhouette, not muscle: presented, never selectable
  expect(labels.filter((l) => l.includes('head') || l.includes('feet') || l.includes('foot'))).toEqual([])
})
