import { Coordinate } from "../../Coordinate";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { TeamOption } from "../../Team";
import { ElbowMove, ElbowMoveOptions } from "./ElbowMove";
import { MoveRule } from "../../MoveRule";

export class ElbowMoveFrontRight extends ElbowMove implements MoveRule {
  constructor(moveOptions: ElbowMoveOptions) {
    super(moveOptions);
  }

  ValidSquares(piece: Piece, board: Board): Coordinate[] {
    const delta = piece.Team.equals(TeamOption.WHITE) ? 1 : -1;
    const firstTarget = new Coordinate(
      piece.Coordinate.x + this.distanceLength * delta * -1,
      piece.Coordinate.y + this.distanceWidth * delta
    );
    const secondTarget = new Coordinate(
      piece.Coordinate.x + this.distanceWidth * delta * -1,
      piece.Coordinate.y + this.distanceLength * delta
    );
    return this.getStationsForTargets(
      piece.Coordinate,
      [firstTarget, secondTarget],
      board
    );
  }
}
