import { GameMode } from "../GameMode";
import { Board } from "../Board";
import { Team, TeamOption } from "../Team";
import { Move } from "../Move";
import { GameState } from "../GameState";
import { Game } from "../Game";
import { King } from "../Pieces/Standard/King";
import { Pawn } from "../Pieces/Standard/Pawn";
import { Rook } from "../Pieces/Standard/Rook";
import { Knight } from "../Pieces/Standard/Knight";
import { Bishop } from "../Pieces/Standard/Bishop";
import { Queen } from "../Pieces/Standard/Queen";
import { Piece } from "../Piece";
import { GameModeShared } from "./GameModeShared";
import { Coordinate } from "../Coordinate";

export class RandomAtomic extends GameMode {
  TakePiece(Predator: Piece, Prey: Piece, BoardGameState: Game): void {
    if (!Predator.IsBomb && !Prey.IsBomb) {
      super.TakePiece(Predator, Prey, BoardGameState);
      return;
    }

    Predator.Coordinate = new Coordinate(Prey.Coordinate.x, Prey.Coordinate.y);
    BoardGameState.BoardState.killPiece(Predator);

    const deadBoys: Coordinate[] = Prey.Coordinate.getAllAdjacentCoordinatesOnBoard(
      BoardGameState.BoardState
    );

    for (const boy of deadBoys) {
      const piece = BoardGameState.BoardState.getPieceAtCoordinate(boy);

      if (piece) {
        if (piece.IsBomb) {
          for (const moreDeadBoy of piece.Coordinate.getAllAdjacentCoordinatesOnBoard(
            BoardGameState.BoardState
          )) {
            const otherPiece = BoardGameState.BoardState.getPieceAtCoordinate(
              moreDeadBoy
            );
            if (otherPiece) {
              super.KillPiece(Predator, otherPiece, BoardGameState);
            }
          }

          super.KillPiece(Predator, piece, BoardGameState);
        } else {
          super.KillPiece(Predator, piece, BoardGameState);
        }
      }
    }

    super.KillPiece(Predator, Prey, BoardGameState);
  }

  /**
   * Sets the board up for a brand new game.
   */
  static BuildFreshGame(): Game {
    let standardGame: Game = super.BuildFreshGame();

    standardGame.BoardState.getRandomPiece().IsBomb = true;
    standardGame.BoardState.getRandomPiece().IsBomb = true;

    return standardGame;
  }
}
