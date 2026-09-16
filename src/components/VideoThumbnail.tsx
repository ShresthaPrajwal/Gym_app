import { useState } from 'react'
import { Button } from './Button'

// Extracts the YouTube video ID from a `?v=` watch URL — the only URL shape the app's
// exercise data uses (see src/data/exercises.ts).
function extractVideoId(videoUrl: string): string {
  try {
    return new URL(videoUrl).searchParams.get('v') ?? ''
  } catch {
    return ''
  }
}

type VideoThumbnailProps = {
  name: string
  videoUrl: string
  className?: string
}

export function VideoThumbnail({ name, videoUrl, className = '' }: VideoThumbnailProps) {
  const [playing, setPlaying] = useState(false)
  const videoId = extractVideoId(videoUrl)

  if (playing) {
    return (
      <iframe
        title={`${name} demo video`}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        className={`h-20 w-32 rounded ${className}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    )
  }

  return (
    <Button
      variant="pill"
      aria-label={`Play ${name} demo`}
      onClick={() => setPlaying(true)}
      className={`overflow-hidden p-0 ${className}`}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={`${name} demo thumbnail`}
        className="h-20 w-32 object-cover"
      />
    </Button>
  )
}
