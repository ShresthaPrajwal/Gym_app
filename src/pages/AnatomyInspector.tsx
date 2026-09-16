import { useState } from 'react'
import { Button } from '../components'
import type { MuscleGroup } from '../domain/exerciseFilter'

type View = 'anterior' | 'posterior'
type Region = { muscle: MuscleGroup; label: string; top: string; left: string; width: string; height: string }

// Only regions actually visible from each view are clickable there (e.g. you can't see
// someone's back from the front). Both views share the same selected-muscle highlight.
const ANTERIOR_REGIONS: Region[] = [
  { muscle: 'shoulders', label: 'Shoulders', top: '12%', left: '20%', width: '60%', height: '8%' },
  { muscle: 'chest', label: 'Chest', top: '20%', left: '30%', width: '40%', height: '12%' },
  { muscle: 'arms', label: 'Arms', top: '20%', left: '5%', width: '15%', height: '30%' },
  { muscle: 'core', label: 'Core', top: '32%', left: '32%', width: '36%', height: '15%' },
  { muscle: 'legs', label: 'Legs', top: '47%', left: '30%', width: '40%', height: '40%' },
  { muscle: 'full-body', label: 'Full body', top: '88%', left: '30%', width: '40%', height: '8%' },
]

const POSTERIOR_REGIONS: Region[] = [
  { muscle: 'shoulders', label: 'Shoulders', top: '12%', left: '20%', width: '60%', height: '8%' },
  { muscle: 'back', label: 'Back', top: '20%', left: '30%', width: '40%', height: '25%' },
  { muscle: 'arms', label: 'Arms', top: '20%', left: '5%', width: '15%', height: '30%' },
  { muscle: 'legs', label: 'Legs', top: '47%', left: '30%', width: '40%', height: '40%' },
  { muscle: 'full-body', label: 'Full body', top: '88%', left: '30%', width: '40%', height: '8%' },
]

export function AnatomyInspector({
  selected,
  onSelect,
}: {
  selected: MuscleGroup | 'all'
  onSelect: (muscle: MuscleGroup) => void
}) {
  const [view, setView] = useState<View>('anterior')
  const regions = view === 'anterior' ? ANTERIOR_REGIONS : POSTERIOR_REGIONS

  return (
    <div data-ds="anatomy-inspector" className="flex flex-col gap-sm rounded-md border border-white/10 bg-surface-container-low p-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-display text-label-md font-bold text-white">Bio-Anatomy Inspector</span>
          <span className="font-display text-label-caps uppercase text-on-surface-variant">Vector Kinematics v1</span>
        </div>
        <div className="flex gap-1 rounded bg-surface-container-lowest p-1">
          <Button
            variant="pill"
            aria-pressed={view === 'anterior'}
            onClick={() => setView('anterior')}
            className={view === 'anterior' ? 'bg-surface-container-high text-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}
          >
            ANT
          </Button>
          <Button
            variant="pill"
            aria-pressed={view === 'posterior'}
            onClick={() => setView('posterior')}
            className={view === 'posterior' ? 'bg-surface-container-high text-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}
          >
            POST
          </Button>
        </div>
      </div>

      <div className="relative mx-auto aspect-[2/3] w-full max-w-xs rounded-md border border-white/10 bg-surface-container-lowest">
        <svg aria-hidden="true" viewBox="0 0 100 150" className="absolute inset-0 h-full w-full text-surface-container-highest">
          <circle cx="50" cy="12" r="10" fill="currentColor" />
          <rect x="30" y="24" width="40" height="55" rx="8" fill="currentColor" />
          <rect x="30" y="82" width="40" height="55" rx="6" fill="currentColor" />
        </svg>
        {regions.map((region) => {
          const active = selected === region.muscle
          return (
            <Button
              key={region.muscle}
              variant="pill"
              aria-label={`${region.label} region`}
              aria-pressed={active}
              onClick={() => onSelect(region.muscle)}
              className={`absolute text-[0.6rem] ${active ? 'bg-primary-container/30 text-primary-container' : 'text-on-surface-variant hover:text-on-surface'}`}
              style={{ top: region.top, left: region.left, width: region.width, height: region.height }}
            >
              {region.label}
            </Button>
          )
        })}
      </div>
      <p className="text-body-sm text-on-surface-variant">
        {selected === 'all' ? 'No sector selected.' : `Highlighting: ${selected}`}
      </p>
    </div>
  )
}
