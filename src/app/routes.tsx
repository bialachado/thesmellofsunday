import { createHashRouter } from "react-router";
import { MainMenu } from "./components/MainMenu";
import { Instructions } from "./components/Instructions";
import { Game } from "./components/Game";

export const router = createHashRouter([
  {
    path: "/",
    Component: MainMenu,
  },
  {
    path: "/instructions",
    Component: Instructions,
  },
  {
    path: "/game",
    Component: Game,
  },
]);
