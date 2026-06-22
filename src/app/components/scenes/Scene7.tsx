import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import frame1 from "@/imports/visuals/3rd minigame - washing the dishes/MiniJogo3-Asset1.png";
import frame2 from "@/imports/visuals/3rd minigame - washing the dishes/MiniJogo3-Asset2.png";
import frame3 from "@/imports/visuals/3rd minigame - washing the dishes/MiniJogo3-Asset3.png";
import frame4 from "@/imports/visuals/3rd minigame - washing the dishes/MiniJogo3-Asset4.png";
import frame5 from "@/imports/visuals/3rd minigame - washing the dishes/MiniJogo3-Asset5.png";
import frame6 from "@/imports/visuals/3rd minigame - washing the dishes/MiniJogo3-Asset6.png";

import sponge from "@/imports/visuals/3rd minigame - washing the dishes/sponge.png";

import runningWater from "@/imports/sounds/3rd-minigame-water running.mp3";
import closingWater from "@/imports/sounds/3rd-minigame-closing water.mp3";

import { playSound, stopSound } from "./audio";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

const frames = [frame1, frame2, frame3, frame4, frame5, frame6];
const SCRUBS_PER_DISH = 4;

export function Scene7({ onComplete, isPaused = false }: SceneProps) {
  const [step, setStep] = useState(0);
  const [scrubCount, setScrubCount] = useState(0);

  const runningAudio = useRef<HTMLAudioElement | null>(null);
  const closingAudio = useRef<HTMLAudioElement | null>(null);

  const complete = step >= frames.length - 1;

  useEffect(() => {
    if (isPaused) return;

    return () => {
      stopSound(runningAudio.current);
      stopSound(closingAudio.current);
    };
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return;
    if (!complete) return;

    stopSound(runningAudio.current);

    closingAudio.current = playSound(closingWater, {
      loop: false,
      volume: 0.6,
    });

    const finish = setTimeout(onComplete, 1800);
    return () => clearTimeout(finish);
  }, [complete, onComplete, isPaused]);

  const startRunningWater = () => {
    if (runningAudio.current) return;

    runningAudio.current = playSound(runningWater, {
      loop: true,
      volume: 0.55,
    });
  };

  const wash = () => {
    if (complete) return;

    startRunningWater();

    const newScrubCount = scrubCount + 1;
    setScrubCount(newScrubCount);

    if (newScrubCount >= SCRUBS_PER_DISH) {
      setScrubCount(0);
      setStep((v) => Math.min(v + 1, frames.length - 1));
    }
  };

  return (
    <div className="relative size-full overflow-hidden bg-black">
      {/* INSTANT FRAME SWITCH (NO FADE, NO STACKING) */}
      {frames[step] && (
        <div className="absolute inset-0">
          <ImageWithFallback
            src={frames[step]}
            alt="Dirty dishes being washed"
            className="size-full object-contain object-center"
          />
        </div>
      )}

      {!complete && (
        <motion.button
          aria-label="Scrub the dishes"
          onClick={wash}
          className="absolute inset-0 z-10"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              y: [0, -6, 0],
              filter: [
                "drop-shadow(0 0 0px rgba(240,200,64,0))",
                "drop-shadow(0 0 10px rgba(240,200,64,0.6))",
                "drop-shadow(0 0 0px rgba(240,200,64,0))",
              ],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
          >
            <ImageWithFallback
              src={sponge}
              alt=""
              className="size-full object-contain object-center pointer-events-none"
            />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}