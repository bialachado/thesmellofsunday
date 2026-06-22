import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import frame1 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset1.png";
import frame2 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset2.png";
import frame3 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset3.png";
import frame4 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset4.png";
import frame5 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset5.png";
import frame6 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset6.png";
import frame7 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset7.png";
import frame8 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset8.png";
import frame9 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset9.png";
import frame10 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset10.png";
import frame11 from "@/imports/visuals/1st minigame - bread and wine/MiniJogo1-Asset11.png";

import plateSound from "@/imports/sounds/1st minigame - plate.mp3";
import wineSound from "@/imports/sounds/1st minigame - wine pouring.mp3";
import chatter from "@/imports/sounds/5th scene - table background noise.wav";

import { playSound, stopSound } from "./audio";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

const frames = [
  frame1,
  frame2,
  frame3,
  frame4,
  frame5,
  frame6,
  frame7,
  frame8,
  frame9,
  frame10,
  frame11,
];

// ORIGINAL PLACEMENTS KEPT EXACTLY
const plateSpots = [
  "left-[24%] top-[15%]", // left top (decorative only)
  "left-[65%] top-[15%]", // right top
  "left-[8%] top-[52%]",  // left middle
  "left-[26%] top-[82%]", // left bottom
  "left-[67%] top-[82%]", // right bottom
  "left-[89%] top-[52%]", // right middle
];

const wineSpots = [
  "left-[18%] top-[61%]", // left bottom wine
  "left-[31%] top-[66%]", // left middle wine
  "left-[60%] top-[34%]", // right top wine
  "left-[71%] top-[66%]", // right bottom wine
];

const sequence = [
  { type: "plate", index: 1 },
  { type: "wine", index: 2},

  { type: "plate", index: 2 },
  { type: "wine", index: 0 },

  { type: "plate", index: 3 },
  { type: "wine", index: 1 },

  { type: "plate", index: 4 },
  { type: "wine", index: 3 },

  { type: "plate", index: 5 },
];

export function Scene3({ onComplete, isPaused = false }: SceneProps) {
  const [step, setStep] = useState(0);

  const current = sequence[step];
  const complete = step >= sequence.length;

  useEffect(() => {
    if (isPaused) return;

    const room = playSound(chatter, {
      loop: true,
      volume: 0.26,
    });

    return () => stopSound(room);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return;
    if (!complete) return;

    const finish = setTimeout(onComplete, 900);
    return () => clearTimeout(finish);
  }, [complete, onComplete, isPaused]);

  const handleAction = (type: "plate" | "wine", index: number) => {
    if (!current) return;

    // Only allow the correct interaction
    if (current.type !== type || current.index !== index) return;

    playSound(type === "plate" ? plateSound : wineSound, {
      volume: 0.65,
    });

    setStep((value) => value + 1);
  };

  return (
    <div className="relative size-full overflow-hidden bg-black">
      <ImageWithFallback
        src={frames[Math.min(step, frames.length - 1)]}
        alt="Sunday lunch table being prepared"
        className="absolute inset-0 size-full object-contain object-center"
      />

      {!complete && current && (
        <>
          {/* PLATE TARGETS */}
          {plateSpots.map((spot, i) => {
            const isActive =
              current.type === "plate" && current.index === i;

            return (
              <motion.button
                key={`plate-${i}`}
                onClick={() => handleAction("plate", i)}
                disabled={!isActive}
                className={`absolute z-10 ${spot} h-[15%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition ${
                  isActive
                    ? "border-[#f0c840]/80 bg-[#f0c840]/15"
                    : "border-transparent opacity-0 pointer-events-none"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0 0 22px rgba(240,200,64,0.45)"
                    : "none",
                }}
                animate={
                  isActive
                    ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 1.15,
                }}
              />
            );
          })}

          {/* WINE TARGETS */}
          {wineSpots.map((spot, i) => {
            const isActive =
              current.type === "wine" && current.index === i;

            return (
              <motion.button
                key={`wine-${i}`}
                onClick={() => handleAction("wine", i)}
                disabled={!isActive}
                className={`absolute z-10 ${spot} h-[15%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition ${
                  isActive
                    ? "border-[#f0c840]/80 bg-[#f0c840]/15"
                    : "border-transparent opacity-0 pointer-events-none"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0 0 22px rgba(240,200,64,0.45)"
                    : "none",
                }}
                animate={
                  isActive
                    ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 1.15,
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
}