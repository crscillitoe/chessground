import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";
import { TeamOption } from "../../Team";

/**
 * Disallows the piece from moving diagonally, unless it is an attack.
 */
export class DiagonalMoveOnlyIfAttack implements MoveRule {
  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    return board.getAllSquares().filter(square => {
      if (
        Math.abs(square.x - piece.Coordinate.x) ===
        Math.abs(square.y - piece.Coordinate.y)
      ) {
        if (board.getPieceAtCoordinate(square)) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    });
  }
}
