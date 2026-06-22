import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import piano from "@/imports/visuals/4th minigame - piano/piano.png";

import aRight from "@/imports/visuals/4th minigame - piano/A - right.png";
import bRight from "@/imports/visuals/4th minigame - piano/B - right.png";
import cRight from "@/imports/visuals/4th minigame - piano/C - right.png";
import dRight from "@/imports/visuals/4th minigame - piano/D - right.png";
import eRight from "@/imports/visuals/4th minigame - piano/E - right.png";
import fRight from "@/imports/visuals/4th minigame - piano/F - right.png";
import gRight from "@/imports/visuals/4th minigame - piano/G - right.png";

import aWrong from "@/imports/visuals/4th minigame - piano/A - wrong.png";
import bWrong from "@/imports/visuals/4th minigame - piano/B - wrong.png";
import cWrong from "@/imports/visuals/4th minigame - piano/C - wrong.png";
import dWrong from "@/imports/visuals/4th minigame - piano/D - wrong.png";
import eWrong from "@/imports/visuals/4th minigame - piano/E - wrong.png";
import fWrong from "@/imports/visuals/4th minigame - piano/F - wrong.png";
import gWrong from "@/imports/visuals/4th minigame - piano/G - wrong.png";

// 🎵 WAV piano samples
import CNote from "@/imports/sounds/piano notes/C.wav";
import DNote from "@/imports/sounds/piano notes/D.wav";
import ENote from "@/imports/sounds/piano notes/E.wav";
import FNote from "@/imports/sounds/piano notes/F.wav";
import GNote from "@/imports/sounds/piano notes/G.wav";
import ANote from "@/imports/sounds/piano notes/A.wav";
import BNote from "@/imports/sounds/piano notes/B.wav";

interface SceneProps {
  onComplete: () => void;
  isPaused?: boolean;
}

const melody = [
  "C", "B", "C", "B", "C", "D", "E", "D",
  "E", "D", "C", "F", "E", "F", "E", "F",
  "G", "A", "G", "A", "G", "F",
];

const rightFrames: Record<string, string> = {
  A: aRight,
  B: bRight,
  C: cRight,
  D: dRight,
  E: eRight,
  F: fRight,
  G: gRight,
};

const wrongFrames: Record<string, string> = {
  A: aWrong,
  B: bWrong,
  C: cWrong,
  D: dWrong,
  E: eWrong,
  F: fWrong,
  G: gWrong,
};

const keySpots: Record<string, string> = {
  C: "left-[8%]",
  D: "left-[22%]",
  E: "left-[36%]",
  F: "left-[50%]",
  G: "left-[64%]",
  A: "left-[78%]",
  B: "left-[92%]",
};

// 🎹 WAV mapping
const noteSounds: Record<string, string> = {
  C: CNote,
  D: DNote,
  E: ENote,
  F: FNote,
  G: GNote,
  A: ANote,
  B: BNote,
};

function playNote(note: string) {
  const src = noteSounds[note];
  if (!src) return;

  const audio = new Audio(src);
  audio.volume = 0.9;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

export function Scene9({ onComplete, isPaused = false }: SceneProps) {
  const [noteIndex, setNoteIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ note: string; correct: boolean } | null>(null);

  const currentNote = melody[noteIndex];
  const complete = noteIndex >= melody.length;

  const frame = feedback
    ? feedback.correct
      ? rightFrames[feedback.note]
      : wrongFrames[feedback.note]
    : currentNote
    ? rightFrames[currentNote]
    : piano;

  useEffect(() => {
    if (isPaused) return;
    if (!complete) return;

    const finish = setTimeout(onComplete, 1600);
    return () => clearTimeout(finish);
  }, [complete, onComplete, isPaused]);

  const handleKey = (note: string) => {
    if (complete) return;

    playNote(note);

    const correct = note === currentNote;
    setFeedback({ note, correct });

    window.setTimeout(() => setFeedback(null), correct ? 190 : 260);

    if (correct) {
      setNoteIndex((v) => v + 1);
    }
  };

  return (
    <div className="relative size-full overflow-hidden bg-black">
      <ImageWithFallback
        src={frame}
        alt="Piano keys glowing for Isabella's father's melody"
        className="absolute inset-0 size-full object-contain object-center"
      />

      {!complete && (
        <>
          {Object.keys(keySpots).map((note) => (
            <button
              key={note}
              aria-label={`Play ${note}`}
              onClick={() => handleKey(note)}
              className={`absolute ${keySpots[note]} bottom-[2%] z-10 h-[32%] w-[13%] -translate-x-1/2 bg-transparent`}
            >
              <span className="sr-only">{note}</span>
            </button>
          ))}

          <motion.div
            className={`absolute ${keySpots[currentNote]} bottom-[31%] h-5 w-5 -translate-x-1/2 rounded-full bg-[#f0c840]`}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
            transition={{ repeat: Infinity, duration: 0.9 }}
          />
        </>
      )}
    </div>
  );
}