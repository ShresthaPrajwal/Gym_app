// Handles both ?v= watch URLs and /shorts/<id> URLs
export function extractVideoId(videoUrl: string): string {
  try {
    const url = new URL(videoUrl)
    if (url.pathname.includes('/shorts/')) return url.pathname.split('/shorts/')[1].split('/')[0]
    return url.searchParams.get('v') ?? ''
  } catch {
    return ''
  }
}

type VideoThumbnailProps = {
  name: string
  videoUrl: string
  onPlay?: () => void
  className?: string
}

export function VideoThumbnail({ name, videoUrl, onPlay, className = '' }: VideoThumbnailProps) {
  const videoId = extractVideoId(videoUrl)

  return (
    <button
      type="button"
      aria-label={`Play ${name} demo`}
      onClick={onPlay}
      className={`group relative overflow-hidden rounded bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary ${className}`}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={`${name} demo thumbnail`}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* dark scrim */}
      <span className="absolute inset-0 bg-black/30 transition-opacity duration-200 group-hover:bg-black/10" />
      {/* play button */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container shadow-lg transition-transform duration-200 group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-0.5 text-surface">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  )
}
