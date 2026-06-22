import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "motion/react";
import { PauseMenu } from "./PauseMenu";
import { Pause } from "lucide-react";
import { stopPersistentSound } from "./scenes/audio";

import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";
import { Scene9 } from "./scenes/Scene9";
import { Scene10 } from "./scenes/Scene10";
import { ScenePianoIntro } from "./scenes/ScenePianoIntro";
import { SceneActStart } from "./scenes/SceneActStart";
import { SceneActEnd } from "./scenes/SceneActEnd";

const scenes = [
  SceneActStart,
  Scene1, Scene2, Scene3, Scene4, Scene5,
  Scene7, Scene8, Scene9, ScenePianoIntro, Scene10,
  SceneActEnd,
];

export function Game() {
  const navigate = useNavigate();

  const [currentScene, setCurrentScene] = useState(() => {
    const saved = localStorage.getItem("currentScene");
    return saved ? Number(saved) : 0;
  });

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    stopPersistentSound();
  }, []);

  // persist scene
  useEffect(() => {
    localStorage.setItem("currentScene", String(currentScene));
  }, [currentScene]);

  const advance = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(s => s + 1);
    } else {
      localStorage.setItem("gameCompleted", "true");
      localStorage.removeItem("gamePaused");
      navigate("/");
    }
  };

  const pauseGame = () => {
    setIsPaused(true);
    localStorage.setItem("gamePaused", "true");
  };

  const resumeGame = () => {
    setIsPaused(false);
    localStorage.removeItem("gamePaused");
  };

  const goMenu = () => {
    localStorage.setItem("gamePaused", "true");
    navigate("/");
  };

  const CurrentScene = scenes[currentScene];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative size-full bg-black">

        {/* Pause button */}
        <button
          onClick={() => setIsPaused(true)}
          className="absolute z-50 w-10 h-10 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-all
                    right-[2%] top-[3%]"
        >
          <Pause className="size-4" />
        </button>

        {/* Scene */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CurrentScene onComplete={advance} isPaused={isPaused} />
          </motion.div>
        </AnimatePresence>

        {/* Pause menu */}
        <PauseMenu
          open={isPaused}
          onClose={resumeGame}
          onGoMenu={goMenu}
        />
      </div>
    </DndProvider>
  );
}