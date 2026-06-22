import { useEffect, useState } from "react";

export function useScaleToFrame(baseW = 1920, baseH = 1080) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const el = document.querySelector("#game-frame");
      if (!el) return;

      const rect = el.getBoundingClientRect();

      // 🔥 FIX: scale based on BOTH axes
      const scaleW = rect.width / baseW;
      const scaleH = rect.height / baseH;

      const raw = Math.min(scaleW, scaleH);

      // nonlinear scaling (your desired behavior)
      const final = Math.pow(raw, 1.2);

      // clamp for stability
      setScale(Math.max(0.35, Math.min(final, 1)));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [baseW, baseH]);

  return scale;
}