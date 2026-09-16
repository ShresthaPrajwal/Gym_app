import type { Goal, RoutineDay } from '../domain/routineGenerator'

export const ROUTINES: Record<Goal, RoutineDay[]> = {
  abs: [
    {
      day: 'Day 1',
      exercises: [
        { name: 'Plank', targetMuscle: 'core', sets: 3, reps: '45s', rest: '30s' },
        { name: 'Bicycle Crunch', targetMuscle: 'core', sets: 3, reps: '20', rest: '30s' },
      ],
    },
    {
      day: 'Day 2',
      exercises: [
        { name: 'Hanging Leg Raise', targetMuscle: 'core', sets: 3, reps: '12', rest: '45s' },
        { name: 'Russian Twist', targetMuscle: 'core', sets: 3, reps: '20', rest: '30s' },
      ],
    },
  ],
  bulk: [
    {
      day: 'Day 1 — Push',
      exercises: [
        { name: 'Bench Press', targetMuscle: 'chest', sets: 5, reps: '5', rest: '2min' },
        { name: 'Overhead Press', targetMuscle: 'shoulders', sets: 4, reps: '6', rest: '90s' },
      ],
    },
    {
      day: 'Day 2 — Pull',
      exercises: [
        { name: 'Deadlift', targetMuscle: 'back', sets: 5, reps: '5', rest: '3min' },
        { name: 'Barbell Row', targetMuscle: 'back', sets: 4, reps: '8', rest: '90s' },
      ],
    },
    {
      day: 'Day 3 — Legs',
      exercises: [
        { name: 'Back Squat', targetMuscle: 'legs', sets: 5, reps: '5', rest: '3min' },
        { name: 'Barbell Curl', targetMuscle: 'arms', sets: 3, reps: '10', rest: '60s' },
      ],
    },
  ],
  'cut-lean': [
    {
      day: 'Day 1',
      exercises: [
        { name: 'Burpees', targetMuscle: 'full-body', sets: 4, reps: '15', rest: '30s' },
        { name: 'Mountain Climbers', targetMuscle: 'core', sets: 4, reps: '30s', rest: '20s' },
      ],
    },
    {
      day: 'Day 2',
      exercises: [
        { name: 'Jump Squats', targetMuscle: 'legs', sets: 4, reps: '15', rest: '30s' },
        { name: 'Kettlebell Swing', targetMuscle: 'full-body', sets: 4, reps: '20', rest: '30s' },
      ],
    },
  ],
  'general-fitness': [
    {
      day: 'Day 1 — Upper',
      exercises: [
        { name: 'Push-up', targetMuscle: 'chest', sets: 3, reps: '12', rest: '60s' },
        { name: 'Dumbbell Row', targetMuscle: 'back', sets: 3, reps: '12', rest: '60s' },
      ],
    },
    {
      day: 'Day 2 — Lower',
      exercises: [
        { name: 'Goblet Squat', targetMuscle: 'legs', sets: 3, reps: '12', rest: '60s' },
        { name: 'Plank', targetMuscle: 'core', sets: 3, reps: '30s', rest: '30s' },
      ],
    },
    {
      day: 'Day 3 — Full Body',
      exercises: [
        { name: 'Dumbbell Shoulder Press', targetMuscle: 'shoulders', sets: 3, reps: '10', rest: '60s' },
        { name: 'Bodyweight Circuit', targetMuscle: 'full-body', sets: 3, reps: '10', rest: '45s' },
      ],
    },
  ],
  strength: [
    {
      day: 'Day 1',
      exercises: [
        { name: 'Back Squat', targetMuscle: 'legs', sets: 5, reps: '3', rest: '3min' },
        { name: 'Bench Press', targetMuscle: 'chest', sets: 5, reps: '3', rest: '3min' },
      ],
    },
    {
      day: 'Day 2',
      exercises: [
        { name: 'Deadlift', targetMuscle: 'back', sets: 5, reps: '3', rest: '3min' },
        { name: 'Overhead Press', targetMuscle: 'shoulders', sets: 5, reps: '3', rest: '3min' },
      ],
    },
  ],
  endurance: [
    {
      day: 'Day 1',
      exercises: [
        { name: 'Rowing Intervals', targetMuscle: 'full-body', sets: 6, reps: '2min', rest: '1min' },
        { name: 'Bodyweight Squats', targetMuscle: 'legs', sets: 3, reps: '20', rest: '30s' },
      ],
    },
    {
      day: 'Day 2',
      exercises: [
        { name: 'Circuit Run', targetMuscle: 'full-body', sets: 4, reps: '5min', rest: '1min' },
        { name: 'Plank', targetMuscle: 'core', sets: 3, reps: '45s', rest: '30s' },
      ],
    },
  ],
}
