import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";
import { TeamOption } from "../../Team";

/**
 * Disallows the piece from not advancing up the board.
 */
export class ForwardRestriction implements MoveRule {
  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    return board
      .getAllSquares()
      .filter(
        (square) => (square.y - piece.Coordinate.y) * piece.Team.direction() > 0
      );
  }
}
