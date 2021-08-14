import { GameMode } from "../GameMode";
import { Move } from "../Move";
import { Game } from "../Game";
import { Team, TeamOption } from "../Team";
import { Board } from "../Board";
import { GameState } from "../GameState";
import { GameModeShared } from "./GameModeShared";
import { Queen } from "../Pieces/Standard/Queen";
import { King } from "../Pieces/Standard/King";
import { Bishop } from "../Pieces/Standard/Bishop";
import { Knight } from "../Pieces/Standard/Knight";
import { Pawn } from "../Pieces/Standard/Pawn";
import { Rook } from "../Pieces/Standard/Rook";
import { Zebra } from "../Pieces/Non-Standard/Zebra";

export class QChess extends GameMode {
  constructor() {
    super();
  }

  whiteMoveArray: Move[] = [];
  blackMoveArray: Move[] = [];

  HandleMove(Move: Move, BoardGameState: Game): Game[] {
    const piece = BoardGameState.BoardState.getPieceAtCoordinate(Move.PointA);
    if (piece.Team.teamOption === TeamOption.WHITE) {
      if (this.whiteMoveArray.length < 3) {
        this.whiteMoveArray.push(Move);
      }
    } else if (piece.Team.teamOption === TeamOption.BLACK) {
      if (this.blackMoveArray.length < 3) {
        this.blackMoveArray.push(Move);
      }
    }

    console.log(this.whiteMoveArray);
    console.log(this.blackMoveArray);

    let toReturn: Game[] = [];
    if (this.whiteMoveArray.length === 3 && this.blackMoveArray.length === 3) {
      if (BoardGameState.State === GameState.IN_PROGRESS_WHITE_TURN) {
        toReturn = this.processMoves(
          this.whiteMoveArray,
          this.blackMoveArray,
          BoardGameState
        );
        BoardGameState.State = GameState.IN_PROGRESS_BLACK_TURN;
      } else {
        toReturn = this.processMoves(
          this.blackMoveArray,
          this.whiteMoveArray,
          BoardGameState
        );
        BoardGameState.State = GameState.IN_PROGRESS_WHITE_TURN;
      }

      this.whiteMoveArray = [];
      this.blackMoveArray = [];
    }

    return toReturn;
  }

  processMoves(
    firstMoves: Move[],
    secondMoves: Move[],
    BoardGameState: Game
  ): Game[] {
    const completedMoves: Game[] = [];

    for (let i = 0; i < 3; i++) {
      completedMoves.push(
        ...JSON.parse(
          JSON.stringify(super.HandleMove(firstMoves[i], BoardGameState))
        )
      );
      if (BoardGameState.isGameOver()) {
        return completedMoves;
      }
      completedMoves.push(
        ...JSON.parse(
          JSON.stringify(super.HandleMove(secondMoves[i], BoardGameState))
        )
      );
      if (BoardGameState.isGameOver()) {
        return completedMoves;
      }
    }

    return completedMoves;
  }

  static BuildFreshGame(): Game {
    const board: Board = new Board([], 11, 11);

    board.Pieces.push(new King(6, 1, new Team(TeamOption.WHITE)));

    board.Pieces.push(new Zebra(4, 1, new Team(TeamOption.WHITE)));
    board.Pieces.push(new Zebra(5, 1, new Team(TeamOption.WHITE)));
    board.Pieces.push(new Zebra(7, 1, new Team(TeamOption.WHITE)));
    board.Pieces.push(new Zebra(8, 1, new Team(TeamOption.WHITE)));

    board.Pieces.push(new Rook(1, 1, new Team(TeamOption.WHITE)));
    board.Pieces.push(new Rook(11, 1, new Team(TeamOption.WHITE)));

    board.Pieces.push(new Knight(2, 1, new Team(TeamOption.WHITE)));
    board.Pieces.push(new Knight(10, 1, new Team(TeamOption.WHITE)));

    board.Pieces.push(new Bishop(3, 1, new Team(TeamOption.WHITE)));
    board.Pieces.push(new Bishop(9, 1, new Team(TeamOption.WHITE)));

    board.fillRowWithPawns(2, TeamOption.WHITE);
    board.fillRowWithPawns(10, TeamOption.BLACK);

    board.Pieces.push(new Zebra(4, 11, new Team(TeamOption.BLACK)));
    board.Pieces.push(new Zebra(5, 11, new Team(TeamOption.BLACK)));

    board.Pieces.push(new King(6, 11, new Team(TeamOption.BLACK)));

    board.Pieces.push(new Zebra(7, 11, new Team(TeamOption.BLACK)));
    board.Pieces.push(new Zebra(8, 11, new Team(TeamOption.BLACK)));

    board.Pieces.push(new Rook(1, 11, new Team(TeamOption.BLACK)));
    board.Pieces.push(new Rook(11, 11, new Team(TeamOption.BLACK)));

    board.Pieces.push(new Knight(2, 11, new Team(TeamOption.BLACK)));
    board.Pieces.push(new Knight(10, 11, new Team(TeamOption.BLACK)));

    board.Pieces.push(new Bishop(3, 11, new Team(TeamOption.BLACK)));
    board.Pieces.push(new Bishop(9, 11, new Team(TeamOption.BLACK)));

    return new Game(board, GameState.IN_PROGRESS_WHITE_TURN);
  }
}
