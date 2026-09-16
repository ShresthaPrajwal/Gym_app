import { Button } from '../components'
import type { MuscleGroup } from '../domain/exerciseFilter'

const REGIONS: { muscle: MuscleGroup; label: string; top: string; left: string; width: string; height: string }[] = [
  { muscle: 'shoulders', label: 'Shoulders', top: '12%', left: '20%', width: '60%', height: '8%' },
  { muscle: 'chest', label: 'Chest', top: '20%', left: '30%', width: '40%', height: '12%' },
  { muscle: 'arms', label: 'Arms', top: '20%', left: '5%', width: '15%', height: '30%' },
  { muscle: 'core', label: 'Core', top: '32%', left: '32%', width: '36%', height: '15%' },
  { muscle: 'back', label: 'Back', top: '20%', left: '80%', width: '15%', height: '30%' },
  { muscle: 'legs', label: 'Legs', top: '47%', left: '30%', width: '40%', height: '40%' },
  { muscle: 'full-body', label: 'Full body', top: '88%', left: '30%', width: '40%', height: '8%' },
]

export function BodyMap({ onSelect }: { onSelect: (muscle: MuscleGroup) => void }) {
  return (
    <div
      data-ds="body-map"
      className="relative mx-auto aspect-[2/3] w-full max-w-xs rounded-lg border border-slate-200 bg-slate-50"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 150"
        className="absolute inset-0 h-full w-full text-slate-300"
      >
        <circle cx="50" cy="12" r="10" fill="currentColor" />
        <rect x="30" y="24" width="40" height="55" rx="8" fill="currentColor" />
        <rect x="30" y="82" width="40" height="55" rx="6" fill="currentColor" />
      </svg>
      {REGIONS.map((region) => (
        <Button
          key={region.muscle}
          variant="ghost"
          aria-label={region.label}
          onClick={() => onSelect(region.muscle)}
          className="absolute text-[0.6rem]"
          style={{ top: region.top, left: region.left, width: region.width, height: region.height }}
        >
          {region.label}
        </Button>
      ))}
    </div>
  )
}
