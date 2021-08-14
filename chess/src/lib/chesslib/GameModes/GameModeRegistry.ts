import { GameMode } from "../GameMode";
import { DoubleMove } from "./DoubleMove";
import { RandomAtomic } from "./RandomAtomic";
import { QChess } from "./QChess";
import { War } from "./War";

export interface GameModeDescription {
  displayName: string;
  description: string;
  id?: number;
  gameMode: typeof GameMode;
}

const allGameModeDescriptions: GameModeDescription[] = [
  {
    displayName: "Double Move",
    description: "Description text here",
    gameMode: DoubleMove,
  },
  {
    displayName: "Random Atomic",
    description: "Description text here",
    gameMode: RandomAtomic,
  },
  {
    displayName: "War",
    description: "Description text here",
    gameMode: War,
  },
  {
    displayName: "Q Chess God Help Us",
    description: "Description text here",
    gameMode: QChess,
  },
];

export const getGameModeDescriptions = (): GameModeDescription[] => {
  for (let i = 0; i < allGameModeDescriptions.length; i++) {
    allGameModeDescriptions[i].id = i;
  }
  return allGameModeDescriptions;
};

export const getGameModeById = (id: number): typeof GameMode => {
  return allGameModeDescriptions[id].gameMode;
};
