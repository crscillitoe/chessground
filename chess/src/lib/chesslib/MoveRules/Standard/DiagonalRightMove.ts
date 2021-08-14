import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";

/**
 * Allows the piece to move `distance` units in the up+right/down+left diagonal.
 */
export class DiagonalRightMove implements MoveRule {
  distance: number = -1;
  constructor(distance: number) {
    this.distance = distance;
  }

  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    const upRight = board.stopAtPiece(
      piece.Coordinate.getAllCoordinatesInDirection(1, 1, this.distance, board)
    );

    const downLeft = board.stopAtPiece(
      piece.Coordinate.getAllCoordinatesInDirection(
        -1,
        -1,
        this.distance,
        board
      )
    );

    return upRight.concat(downLeft);
  }
}
