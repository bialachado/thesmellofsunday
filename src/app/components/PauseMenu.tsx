import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Play } from "lucide-react";

import pauseMusic from "@/imports/sounds/pause menu.mp3";
import { startPersistentSound, stopPersistentSound } from "./scenes/audio";

interface PauseMenuProps {
  open: boolean;
  onClose: () => void;
  onGoMenu: () => void;
}

export function PauseMenu({ open, onClose, onGoMenu }: PauseMenuProps) {
  useEffect(() => {
    if (open) {
      startPersistentSound(pauseMusic, { volume: 0.25 });
    } else {
      stopPersistentSound();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center gap-6 bg-[#fffdf5] border-4 border-[#f0c840] rounded-3xl p-8 w-[min(92%,420px)]"
          >
            <div className="flex gap-2">
              <div className="w-3 h-8 bg-black rounded" />
              <div className="w-3 h-8 bg-black rounded" />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={onClose}
                className="h-12 w-full bg-[#f0c840] font-bold rounded-2xl border-2 border-black"
              >
                <Play className="inline mr-2 size-4" />
                Resume
              </button>

              <button
                onClick={onGoMenu}
                className="h-12 w-full bg-white font-bold rounded-2xl border-2 border-black"
              >
                <Home className="inline mr-2 size-4" />
                Main Menu
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}