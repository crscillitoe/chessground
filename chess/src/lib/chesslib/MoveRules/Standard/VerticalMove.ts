import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";

/**
 * Allows the piece to move `distance` units vertically.
 */
export class VerticalMove implements MoveRule {
  distance: number = -1;
  constructor(distance: number) {
    this.distance = distance;
  }

  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    const up = board.stopAtPiece(
      piece.Coordinate.getAllCoordinatesInDirection(0, 1, this.distance, board)
    );

    const down = board.stopAtPiece(
      piece.Coordinate.getAllCoordinatesInDirection(0, -1, this.distance, board)
    );

    return up.concat(down);
  }
}
