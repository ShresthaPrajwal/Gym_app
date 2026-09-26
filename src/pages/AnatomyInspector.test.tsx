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

// B-5: AC-3: "inert" means drawn but non-interactive, not omitted. A geometry audit against the
// source asset found both feet missing from the transcription while the head was present, so the
// figure ended at the ankles. These are the asset's own foot path shapes.
const ASSET_FOOT_PATHS = [
  'M-38 584 L-13 584 L-7 608 Q-16 619 -48 615 Q-54 604 -38 584Z',
  'M38 584 L13 584 L7 608 Q16 619 48 615 Q54 604 38 584Z',
  'M-37 584 L-12 584 L-6 608 Q-16 619 -48 615 Q-53 604 -37 584Z',
  'M37 584 L12 584 L6 608 Q16 619 48 615 Q53 604 37 584Z',
]

test('the inert head and feet are drawn, but expose no control', () => {
  const { container } = render(<AnatomyInspector selected="all" onSelect={() => {}} />)

  const drawn = new Set([...container.querySelectorAll('path')].map((p) => p.getAttribute('d')))
  const missing = ASSET_FOOT_PATHS.filter((d) => !drawn.has(d))
  expect(missing).toEqual([])

  // the head is drawn too (the asset uses an ellipse for it)
  expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(0)

  // ...and none of the inert anatomy is selectable
  const labels = screen.queryAllByRole('button').map((el) => (el.getAttribute('aria-label') ?? '').toLowerCase())
  expect(labels.filter((l) => l.includes('head') || l.includes('feet') || l.includes('foot'))).toEqual([])
})

// 0007 B-1: AC-1/AC-2: on a narrow viewport the diagram shows one enlarged body at a time with a
// Front/Back switch; wide viewports keep both bodies side by side (the tests above, AC-3).
function stubViewport(narrow: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: narrow,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
}

describe('narrow viewport', () => {
  beforeEach(() => stubViewport(true))
  afterEach(() => vi.unstubAllGlobals())

  const regionNames = () =>
    screen.queryAllByRole('button').map((el) => (el.getAttribute('aria-label') ?? '').toLowerCase())

  test('shows one side at a time, switched with Front/Back', () => {
    const onSelect = vi.fn()
    render(<AnatomyInspector selected="all" onSelect={onSelect} />)

    expect(screen.getByRole('button', { name: 'Front' })).toHaveAttribute('aria-pressed', 'true')
    expect(regionNames()).toContain('chest region')
    expect(regionNames()).not.toContain('glutes region')

    fireEvent.click(screen.getByRole('button', { name: 'Back' }))

    expect(screen.getByRole('button', { name: 'Back' })).toHaveAttribute('aria-pressed', 'true')
    expect(regionNames()).not.toContain('chest region')
    fireEvent.click(screen.getByRole('button', { name: /glutes region/i }))
    expect(onSelect).toHaveBeenCalledWith('glutes')
  })

  test('selecting a back-only muscle while Front is shown flips to Back', () => {
    const { rerender } = render(<AnatomyInspector selected="all" onSelect={() => {}} />)
    expect(regionNames()).not.toContain('hamstrings region')

    rerender(<AnatomyInspector selected="hamstrings" onSelect={() => {}} />)

    expect(screen.getByRole('button', { name: 'Back' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /hamstrings region/i })).toHaveAttribute('aria-pressed', 'true')
  })
})

// 0007 AC-3: wide viewports keep both bodies side by side, so there is no side switch to operate.
test('wide viewport draws both sides with no Front/Back switch', () => {
  stubViewport(false)
  render(<AnatomyInspector selected="all" onSelect={() => {}} />)

  expect(screen.queryByRole('button', { name: 'Front' })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /chest region/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /glutes region/i })).toBeInTheDocument()
  vi.unstubAllGlobals()
})
