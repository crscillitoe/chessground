import { Piece } from "../../Piece";
import { Team } from "../../Team";
import { CannotAttackFriends } from "../../MoveRestrictions/Standard/CannotAttackFriends";
import { ElbowMoveBackLeft } from "../../MoveRules/Standard/ElbowMoveBackLeft";
import { ElbowMoveFrontLeft } from "../../MoveRules/Standard/ElbowMoveFrontLeft";
import { ElbowMoveFrontRight } from "../../MoveRules/Standard/ElbowMoveFrontRight";
import { ElbowMoveBackRight } from "../../MoveRules/Standard/ElbowMoveBackRight";

export class Knight extends Piece {
  constructor(x: number, y: number, team: Team) {
    super(x, y, team, "Knight");

    this.PointValue = 3;
    this.MoveRules = [
      new ElbowMoveBackLeft({
        distanceLength: 2,
        distanceWidth: 1,
      }),
      new ElbowMoveFrontLeft({
        distanceLength: 2,
        distanceWidth: 1,
      }),
      new ElbowMoveBackRight({
        distanceLength: 2,
        distanceWidth: 1,
      }),
      new ElbowMoveFrontRight({
        distanceLength: 2,
        distanceWidth: 1,
      }),
    ];

    this.MoveRestrictions = [new CannotAttackFriends()];
  }
}
