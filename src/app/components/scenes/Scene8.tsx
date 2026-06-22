import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import emptyRoom from "@/imports/visuals/5th scene empty.png";
import familyRoom from "@/imports/visuals/5th scene with people.png";

import pianoAmbience from "@/imports/sounds/piano background.wav";
import tvAmbience from "@/imports/sounds/tv background.wav";

import { playSound, stopSound } from "./audio";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

/** smooth fade helper */
function fadeAudio(
  audio: HTMLAudioElement | null,
  targetVolume: number,
  duration = 1200
) {
  if (!audio) return;

  const start = audio.volume;
  const diff = targetVolume - start;
  const steps = 30;
  const stepTime = duration / steps;

  let i = 0;

  const interval = setInterval(() => {
    i++;
    const progress = i / steps;
    audio.volume = start + diff * progress;

    if (i >= steps) {
      clearInterval(interval);
      audio.volume = targetVolume;
    }
  }, stepTime);
}

/** get WAV duration safely */
function getAudioDuration(src: string): Promise<number> {
  return new Promise((resolve) => {
    const audio = new Audio(src);
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration || 6.5);
    });
  });
}

export function Scene8({ onComplete, isPaused = false }: SceneProps) {
  const [withPeople, setWithPeople] = useState(false);

  const pianoRef = useRef<HTMLAudioElement | null>(null);
  const tvRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPaused) return;

    let cancelled = false;

    async function startAudio() {
      const duration = await getAudioDuration(pianoAmbience);

      if (cancelled) return;

      // 🎧 start both layers
      pianoRef.current = playSound(pianoAmbience, {
        loop: true,
        volume: 0.7,
      });

      tvRef.current = playSound(tvAmbience, {
        loop: true,
        volume: 0.0,
      });

      // ensure initial mix
      fadeAudio(pianoRef.current, 0.7, 800);
      fadeAudio(tvRef.current, 0.0, 800);

      // trigger people after cinematic delay
      const revealDelay = duration * 0.35 * 1000;

      const t1 = setTimeout(() => {
        setWithPeople(true);

        // 🎚 TV becomes louder when people appear
        fadeAudio(pianoRef.current, 0.35, 1600);
        fadeAudio(tvRef.current, 0.85, 1600);
      }, revealDelay);

      // end scene synced to audio
      const t2 = setTimeout(() => {
        fadeAudio(pianoRef.current, 0, 1200);
        fadeAudio(tvRef.current, 0, 1200);

        setTimeout(() => {
          stopSound(pianoRef.current);
          stopSound(tvRef.current);
          onComplete();
        }, 1300);
      }, duration * 1000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    startAudio();

    return () => {
      cancelled = true;
      stopSound(pianoRef.current);
      stopSound(tvRef.current);
    };
  }, [onComplete, isPaused]);

  return (
    <div className="relative size-full overflow-hidden bg-black">
      {/* base room */}
      <ImageWithFallback
        src={emptyRoom}
        alt="Quiet Sunday room before lunch"
        className="absolute inset-0 size-full object-contain object-center"
      />

      {/* people appear */}
      <AnimatePresence>
        {withPeople && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
          >
            <ImageWithFallback
              src={familyRoom}
              alt="Family gathered for Sunday lunch"
              className="size-full object-contain object-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}