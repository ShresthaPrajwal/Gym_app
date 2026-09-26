import { useState } from 'react'
import { ExerciseLibrary } from './pages/ExerciseLibrary'
import { NutritionPlan } from './pages/NutritionPlan'
import { RoutineBuilder } from './pages/RoutineBuilder'

type Section = 'routine-builder' | 'exercise-library' | 'nutrition-plan'

const TABS: { id: Section; label: string; icon: React.ReactNode }[] = [
  {
    id: 'routine-builder',
    label: 'Routine Builder',
    icon: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <path d="M6.5 6.5h11M6.5 17.5h11M4 12h16M9 4l-2 2M15 4l2 2M9 20l-2-2M15 20l2-2" />
      </svg>
    ),
  },
  {
    id: 'exercise-library',
    label: 'Exercise Library',
    icon: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: 'nutrition-plan',
    label: 'Nutrition Plan',
    icon: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <path d="M12 2C9 2 6 5 6 9c0 3.5 2.5 6.5 6 8.5 3.5-2 6-5 6-8.5C18 5 15 2 12 2z" />
        <path d="M12 2v18" />
      </svg>
    ),
  },
]

function App() {
  const [section, setSection] = useState<Section>('routine-builder')

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-20 flex items-center gap-sm border-b border-white/[0.06] bg-surface-container-lowest/95 px-md py-sm backdrop-blur-sm">
        <img src="/logo.png" alt="" aria-hidden="true" className="h-7 w-7 rounded-lg object-contain" />
        <span className="font-display text-headline-sm font-semibold tracking-tight text-on-surface">Apex Fitness</span>
      </header>
      <nav className="flex border-b border-white/[0.06] bg-surface-container-lowest/95" aria-label="Main navigation">
        {TABS.map((tab) => {
          const active = section === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setSection(tab.id)}
              aria-current={active ? 'page' : undefined}
              className={`relative flex min-h-[44px] flex-1 items-center justify-center gap-xs px-md py-sm font-display text-label-md font-bold transition-colors duration-150 ${
                active
                  ? 'text-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-container" />
              )}
            </button>
          )
        })}
      </nav>
      {section === 'routine-builder' && <RoutineBuilder />}
      {section === 'exercise-library' && <ExerciseLibrary />}
      {section === 'nutrition-plan' && <NutritionPlan />}
    </div>
  )
}

export default App
