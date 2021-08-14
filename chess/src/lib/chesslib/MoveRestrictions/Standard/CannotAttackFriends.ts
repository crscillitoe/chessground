import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";
import { TeamOption } from "../../Team";

/**
 * Disallows the piece from attacking similarly colored pieces.
 */
export class CannotAttackFriends implements MoveRule {
  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    return board.getAllSquares().filter((square) => {
      const otherPiece = board.getPieceAtCoordinate(square);
      if (otherPiece) {
        if (piece.Team.equals(otherPiece.Team.teamOption)) {
          return false;
        }
      }
      return true;
    });
  }
}
