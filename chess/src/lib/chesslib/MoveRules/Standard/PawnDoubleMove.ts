import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";

/**
 * Allows the piece to move 2 squares ahead if it is its' first move.
 */
export class PawnDoubleMove implements MoveRule {
  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    if (piece.TimesMoved > 0) {
      return [];
    }

    const targetY = piece.Coordinate.y + 2 * piece.Team.direction();
    if (
      board.getPieceAtCoordinate(new Coordinate(piece.Coordinate.x, targetY))
    ) {
      return [];
    }

    return [new Coordinate(piece.Coordinate.x, targetY)];
  }
}
