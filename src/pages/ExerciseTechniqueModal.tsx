import { Button, VideoThumbnail } from '../components'
import { buildTechniqueSearchUrl, type Exercise } from '../domain/exerciseFilter'

export function ExerciseTechniqueModal({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${exercise.name} technique`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-md"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-lg flex-col gap-sm rounded-md border border-white/10 bg-surface-container-low p-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-headline-md text-white">{exercise.name}</h2>
          <Button variant="secondary" aria-label="Close" onClick={onClose}>
            ×
          </Button>
        </div>

        <VideoThumbnail name={exercise.name} videoUrl={exercise.videoUrl} className="h-40 w-full" />

        <div>
          <span className="font-display text-label-caps uppercase text-on-surface-variant">Execution Checkpoints</span>
          <ol className="mt-1 list-decimal space-y-1 pl-md text-body-sm text-on-surface-variant">
            {exercise.cues.map((cue) => (
              <li key={cue}>{cue}</li>
            ))}
          </ol>
        </div>

        <a
          href={buildTechniqueSearchUrl(exercise.name)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded bg-white/[0.04] border border-outline-variant px-md py-sm font-display text-label-md font-bold uppercase tracking-wide text-white hover:border-secondary"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  )
}
