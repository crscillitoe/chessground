import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";
import { TeamOption } from "../../Team";
import { SpecialMove, SpecialMoveRule } from "../../SpecialMoveRule";
import { Pawn } from "../../Pieces/Standard/Pawn";

/**
 * If a pawn adjacant to this piece has just moved
 * 2 spaces forward and landed adjacant to us, we can
 * capture it by moving diagonally past it.
 */
export class EnPassant implements SpecialMoveRule {
  ValidSquares(piece: Piece, board: Board): SpecialMove[] {
    let toReturn: SpecialMove[] = [];
    // Grab pieces next to us.
    let legalTakeCases = [
      board.getPieceAtCoordinate(
        new Coordinate(piece.Coordinate.x - 1, piece.Coordinate.y)
      ),
      board.getPieceAtCoordinate(
        new Coordinate(piece.Coordinate.x + 1, piece.Coordinate.y)
      ),
    ];

    for (const otherPiece of legalTakeCases) {
      if (otherPiece) {
        if (
          otherPiece instanceof Pawn &&
          !otherPiece.Team.equals(piece.Team.teamOption)
        ) {
          // Check if this piece just moved.
          const lastMove = board.MoveHistory[board.MoveHistory.length - 1];
          if (
            Coordinate.equals(
              lastMove.PieceMoved.Coordinate,
              otherPiece.Coordinate
            )
          ) {
            if (Math.abs(lastMove.PointA.y - lastMove.PointB.y) === 2) {
              // If it's just performed a double move, we can take it.
              toReturn.push({
                target: new Coordinate(
                  otherPiece.Coordinate.x,
                  otherPiece.Coordinate.y + piece.Team.direction()
                ),
                makeMove: this.captureBehavior,
              });
            }
          }
        }
      }
    }

    return toReturn;
  }

  captureBehavior(piece: Piece, board: Board, target: Coordinate): boolean {
    const pawn = board.getPieceAtCoordinate(
      new Coordinate(target.x, target.y - piece.Team.direction())
    );

    if (pawn) {
      board.killPiece(pawn);
      piece.Coordinate.x = target.x;
      piece.Coordinate.y = target.y;

      return true;
    }

    return false;
  }
}
