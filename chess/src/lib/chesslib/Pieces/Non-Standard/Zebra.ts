import { Piece } from "../../Piece";
import { Team } from "../../Team";
import { HorizontalMove } from "../../MoveRules/Standard/HorizontalMove";
import { VerticalMove } from "../../MoveRules/Standard/VerticalMove";
import { CannotAttackFriends } from "../../MoveRestrictions/Standard/CannotAttackFriends";
import { ElbowMoveFrontLeft } from "../../MoveRules/Standard/ElbowMoveFrontLeft";
import { ElbowMoveBackRight } from "../../MoveRules/Standard/ElbowMoveBackRight";
import { ElbowMoveBackLeft } from "../../MoveRules/Standard/ElbowMoveBackLeft";
import { ElbowMoveFrontRight } from "../../MoveRules/Standard/ElbowMoveFrontRight";

export class Zebra extends Piece {
  constructor(x: number, y: number, team: Team) {
    super(x, y, team, "Zebra");

    this.PointValue = 5;
    this.MoveRules = [
      new ElbowMoveBackLeft({
        distanceLength: 2,
        distanceWidth: 1,
        isTallPiece: (mp, bp) => {
          return !mp.Team.equals(bp.Team.teamOption);
        },
      }),
      new ElbowMoveFrontLeft({
        distanceLength: 2,
        distanceWidth: 1,
        isTallPiece: (mp, bp) => {
          return !mp.Team.equals(bp.Team.teamOption);
        },
      }),
      new ElbowMoveBackRight({
        distanceLength: 2,
        distanceWidth: 1,
        isTallPiece: (mp, bp) => {
          return !mp.Team.equals(bp.Team.teamOption);
        },
      }),
      new ElbowMoveFrontRight({
        distanceLength: 2,
        distanceWidth: 1,
        isTallPiece: (mp, bp) => {
          return !mp.Team.equals(bp.Team.teamOption);
        },
      }),
    ];
  }
}
