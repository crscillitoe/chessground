import { Piece } from "./Piece";
import { Board } from "./Board";
import { Coordinate } from "./Coordinate";

/**
 * A special move rule describes how a given piece can move on the given board.
 * It also describes the behavior that should occur when that move occurs.
 *
 * Special moves ignore *all* restrictions.
 */
export interface SpecialMoveRule {
  /**
   * Returns a list of squares that the piece can legally
   * move to on the board, additionally, returns a function
   * to be executed manually whilst handling the move.
   *
   * @param piece The piece being moved
   * @param board The board the piece is on
   */
  ValidSquares: (piece: Piece, board: Board) => SpecialMove[];
}

/**
 * Describes the behavior that will occur when a special move
 * is selected.
 */
export interface SpecialMove {
  /**
   * The square that the user can select.
   */
  target: Coordinate;

  /**
   * The behavior that will occur if the user selects that square.
   */
  makeMove: (piece: Piece, board: Board, target: Coordinate) => boolean;
}
