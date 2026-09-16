import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

// AC-2 (S-0001.01, design system): the app's screens compose only shared building
// blocks — no page-local duplicate of a shared component. Re-checked here at the
// App level as pages are added, since App is what actually reaches the user.
test('app screen uses only shared design-system components, no raw duplicates', () => {
  const { container } = render(<App />)

  // no raw button/input/select that bypasses the shared component library
  expect(container.querySelectorAll('button:not([data-ds="button"])')).toHaveLength(0)
  expect(container.querySelectorAll('input:not([data-ds="input"])')).toHaveLength(0)
  expect(container.querySelectorAll('select:not([data-ds="select"])')).toHaveLength(0)

  expect(container.querySelector('[data-ds="page-layout"]')).toBeTruthy()
})

test('selecting a goal in the app renders the generated routine', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /core shred/i }))
  expect(screen.getByText('Plank')).toBeInTheDocument()
})
