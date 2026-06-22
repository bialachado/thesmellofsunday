import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import frame4 from "@/imports/visuals/5th scene/Sala-Cena1 4 1.png";
import frame5 from "@/imports/visuals/5th scene/Sala-Cena1 5 1.png";
import frame6 from "@/imports/visuals/5th scene/Sala-Cena1 6 1.png";
import frame7 from "@/imports/visuals/5th scene/Sala-Cena1 7 1.png";
import frame8 from "@/imports/visuals/5th scene/Sala-Cena1 8 1.png";
import frame9 from "@/imports/visuals/5th scene/Sala-Cena1 9 1.png";
import frame10 from "@/imports/visuals/5th scene/Sala-Cena1 10 1.png";
import frame11 from "@/imports/visuals/5th scene/Sala-Cena1 11 1.png";
import frame12 from "@/imports/visuals/5th scene/Sala-Cena1 12 1.png";
import tableAmbience from "@/imports/sounds/5th scene - table background noise.wav";
import { playSound, stopSound } from "./audio";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

const frames = [frame4, frame9, frame11, frame8, frame7, frame10, frame6, frame5, frame12];

export function Scene5({ onComplete, isPaused = false }: SceneProps) {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const complete = index >= frames.length - 1;

  useEffect(() => {
    if (isPaused) return;
    if (complete) return;
    const room = playSound(tableAmbience, { loop: true, volume: 0.36 });
    const interval = setInterval(() => {
      setIndex((value) => {
        if (value >= frames.length - 1) {
          clearInterval(interval);
          return value;
        }
        setVisibleCount((count) => Math.min(count + 1, frames.length));
        return value + 1;
      });
    }, 2200);
    return () => {
      clearInterval(interval);
      stopSound(room);
    };
  }, [complete, isPaused]);

  useEffect(() => {
    if (isPaused) return;
    if (!complete) return;
    const finish = setTimeout(onComplete, 3200);
    return () => clearTimeout(finish);
  }, [complete, onComplete, isPaused]);

  return (
    <div className="relative size-full overflow-hidden bg-black">
      {frames.slice(0, visibleCount).map((frame, frameIndex) => (
        <motion.div
          key={frame}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: frameIndex <= index ? 1 : 0 }}
          transition={{ duration: 1.8 }}
        >
          <ImageWithFallback src={frame} alt="Sunday afternoon fading through the room" className="size-full object-contain object-center" />
        </motion.div>
      ))}
    </div>
  );
}
