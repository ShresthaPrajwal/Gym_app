import { useState } from 'react'
import { Button } from './components'
import { ExerciseLibrary } from './pages/ExerciseLibrary'
import { NutritionPlan } from './pages/NutritionPlan'
import { RoutineBuilder } from './pages/RoutineBuilder'

type Section = 'routine-builder' | 'exercise-library' | 'nutrition-plan'

function App() {
  const [section, setSection] = useState<Section>('routine-builder')

  return (
    <div className="min-h-screen bg-surface">
      <header className="flex items-center gap-xs px-md pt-md pb-sm bg-surface-container-lowest">
        <img src="/logo.svg" alt="" aria-hidden="true" className="h-8 w-8 rounded-lg" />
        <span className="text-headline-sm text-on-surface font-semibold tracking-tight">Apex Fitness</span>
      </header>
      <nav className="flex flex-wrap justify-center gap-sm bg-surface-container-lowest px-md pb-md">
        <Button
          variant={section === 'routine-builder' ? 'primary' : 'secondary'}
          onClick={() => setSection('routine-builder')}
          className="min-h-[44px] flex-col gap-1 px-lg"
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M6.5 6.5h11M6.5 17.5h11M4 12h16M9 4l-2 2M15 4l2 2M9 20l-2-2M15 20l2-2" />
          </svg>
          Routine Builder
        </Button>
        <Button
          variant={section === 'exercise-library' ? 'primary' : 'secondary'}
          onClick={() => setSection('exercise-library')}
          className="min-h-[44px] flex-col gap-1 px-lg"
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          Exercise Library
        </Button>
        <Button
          variant={section === 'nutrition-plan' ? 'primary' : 'secondary'}
          onClick={() => setSection('nutrition-plan')}
          className="min-h-[44px] flex-col gap-1 px-lg"
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M12 2C9 2 6 5 6 9c0 3.5 2.5 6.5 6 8.5 3.5-2 6-5 6-8.5C18 5 15 2 12 2z" />
            <path d="M12 2v18" />
          </svg>
          Nutrition Plan
        </Button>
      </nav>
      {section === 'routine-builder' && <RoutineBuilder />}
      {section === 'exercise-library' && <ExerciseLibrary />}
      {section === 'nutrition-plan' && <NutritionPlan />}
    </div>
  )
}

export default App
