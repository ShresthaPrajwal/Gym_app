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
      <nav className="flex flex-wrap justify-center gap-sm bg-surface-container-lowest p-md">
        <Button
          variant={section === 'routine-builder' ? 'primary' : 'secondary'}
          onClick={() => setSection('routine-builder')}
          className="min-h-[44px]"
        >
          Routine Builder
        </Button>
        <Button
          variant={section === 'exercise-library' ? 'primary' : 'secondary'}
          onClick={() => setSection('exercise-library')}
          className="min-h-[44px]"
        >
          Exercise Library
        </Button>
        <Button
          variant={section === 'nutrition-plan' ? 'primary' : 'secondary'}
          onClick={() => setSection('nutrition-plan')}
          className="min-h-[44px]"
        >
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
