import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import empty from "@/imports/visuals/7th scene empty.png";
import initial from "@/imports/visuals/7th scene initial.png";
import final from "@/imports/visuals/7th scene final.png";

import { playSound, stopSound } from "./audio";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

const frames = [empty, initial, final];

export function ScenePianoIntro({ onComplete, isPaused = false }: SceneProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const revealOne = setTimeout(() => setIndex(1), 2200);
    const revealTwo = setTimeout(() => setIndex(2), 5000);
    const finish = setTimeout(onComplete, 8200);
    return () => {
      clearTimeout(revealOne);
      clearTimeout(revealTwo);
      clearTimeout(finish);
    };
  }, [onComplete, isPaused]);

  return (
    <div className="relative size-full overflow-hidden bg-black">
      {frames.map((frame, frameIndex) => (
        <motion.div
          key={frame}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: frameIndex <= index ? 1 : 0 }}
          transition={{ duration: 1.6 }}
        >
          <ImageWithFallback src={frame} alt="Isabella surrounded by family voices after the piano" className="size-full object-contain object-center" />
        </motion.div>
      ))}
    </div>
  );
}
