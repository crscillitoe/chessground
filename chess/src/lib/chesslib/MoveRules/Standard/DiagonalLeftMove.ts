import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";

/**
 * Allows the piece to move `distance` units in the up+left/down+right diagonal.
 */
export class DiagonalLeftMove implements MoveRule {
  distance: number = -1;
  constructor(distance: number) {
    this.distance = distance;
  }

  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    const upLeft = board.stopAtPiece(
      piece.Coordinate.getAllCoordinatesInDirection(-1, 1, this.distance, board)
    );

    const downRight = board.stopAtPiece(
      piece.Coordinate.getAllCoordinatesInDirection(1, -1, this.distance, board)
    );

    return upLeft.concat(downRight);
  }
}
