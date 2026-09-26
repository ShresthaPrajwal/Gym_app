import { fireEvent, render, screen, within } from '@testing-library/react'
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

// 0008 B-1: AC-1: the selectors are named chip groups that report which option is chosen.
test('level, days and equipment are named selector groups that report the chosen option', () => {
  render(<RoutineBuilder />)

  const level = screen.getByRole('group', { name: 'Level' })
  expect(screen.getByRole('group', { name: 'Days per week' })).toBeInTheDocument()
  expect(screen.getByRole('group', { name: 'Equipment' })).toBeInTheDocument()

  expect(within(level).getByRole('button', { name: 'Intermediate' })).toHaveAttribute('aria-pressed', 'true')
  fireEvent.click(within(level).getByRole('button', { name: 'Beginner' }))
  expect(within(level).getByRole('button', { name: 'Beginner' })).toHaveAttribute('aria-pressed', 'true')
  expect(within(level).getByRole('button', { name: 'Intermediate' })).toHaveAttribute('aria-pressed', 'false')
})
