import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";

/**
 * Allows the piece to move `distance` units horizontally.
 */
export class HorizontalMove implements MoveRule {
  distance: number = -1;
  constructor(distance: number) {
    this.distance = distance;
  }

  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    const left = board.stopAtPiece(
      piece.Coordinate.getAllCoordinatesInDirection(-1, 0, this.distance, board)
    );

    const right = board.stopAtPiece(
      piece.Coordinate.getAllCoordinatesInDirection(1, 0, this.distance, board)
    );

    return left.concat(right);
  }
}
