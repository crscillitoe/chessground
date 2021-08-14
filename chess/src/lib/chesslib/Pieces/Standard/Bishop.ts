import { Piece } from "../../Piece";
import { Team } from "../../Team";
import { DiagonalLeftMove } from "../../MoveRules/Standard/DiagonalLeftMove";
import { DiagonalRightMove } from "../../MoveRules/Standard/DiagonalRightMove";
import { CannotAttackFriends } from "../../MoveRestrictions/Standard/CannotAttackFriends";

export class Bishop extends Piece {
  constructor(x: number, y: number, team: Team) {
    super(x, y, team, "Bishop");

    this.PointValue = 3;
    this.MoveRules = [new DiagonalLeftMove(-1), new DiagonalRightMove(-1)];
    this.MoveRestrictions = [new CannotAttackFriends()];
  }
}
