import { useEffect } from 'react'
import { extractVideoId } from '../components/VideoThumbnail'

type Props = {
  name: string
  videoUrl: string
  onClose: () => void
}

export function VideoPlayerModal({ name, videoUrl, onClose }: Props) {
  const videoId = extractVideoId(videoUrl)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} video`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-md"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-3xl flex-col gap-0 overflow-hidden rounded-md border border-white/10 bg-surface-container-low shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-md pt-md pb-sm">
          <h2 className="font-display text-headline-sm text-white">{name}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded text-on-surface-variant transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 16:9 embed */}
        <div className="aspect-video w-full bg-black">
          <iframe
            title={`${name} demo video`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            className="h-full w-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-md py-sm">
          <span className="text-body-sm text-on-surface-variant">Press Esc or click outside to close</span>
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-xs rounded border border-outline-variant bg-white/[0.04] px-md py-sm font-display text-label-md font-bold uppercase tracking-wide text-white transition-colors hover:border-secondary"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-red-500">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" />
            </svg>
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
