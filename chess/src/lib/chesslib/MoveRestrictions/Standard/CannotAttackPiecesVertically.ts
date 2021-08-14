import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";

/**
 * Disallows the piece from attacking pieces in a vertical line.
 */
export class CannotAttackPiecesVertically implements MoveRule {
  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    return board.getAllSquares().filter(square => {
      if (square.x === piece.Coordinate.x) {
        if (board.getPieceAtCoordinate(square)) {
          return false;
        } else {
          return true;
        }
      }

      return true;
    });
  }
}
