import { useState, type ReactNode } from 'react'
import { Button } from './components'
import { ExerciseLibrary } from './pages/ExerciseLibrary'
import { NutritionPlan } from './pages/NutritionPlan'
import { RoutineBuilder } from './pages/RoutineBuilder'

type Section = 'routine-builder' | 'exercise-library' | 'nutrition-plan'

const TABS: { id: Section; label: string; short: string; icon: ReactNode }[] = [
  {
    id: 'routine-builder',
    label: 'Routine Builder',
    short: 'Routine',
    icon: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
        <path d="M6.5 6.5h11M6.5 17.5h11M4 12h16M9 4l-2 2M15 4l2 2M9 20l-2-2M15 20l2-2" />
      </svg>
    ),
  },
  {
    id: 'exercise-library',
    label: 'Exercise Library',
    short: 'Library',
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
    short: 'Nutrition',
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
    // bottom padding keeps content clear of the fixed phone tab bar
    <div className="min-h-screen bg-surface pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <header className="sticky top-0 z-20 flex items-center gap-sm border-b border-white/[0.06] bg-surface-container-lowest/95 px-md py-sm backdrop-blur-sm">
        <img src="/logo.png" alt="" aria-hidden="true" className="h-7 w-7 rounded-lg object-contain" />
        <span className="font-display text-headline-sm font-semibold tracking-tight text-on-surface">Apex Fitness</span>
      </header>
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-white/[0.06] bg-surface-container-lowest/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:static md:border-b md:border-t-0 md:pb-0 md:backdrop-blur-none"
      >
        {TABS.map((tab) => {
          const active = section === tab.id
          return (
            <Button
              key={tab.id}
              variant="pill"
              onClick={() => {
                setSection(tab.id)
                window.scrollTo({ top: 0 })
              }}
              aria-current={active ? 'page' : undefined}
              className={`relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 px-sm font-display font-bold transition-colors duration-150 md:min-h-[44px] md:flex-row md:gap-xs md:px-md ${
                active
                  ? 'text-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.icon}
              <span className="md:hidden">{tab.short}</span>
              <span className="hidden md:inline">{tab.label}</span>
              {active && (
                <span className="absolute inset-x-sm top-0 h-0.5 bg-primary-container md:inset-x-0 md:bottom-0 md:top-auto" />
              )}
            </Button>
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
