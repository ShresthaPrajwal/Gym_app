import type { Exercise } from '../domain/exerciseFilter'

export const EXERCISES: Exercise[] = [
  // chest
  { name: 'Bench Press', targetMuscle: 'chest', videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg' },
  { name: 'Push-up', targetMuscle: 'chest', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
  { name: 'Incline Dumbbell Press', targetMuscle: 'chest', videoUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8' },

  // back
  { name: 'Deadlift', targetMuscle: 'back', videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q' },
  { name: 'Barbell Row', targetMuscle: 'back', videoUrl: 'https://www.youtube.com/watch?v=9efgcAjQe7E' },
  { name: 'Pull-up', targetMuscle: 'back', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },

  // legs
  { name: 'Back Squat', targetMuscle: 'legs', videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
  { name: 'Lunge', targetMuscle: 'legs', videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U' },
  { name: 'Leg Press', targetMuscle: 'legs', videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' },

  // shoulders
  { name: 'Overhead Press', targetMuscle: 'shoulders', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
  { name: 'Lateral Raise', targetMuscle: 'shoulders', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
  { name: 'Face Pull', targetMuscle: 'shoulders', videoUrl: 'https://www.youtube.com/watch?v=rep-qVOkqgk' },

  // arms
  { name: 'Barbell Curl', targetMuscle: 'arms', videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo' },
  { name: 'Tricep Pushdown', targetMuscle: 'arms', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
  { name: 'Hammer Curl', targetMuscle: 'arms', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4' },

  // core
  { name: 'Plank', targetMuscle: 'core', videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c' },
  { name: 'Bicycle Crunch', targetMuscle: 'core', videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8' },
  { name: 'Hanging Leg Raise', targetMuscle: 'core', videoUrl: 'https://www.youtube.com/watch?v=Pr1ieGZ5atk' },

  // full-body
  { name: 'Burpee', targetMuscle: 'full-body', videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU' },
  { name: 'Kettlebell Swing', targetMuscle: 'full-body', videoUrl: 'https://www.youtube.com/watch?v=YSxHifyI6s8' },
  { name: 'Clean and Press', targetMuscle: 'full-body', videoUrl: 'https://www.youtube.com/watch?v=6xwGFyPneu4' },
]
