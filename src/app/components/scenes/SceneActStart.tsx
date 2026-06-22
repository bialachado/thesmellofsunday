import { useEffect } from "react";
import { motion } from "motion/react";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

const TOTAL_SCENES = 10;
const titleFont = { fontFamily: "'Another Shabby', 'Cooper BT', Georgia, serif" };
const textFont = { fontFamily: "'Cooper BT', Georgia, serif" };

export function SceneActStart({ onComplete, isPaused = false }: SceneProps) {
  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(onComplete, 5000);
    return () => clearTimeout(t);
  }, [onComplete, isPaused]);

  return (
    <div
      className="size-full flex flex-col items-center justify-center gap-10 px-6"
      style={{ background: "#0e0c08" }}
    >
      {/* TITLE */}
      <motion.h1
        style={titleFont}
        className="text-[#f0e8d4] font-bold leading-none text-center text-[clamp(3rem,8vw,6rem)]"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
      >
        Act I
      </motion.h1>

      {/* TIMELINE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex flex-col items-center gap-4 w-full max-w-[min(640px,90vw)]"
      >
        {/* track */}
        <div className="relative flex items-center w-full h-1">
          {/* background */}
          <div className="absolute inset-0 rounded-full bg-[#f0e8d420]" />

          {/* progress (only first segment filled) */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(1 / TOTAL_SCENES) * 100}%` }}
            transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
            className="absolute left-0 top-0 h-full rounded-full bg-[#f0c840]"
          />

          {/* dots */}
          {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.4 + i * 0.06,
                duration: 0.3,
                type: "spring",
              }}
              className="absolute rounded-full"
              style={{
                left: `${(i / (TOTAL_SCENES - 1)) * 100}%`,
                transform: "translateX(-50%)",
                width: i === 0 ? 14 : 8,
                height: i === 0 ? 14 : 8,
                background: i === 0 ? "#f0c840" : "#f0e8d420",
                border:
                  i === 0
                    ? "2px solid #f0c840"
                    : "1.5px solid #f0e8d440",
                boxShadow:
                  i === 0 ? "0 0 10px 3px rgba(240,200,64,0.5)" : "none",
              }}
            />
          ))}
        </div>

        {/* label */}
        <motion.div
          className="w-full flex justify-start"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div
            style={textFont}
            className="text-[#f0c840] whitespace-nowrap text-[clamp(0.75rem,1.5vw,1rem)]"
          >
            beginning
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}