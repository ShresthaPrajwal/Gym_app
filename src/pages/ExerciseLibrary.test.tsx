import { fireEvent, render, screen } from '@testing-library/react'
import { ExerciseLibrary } from './ExerciseLibrary'

// B-2 (e2e): a user opens the Exercise Library page, picks a muscle group via the
// clickable body-map, and sees the filtered list with working video links.
test('clicking a body-map region renders the filtered exercise list with video links', () => {
  render(<ExerciseLibrary />)

  fireEvent.click(screen.getByRole('button', { name: /chest/i }))

  expect(screen.getByText('Bench Press')).toBeInTheDocument()
  const link = screen.getByRole('link', { name: /bench press/i })
  expect(link).toHaveAttribute('href', expect.stringContaining('youtube.com'))

  // only chest exercises are shown
  expect(screen.queryByText('Back Squat')).not.toBeInTheDocument()
})
