import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import emptyKitchen from "@/imports/visuals/2nd scene empty.png";
import busyKitchen from "@/imports/visuals/2nd scene with people.png";
import knife from "@/imports/sounds/2nd scene - 1 .mp3";
import pots from "@/imports/sounds/2nd scene - 2.mp3";
import simmer from "@/imports/sounds/2nd scene - 3.mp3";
import { playSound, stopSound } from "./audio";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

export function Scene2({ onComplete, isPaused = false }: SceneProps) {
  const [withPeople, setWithPeople] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const sounds = [
      playSound(knife, { loop: true, volume: 0.38 }),
      playSound(pots, { loop: true, volume: 0.34 }),
      playSound(simmer, { loop: true, volume: 0.28 }),
    ];
    const reveal = setTimeout(() => setWithPeople(true), 2400);
    const finish = setTimeout(onComplete, 9800);
    return () => {
      clearTimeout(reveal);
      clearTimeout(finish);
      sounds.forEach(stopSound);
    };
  }, [onComplete, isPaused]);

  return (
    <div className="relative size-full overflow-hidden bg-black">
      <ImageWithFallback src={emptyKitchen} alt="Kitchen before Isabella's mother enters" className="absolute inset-0 size-full object-contain object-center" />
      <AnimatePresence>
        {withPeople && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2 }}
          >
            <ImageWithFallback src={busyKitchen} alt="Isabella's mother preparing Sunday lunch" className="size-full object-contain object-center" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
