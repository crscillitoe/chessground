import { Piece } from "../../Piece";
import { Team } from "../../Team";
import { HorizontalMove } from "../../MoveRules/Standard/HorizontalMove";
import { VerticalMove } from "../../MoveRules/Standard/VerticalMove";
import { CannotAttackFriends } from "../../MoveRestrictions/Standard/CannotAttackFriends";
import { ElbowMoveFrontLeft } from "../../MoveRules/Standard/ElbowMoveFrontLeft";
import { ElbowMoveBackRight } from "../../MoveRules/Standard/ElbowMoveBackRight";

export class Giraffe extends Piece {
  constructor(x: number, y: number, team: Team) {
    super(x, y, team, "Giraffe");

    this.PointValue = 5;
    this.MoveRules = [
      new HorizontalMove(-1),
      new VerticalMove(-1),
      new ElbowMoveFrontLeft({
        distanceLength: 2,
        distanceWidth: 1,
      }),
      new ElbowMoveBackRight({
        distanceLength: 2,
        distanceWidth: 1,
      }),
    ];
  }
}
