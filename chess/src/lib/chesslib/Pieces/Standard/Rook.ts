import { Piece } from "../../Piece";
import { Team } from "../../Team";
import { HorizontalMove } from "../../MoveRules/Standard/HorizontalMove";
import { VerticalMove } from "../../MoveRules/Standard/VerticalMove";
import { CannotAttackFriends } from "../../MoveRestrictions/Standard/CannotAttackFriends";

export class Rook extends Piece {
  constructor(x: number, y: number, team: Team) {
    super(x, y, team, "Rook");

    this.PointValue = 5;
    this.MoveRules = [new HorizontalMove(-1), new VerticalMove(-1)];

    this.MoveRestrictions = [new CannotAttackFriends()];
  }
}
