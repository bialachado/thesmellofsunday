export function playSound(src: string, options: { loop?: boolean; volume?: number } = {}) {
  const audio = new Audio(src);
  audio.loop = options.loop ?? false;
  audio.volume = options.volume ?? 0.75;
  void audio.play().catch(() => {
    // Browsers can block autoplay until the first user gesture.
  });
  return audio;
}

export function stopSound(audio?: HTMLAudioElement | null) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}

let persistentAudio: HTMLAudioElement | null = null;
let persistentSrc = "";

export function startPersistentSound(src: string, options: { volume?: number } = {}) {
  if (persistentAudio && persistentSrc === src) {
    if (persistentAudio.paused) {
      void persistentAudio.play().catch(() => {});
    }
    return persistentAudio;
  }

  stopPersistentSound();
  persistentSrc = src;
  persistentAudio = playSound(src, { loop: true, volume: options.volume ?? 0.28 });
  return persistentAudio;
}

export function stopPersistentSound() {
  stopSound(persistentAudio);
  persistentAudio = null;
  persistentSrc = "";
}
