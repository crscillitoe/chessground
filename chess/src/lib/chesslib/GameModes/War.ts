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
import { Giraffe } from "../Pieces/Non-Standard/Giraffe";
import { Mann } from "../Pieces/Non-Standard/Mann";
import { Coordinate } from "../Coordinate";

export class War extends GameMode {
  turncounter: number = 0;
  constructor() {
    super();
    this.turncounter = 0;
  }

  HandleMove(Move: Move, BoardGameState: Game): Game[] {
    const boardGameStates = super.HandleMove(Move, BoardGameState);
    if (boardGameStates.length !== 0) {
      this.turncounter++;
      if (this.turncounter % 5 === 0) {
        BoardGameState.BoardState.expand();
      }
    }

    return boardGameStates;
  }

  static BuildFreshGame(): Game {
    const board: Board = GameModeShared.StandardChessBoard();
    board.killPiece(board.getPieceAtCoordinate(new Coordinate(4, 2)));
    board.killPiece(board.getPieceAtCoordinate(new Coordinate(5, 2)));
    board.killPiece(board.getPieceAtCoordinate(new Coordinate(4, 7)));
    board.killPiece(board.getPieceAtCoordinate(new Coordinate(5, 7)));

    board.Pieces.push(new Mann(4, 2, new Team(TeamOption.WHITE)));
    board.Pieces.push(new Giraffe(5, 2, new Team(TeamOption.WHITE)));
    board.Pieces.push(new Mann(4, 7, new Team(TeamOption.BLACK)));
    board.Pieces.push(new Mann(5, 7, new Team(TeamOption.BLACK)));

    return new Game(board, GameState.IN_PROGRESS_WHITE_TURN);
  }
}
