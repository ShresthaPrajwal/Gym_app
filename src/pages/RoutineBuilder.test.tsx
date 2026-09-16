import { fireEvent, render, screen } from '@testing-library/react'
import { RoutineBuilder } from './RoutineBuilder'

// B-3 (e2e): a user picks threshold/cadence/hardware, then a target, sees the full
// 7-day plan (rest days included), drills into a training day, and plays a video.
test('selecting threshold/cadence/hardware then a target renders the full week and lets a user drill into a day and play a video', () => {
  render(<RoutineBuilder />)

  fireEvent.click(screen.getByRole('button', { name: 'Beginner' }))
  fireEvent.click(screen.getByRole('button', { name: '3 Days' }))
  fireEvent.click(screen.getByRole('button', { name: 'Bodyweight/Home' }))
  fireEvent.click(screen.getByRole('button', { name: /core shred/i }))

  // full 7-day week, rest days included and clearly labeled
  expect(screen.getAllByRole('button', { name: /^Day \d/ }).length).toBe(7)
  expect(screen.getAllByText(/Rest & Recovery/i).length).toBeGreaterThan(0)

  // drill into a training day
  fireEvent.click(screen.getByRole('button', { name: /Day 1 —/i }))
  expect(screen.getByText('Plank')).toBeInTheDocument()

  // play a video in place
  const thumbnail = screen.getByRole('button', { name: /play plank demo/i })
  fireEvent.click(thumbnail)
  expect(screen.getByTitle(/plank demo video/i)).toBeInTheDocument()
})
