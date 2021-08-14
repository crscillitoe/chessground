import { Piece } from "../../Piece";
import { Team } from "../../Team";
import { HorizontalMove } from "../../MoveRules/Standard/HorizontalMove";
import { VerticalMove } from "../../MoveRules/Standard/VerticalMove";
import { DiagonalRightMove } from "../../MoveRules/Standard/DiagonalRightMove";
import { DiagonalLeftMove } from "../../MoveRules/Standard/DiagonalLeftMove";
import { CannotAttackFriends } from "../../MoveRestrictions/Standard/CannotAttackFriends";

export class Queen extends Piece {
  constructor(x: number, y: number, team: Team) {
    super(x, y, team, "Queen");

    this.PointValue = 9;
    this.MoveRules = [
      new HorizontalMove(-1),
      new VerticalMove(-1),
      new DiagonalLeftMove(-1),
      new DiagonalRightMove(-1),
    ];

    this.MoveRestrictions = [new CannotAttackFriends()];
  }
}
