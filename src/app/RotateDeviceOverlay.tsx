import { motion, AnimatePresence } from "motion/react";
import { RotateCw } from "lucide-react";

export function RotateDeviceOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center text-center gap-5 px-6">
            
            {/* rotating icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}
            >
              <RotateCw className="w-16 h-16 text-white" />
            </motion.div>

            <h1 className="text-white text-2xl font-bold">
              Rotate your device
            </h1>

            <p className="text-white/70 text-lg max-w-sm">
              For the best experience, play this game in landscape mode.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}