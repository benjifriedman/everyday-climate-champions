'use client';

import { useAudioPlayer } from '@/components/AudioPlayerProvider';

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function PersistentAudioPlayer() {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    volume,
    error,
    pause,
    resume,
    seek,
    setVolume,
  } = useAudioPlayer();

  if (!currentEpisode) return null;

  return (
    <div
      role="region"
      aria-label="Audio player"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-ecc-warm-200 bg-white/95 shadow-lg backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Episode title */}
        <span className="hidden truncate text-sm font-medium sm:block sm:max-w-[200px]">
          {currentEpisode.title}
        </span>

        {/* Play/Pause */}
        <button
          onClick={isPlaying ? pause : resume}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          disabled={!!error}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ecc-green-600 text-white transition-colors hover:bg-ecc-green-700 disabled:opacity-50"
        >
          {isPlaying ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Error message */}
        {error ? (
          <span className="text-sm text-red-600">{error}</span>
        ) : (
          <>
            {/* Current time */}
            <span className="min-w-[3ch] text-xs tabular-nums text-foreground/70">
              {formatTime(currentTime)}
            </span>

            {/* Seek bar */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek"
              className="h-2 flex-1 cursor-pointer accent-ecc-green-600"
            />

            {/* Duration */}
            <span className="min-w-[3ch] text-xs tabular-nums text-foreground/70">
              {formatTime(duration)}
            </span>

            {/* Volume control */}
            <label className="hidden items-center gap-2 sm:flex">
              <svg className="h-4 w-4 text-foreground/60" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Volume"
                className="h-2 w-20 cursor-pointer accent-ecc-green-600"
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
}
