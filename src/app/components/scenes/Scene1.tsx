import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import emptyRoom from "@/imports/visuals/1st scene empty.png";
import familyRoom from "@/imports/visuals/1st scene with people.png";
import birds from "@/imports/sounds/1st scene.mp3";
import { playSound, stopSound } from "./audio";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

export function Scene1({ onComplete, isPaused = false }: SceneProps) {
  const [withPeople, setWithPeople] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const audio = playSound(birds, { loop: true, volume: 0.55 });
    const reveal = setTimeout(() => setWithPeople(true), 1800);
    const finish = setTimeout(onComplete, 6500);
    return () => {
      clearTimeout(reveal);
      clearTimeout(finish);
      stopSound(audio);
    };
  }, [onComplete, isPaused]);

  return (
    <div className="relative size-full overflow-hidden bg-black">
      <ImageWithFallback src={emptyRoom} alt="Quiet Sunday room before lunch" className="absolute inset-0 size-full object-contain object-center" />
      <AnimatePresence>
        {withPeople && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6 }}
          >
            <ImageWithFallback src={familyRoom} alt="Family gathered for Sunday lunch" className="size-full object-contain object-center" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
