import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useIsPortrait } from "./useOrientation";
import { RotateDeviceOverlay } from "./RotateDeviceOverlay";

export default function App() {
  const isPortrait = useIsPortrait();

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      
      {/* 16:9 LOCKED GAME FRAME */}
      <div
        id="game-frame"
        className="relative bg-black overflow-hidden"
        style={{
          aspectRatio: "16 / 9",
          width: "min(100vw, calc(100vh * 16 / 9))",
          height: "min(100vh, calc(100vw * 9 / 16))",
        }}
      >
        <RouterProvider router={router} />
      </div>

      {/* Rotate overlay */}
      <RotateDeviceOverlay visible={isPortrait} />
    </div>
  );
}