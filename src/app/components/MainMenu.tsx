import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import menuScene from "@/imports/visuals/menu_scene.png";
import menuMusic from "@/imports/sounds/main menu.mp3";
import { startPersistentSound } from "./scenes/audio";
import { useEffect, useState } from "react";

export function MainMenu() {
  const navigate = useNavigate();

  const [showResume, setShowResume] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    startPersistentSound(menuMusic, { volume: 0.28 });

    const paused = localStorage.getItem("gamePaused") === "true";
    const completed = localStorage.getItem("gameCompleted") === "true";
    setShowResume(paused && !completed);

    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const startGame = () => {
    localStorage.removeItem("gamePaused");
    localStorage.removeItem("gameCompleted");
    localStorage.removeItem("currentScene");
    navigate("/game");
  };

  const resumeGame = () => {
    localStorage.removeItem("gamePaused");
    navigate("/game");
  };

  return (
    <div className="relative size-full overflow-hidden flex items-end justify-start">

      {/* Background */}
      <ImageWithFallback
        src={menuScene}
        alt="Menu"
        className="absolute inset-0 w-full h-full object-contain object-center"
      />

      {/* ===== DESKTOP ===== */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            relative z-10
            flex flex-col gap-[clamp(6px,1vh,16px)]
            pb-[clamp(24px,4vh,90px)]
            pl-[clamp(12px,5vw,110px)]
          "
        >
          {showResume && (
            <button
              onClick={resumeGame}
              className="
                w-[clamp(140px,14vw,280px)]
                h-[clamp(42px,6vh,78px)]
                text-[clamp(14px,1.4vw,26px)]
                rounded-2xl font-bold border-2 border-[#1a1208]
                bg-[#f0c840] text-[#1a1208]
              "
            >
              Resume Game
            </button>
          )}

          <button
            onClick={startGame}
            className={`
              w-[clamp(140px,14vw,280px)]
              h-[clamp(42px,6vh,78px)]
              text-[clamp(14px,1.4vw,26px)]
              rounded-2xl font-bold border-2 border-[#1a1208]
              ${showResume ? "bg-white text-[#1a1208]" : "bg-[#f0c840] text-[#1a1208]"}
            `}
          >
            Start Game
          </button>

          <button
            onClick={() => navigate("/instructions")}
            className="
              w-[clamp(140px,14vw,280px)]
              h-[clamp(42px,6vh,78px)]
              text-[clamp(14px,1.4vw,26px)]
              rounded-2xl font-bold border-2 border-[#1a1208]
              bg-white text-[#1a1208]
            "
          >
            Instructions
          </button>
        </motion.div>
      )}

      {/* ===== MOBILE (SAME TEXT, ROW LAYOUT) ===== */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            absolute bottom-4 left-1/2 -translate-x-1/2
            flex flex-row items-center justify-center
            gap-2
            w-[92vw]
            max-w-[520px]
          "
        >
          {showResume && (
            <button
              onClick={resumeGame}
              className="
                flex-1
                h-[42px]
                text-[clamp(10px,2.5vw,13px)]
                rounded-xl font-bold border-2 border-[#1a1208]
                bg-[#f0c840] text-[#1a1208]
              "
            >
              Resume Game
            </button>
          )}

          <button
            onClick={startGame}
            className={`
              flex-1
              h-[42px]
              text-[clamp(10px,2.5vw,13px)]
              rounded-xl font-bold border-2 border-[#1a1208]
              ${showResume ? "bg-white text-[#1a1208]" : "bg-[#f0c840] text-[#1a1208]"}
            `}
          >
            Start Game
          </button>

          <button
            onClick={() => navigate("/instructions")}
            className="
              flex-1
              h-[42px]
              text-[clamp(10px,2.5vw,13px)]
              rounded-xl font-bold border-2 border-[#1a1208]
              bg-white text-[#1a1208]
            "
          >
            Instructions
          </button>
        </motion.div>
      )}
    </div>
  );
}