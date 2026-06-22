import { useNavigate } from "react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, MousePointer2, Hand, Music, Utensils } from "lucide-react";
import menuMusic from "@/imports/sounds/main menu.mp3";
import { startPersistentSound } from "./scenes/audio";

const titleFont = {
  fontFamily: "'Another Shabby', 'Cooper BT', Georgia, serif",
};

export function Instructions() {
  const navigate = useNavigate();

  useEffect(() => {
    startPersistentSound(menuMusic, { volume: 0.28 });
  }, []);

  return (
    <div className="size-full flex items-center justify-center bg-[#fffdf5] p-4 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl max-h-full flex flex-col"
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-lg text-[#1a1208] hover:text-[#7a6830] transition-colors shrink-0"
        >
          <ArrowLeft className="size-5" />
          Back to Menu
        </button>

        {/* Scrollable card (prevents overflow on small screens) */}
        <div className="bg-white border-2 border-[#f0c840] rounded-3xl shadow-2xl p-6 md:p-10 overflow-y-auto">

          {/* Title */}
          <h1
            style={titleFont}
            className="text-3xl md:text-5xl font-bold text-[#1a1208] text-center"
          >
            How to Play
          </h1>

          <p className="text-center text-base md:text-xl text-[#7a6830] mt-2 mb-8">
            Experience Isabella's story through interactive scenes and mini-games
          </p>

          {/* Grid (same content, responsive scaling only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            <div className="flex gap-3 md:gap-4">
              <MousePointer2 className="size-5 md:size-6 text-[#f0c840] mt-1 shrink-0" />
              <div>
                <h3 style={titleFont} className="text-lg md:text-2xl font-bold text-[#1a1208]">
                  Navigation
                </h3>
                <p className="text-sm md:text-lg text-[#7a6830] mt-1">
                  Click "Continue" to progress through the story. Press ESC or the pause button to access the menu.
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <Hand className="size-5 md:size-6 text-[#f0c840] mt-1 shrink-0" />
              <div>
                <h3 style={titleFont} className="text-lg md:text-2xl font-bold text-[#1a1208]">
                  Drag & Drop
                </h3>
                <p className="text-sm md:text-lg text-[#7a6830] mt-1">
                  Some scenes require dragging objects. Click and hold to pick up items, then drag them to their destination.
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <Music className="size-5 md:size-6 text-[#f0c840] mt-1 shrink-0" />
              <div>
                <h3 style={titleFont} className="text-lg md:text-2xl font-bold text-[#1a1208]">
                  Piano Mini-Game
                </h3>
                <p className="text-sm md:text-lg text-[#7a6830] mt-1">
                  Follow the highlighted piano keys in sequence. Click each glowing key to play the melody.
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <Utensils className="size-5 md:size-6 text-[#f0c840] mt-1 shrink-0" />
              <div>
                <h3 style={titleFont} className="text-lg md:text-2xl font-bold text-[#1a1208]">
                  Kitchen Tasks
                </h3>
                <p className="text-sm md:text-lg text-[#7a6830] mt-1">
                  Complete tasks like stacking plates, passing food, and washing dishes by following on-screen prompts.
                </p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-8 p-4 md:p-6 bg-[#f5e98a]/40 rounded-2xl border border-[#f0c840]">
            <p className="text-sm md:text-lg text-[#1a1208] text-center">
              This game tells Act One of Isabella's story through 10 interactive scenes. Take your time to experience each moment.
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}