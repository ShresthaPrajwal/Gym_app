import { fireEvent, render, screen } from '@testing-library/react'
import { AnatomyInspector } from './AnatomyInspector'

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
