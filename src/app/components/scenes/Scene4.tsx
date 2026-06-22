import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import fries1 from "@/imports/visuals/2nd minigame - french fries/MiniJogo5-1.png";
import fries2 from "@/imports/visuals/2nd minigame - french fries/MiniJogo5-2.png";
import fries3 from "@/imports/visuals/2nd minigame - french fries/MiniJogo5-3.png";
import fries4 from "@/imports/visuals/2nd minigame - french fries/MiniJogo5-4.png";
import fries5 from "@/imports/visuals/2nd minigame - french fries/MiniJogo5-5.png";
import chatter from "@/imports/sounds/5th scene - table background noise.wav";
import { playSound, stopSound } from "./audio";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

const frames = [fries1, fries5, fries4, fries2, fries3];

export function Scene4({ onComplete, isPaused = false }: SceneProps) {
  const [frame, setFrame] = useState(0);
  const complete = frame >= frames.length - 1;

  useEffect(() => {
    if (isPaused) return;
    const room = playSound(chatter, { loop: true, volume: 0.48 });
    return () => stopSound(room);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return;
    if (!complete) return;
    const finish = setTimeout(onComplete, 1450);
    return () => clearTimeout(finish);
  }, [complete, onComplete, isPaused]);

  return (
    <div className="relative size-full overflow-hidden bg-black">
      <ImageWithFallback src={frames[frame]} alt="Hands reaching for french fries at Sunday lunch" className="absolute inset-0 size-full object-contain object-center" />
      {!complete && (
        <motion.button
          aria-label="Reach for the french fries"
          onClick={() => setFrame((value) => Math.min(value + 1, frames.length - 1))}
          className="absolute left-1/2 top-1/2 z-10 h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f0c840]/80 bg-[#f0c840]/10"
          animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
        >
          <span className="sr-only">Reach</span>
        </motion.button>
      )}
    </div>
  );
}
