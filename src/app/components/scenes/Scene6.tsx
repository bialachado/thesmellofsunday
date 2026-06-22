import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import sceneBg from "@/imports/visuals/5th scene empty.png";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

export function Scene6({ onComplete }: SceneProps) {
  return (
    <div className="relative size-full flex flex-col items-end justify-end overflow-hidden cursor-pointer" onClick={onComplete}>
      <div className="absolute inset-0">
        <ImageWithFallback
          src={sceneBg}
          alt="Sunset over the Portuguese countryside"
          className="w-full h-full object-contain object-center"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="relative z-10 mb-6 mr-6"
      >
        <button
          onClick={onComplete}
          className="text-xl h-10 px-6 rounded-xl bg-[#f0c840] text-[#1a1208] font-bold border-2 border-[#1a1208] hover:bg-[#f5d860] transition-all"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
