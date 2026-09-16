import { render } from '@testing-library/react'
import App from './App'

// B-1 (tracer bullet): a rendered app screen composes only shared building blocks
// (button, card, input, select, badge, page layout) — no page-local duplicate.
test('placeholder screen renders only shared design-system components', () => {
  const { container } = render(<App />)

  // every shared component marks itself with data-ds — the app screen must actually
  // use each of them, not a page-local, hand-rolled equivalent
  const dsComponents = ['page-layout', 'card', 'button', 'input', 'select', 'badge']
  for (const name of dsComponents) {
    expect(container.querySelector(`[data-ds="${name}"]`)).toBeTruthy()
  }

  // no raw button/input/select that bypasses the shared component library
  expect(container.querySelectorAll('button:not([data-ds="button"])')).toHaveLength(0)
  expect(container.querySelectorAll('input:not([data-ds="input"])')).toHaveLength(0)
  expect(container.querySelectorAll('select:not([data-ds="select"])')).toHaveLength(0)
})
