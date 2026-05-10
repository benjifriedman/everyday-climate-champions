export interface AudioEpisode {
  title: string;
  audioUrl: string;
  slug: string;
}

export interface AudioPlayerContextValue {
  currentEpisode: AudioEpisode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  error: string | null;
  play: (episode: AudioEpisode) => void;
  pause: () => void;
  resume: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}
