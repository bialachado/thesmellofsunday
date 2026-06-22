import { useEffect } from "react";
import { motion } from "motion/react";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

const TOTAL_SCENES = 10;
const titleFont = { fontFamily: "'Another Shabby', 'Cooper BT', Georgia, serif" };
const textFont = { fontFamily: "'Cooper BT', Georgia, serif" };

export function SceneActEnd({ onComplete, isPaused = false }: SceneProps) {
  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(onComplete, 7000);
    return () => clearTimeout(t);
  }, [onComplete, isPaused]);

  return (
    <div
      className="size-full flex flex-col items-center justify-center gap-10 px-6"
      style={{ background: "#0e0c08" }}
    >
      {/* ACT TITLE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h1
          style={titleFont}
          className="text-[#f0e8d4] font-bold leading-none text-[clamp(3rem,8vw,6rem)]"
        >
          Act I
        </h1>

        {/* underline */}
        <div
          className="relative flex items-center justify-center w-[clamp(120px,30vw,260px)] h-[6px]"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.6, ease: "easeInOut" }}
            style={{
              width: "100%",
              height: 3,
              background: "#f0c840",
              borderRadius: 2,
              transformOrigin: "left",
            }}
          />
        </div>

        <motion.p
          style={textFont}
          className="text-[#f0c840] tracking-widest mt-1 text-[clamp(1rem,2.5vw,1.75rem)]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.7 }}
        >
          end
        </motion.p>
      </motion.div>

      {/* TIMELINE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="flex flex-col items-center gap-4 w-full max-w-[min(640px,90vw)]"
      >
        {/* track */}
        <div className="relative flex items-center w-full h-1">
          <div className="absolute inset-0 rounded-full bg-[#f0e8d420]" />

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.4, duration: 1.4, ease: "easeInOut" }}
            className="absolute left-0 top-0 h-full rounded-full bg-[#f0c840]"
          />

          {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.6, background: "#f0e8d420" }}
              animate={{ scale: 1, background: "#f0c840" }}
              transition={{
                delay: 1.4 + (i / TOTAL_SCENES) * 1.1,
                duration: 0.35,
                type: "spring",
              }}
              className="absolute rounded-full"
              style={{
                left: `${(i / (TOTAL_SCENES - 1)) * 100}%`,
                transform: "translateX(-50%)",
                width: i === TOTAL_SCENES - 1 ? 14 : 8,
                height: i === TOTAL_SCENES - 1 ? 14 : 8,
                border:
                  i === TOTAL_SCENES - 1 ? "2px solid #f0c840" : "none",
                boxShadow:
                  i === TOTAL_SCENES - 1
                    ? "0 0 14px 4px rgba(240,200,64,0.6)"
                    : "none",
              }}
            />
          ))}
        </div>

        {/* label */}
        <motion.div
          className="w-full flex justify-end"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.5 }}
        >
          <div
            style={textFont}
            className="text-[#f0c840] whitespace-nowrap text-[clamp(0.75rem,1.5vw,1rem)]"
          >
            end of act I
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}