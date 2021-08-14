import { Coordinate } from "./Coordinate";
import { Piece } from "./Piece";

/**
 * Describes a move made on the board,
 * the piece at PointA is moved to PointB
 */
export interface Move {
  PointA: Coordinate;
  PointB: Coordinate;
  PieceMoved?: Piece;
}
