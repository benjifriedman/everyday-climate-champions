'use client';

import { useAudioPlayer } from '@/components/AudioPlayerProvider';

interface PlayButtonProps {
  episode: {
    title: string;
    audioUrl: string;
    slug: string;
  };
}

export default function PlayButton({ episode }: PlayButtonProps) {
  const { play } = useAudioPlayer();

  return (
    <button
      onClick={() => play(episode)}
      className="inline-flex items-center gap-2 rounded-full bg-ecc-green-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-ecc-green-700 focus:outline-none focus:ring-2 focus:ring-ecc-green-500 focus:ring-offset-2 min-h-[44px] min-w-[44px]"
      aria-label={`Listen to ${episode.title}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
          clipRule="evenodd"
        />
      </svg>
      Listen Now
    </button>
  );
}
