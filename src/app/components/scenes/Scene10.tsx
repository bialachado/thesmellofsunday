import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import closedDrawer from "@/imports/visuals/5th minigame - isabella's drawer/initial closed drawer.png";
import baseDrawer from "@/imports/visuals/5th minigame - isabella's drawer/MiniJogo5-Base.png";
import camera from "@/imports/visuals/5th minigame - isabella's drawer/MiniJogo5-Câmara.png";
import diary from "@/imports/visuals/5th minigame - isabella's drawer/MiniJogo5-Diário.png";
import nintendo from "@/imports/visuals/5th minigame - isabella's drawer/MiniJogo5-Nintendo.png";
import pencilCup from "@/imports/visuals/5th minigame - isabella's drawer/MiniJogo5-PortaLápis.png";
import finalScene from "@/imports/visuals/7th scene final.png";

import openDrawer from "@/imports/sounds/5th minigame - opening drawer.mp3";
import searchDrawer from "@/imports/sounds/5th minigame - searching through drawer.mp3";

import { playSound, stopSound } from "./audio";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

type Phase = "closed" | "searching" | "found";

const objects = [
  { id: "camera", src: camera, spot: "left-[63%] top-[70%]" },
  { id: "diary", src: diary, spot: "left-[65%] top-[57%]" },
  { id: "nintendo", src: nintendo, spot: "left-[77%] top-[53%]" },
  { id: "pencilCup", src: pencilCup, spot: "left-[72%] top-[57%]" },
];

function ObjectHandle({ id, spot }: { id: string; spot: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "drawer-object",
    item: { id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <motion.div
      ref={drag}
      className={`absolute ${spot} z-30 h-[18%] w-[16%] -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-[#f0c840] bg-[#f0c840]/10`}
      animate={{
        scale: isDragging ? 0.82 : [1, 1.08, 1],
        opacity: isDragging ? 0.35 : [0.7, 1, 0.7],
      }}
      transition={{ repeat: isDragging ? 0 : Infinity, duration: 1.2 }}
      style={{ boxShadow: "0 0 24px rgba(240,200,64,0.4)" }}
    />
  );
}

/**
 * NEW: Flexible drop zone
 */
function DropZone({
  className,
  active,
  onDrop,
}: {
  className: string;
  active: boolean;
  onDrop: (id: string) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "drawer-object",
    drop: (item: { id: string }) => onDrop(item.id),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div
      ref={drop}
      className={`absolute z-20 transition-colors ${className}`}
      style={{
        background: isOver
          ? "rgba(240,200,64,0.25)"
          : active
          ? "rgba(255,255,255,0.04)"
          : "transparent",
        border: isOver ? "1px solid rgba(240,200,64,0.6)" : "none",
      }}
    />
  );
}

export function Scene10({ onComplete, isPaused = false }: SceneProps) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [removed, setRemoved] = useState<Set<string>>(new Set());

  const searchAudioRef = useRef<HTMLAudioElement | null>(null);

  const startSearchSound = () => {
    if (!searchAudioRef.current) {
      searchAudioRef.current = playSound(searchDrawer, {
        loop: true,
        volume: 0.62,
      });
    }
  };

  const stopSearchSound = () => {
    stopSound(searchAudioRef.current);
    searchAudioRef.current = null;
  };

  const open = () => {
    playSound(openDrawer, { volume: 0.75 });
    setPhase("searching");
  };

  const removeObject = (id: string) => {
    startSearchSound();
    setRemoved((current) => new Set(current).add(id));
  };

  useEffect(() => {
    if (phase !== "searching") return;

    if (removed.size === objects.length) {
      stopSearchSound();

      const t = setTimeout(() => setPhase("found"), 2500);
      return () => clearTimeout(t);
    }
  }, [removed.size, phase]);

  useEffect(() => {
    if (isPaused) return;
    if (phase !== "found") return;

    const t = setTimeout(onComplete, 1200);
    return () => clearTimeout(t);
  }, [phase, onComplete, isPaused]);

  return (
    <div className="relative size-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {phase === "closed" && (
          <motion.button
            key="closed"
            onClick={open}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageWithFallback
              src={closedDrawer}
              alt="Closed drawer"
              className="size-full object-contain object-center"
            />
          </motion.button>
        )}

        {phase === "searching" && (
          <motion.div
            key="searching"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageWithFallback
              src={baseDrawer}
              alt="Open drawer"
              className="absolute inset-0 size-full object-contain object-center"
            />

            {objects.map(
              (object) =>
                !removed.has(object.id) && (
                  <ImageWithFallback
                    key={object.id}
                    src={object.src}
                    alt=""
                    className="absolute inset-0 size-full object-contain object-center pointer-events-none"
                  />
                )
            )}

            {/* ✅ BIG LEFT DROP ZONE */}
            <DropZone
              className="left-0 top-0 h-full w-[50%]"
              active={true}
              onDrop={removeObject}
            />

            {/* ✅ SMALL RIGHT DROP ZONE */}
            <DropZone
              className="right-0 top-0 h-full w-[10%]"
              active={true}
              onDrop={removeObject}
            />

            {/* ✅ TOP DROP ZONE */}
            <DropZone
              className="left-0 top-0 h-[25%] w-full"
              active={true}
              onDrop={removeObject}
            />

            {objects.map(
              (object) =>
                !removed.has(object.id) && (
                  <ObjectHandle
                    key={object.id}
                    id={object.id}
                    spot={object.spot}
                  />
                )
            )}
          </motion.div>
        )}

        {phase === "found" && (
          <motion.div
            key="found"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageWithFallback
              src={finalScene}
              alt="Final scene"
              className="size-full object-contain object-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}