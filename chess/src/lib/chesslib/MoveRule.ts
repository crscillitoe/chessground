import { Piece } from "./Piece";
import { Board } from "./Board";
import { Coordinate } from "./Coordinate";

/**
 * A move rule describes how a given piece can move on the given board.
 */
export interface MoveRule {
  /**
   * Returns a list of squares that the piece can legally
   * move to on the board.
   *
   * @param piece The piece being moved
   * @param board The board the piece is on
   */
  ValidSquares: (piece: Piece, board: Board) => Coordinate[];
}
