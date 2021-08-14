import { Piece } from "../../Piece";
import { Team } from "../../Team";
import { HorizontalMove } from "../../MoveRules/Standard/HorizontalMove";
import { VerticalMove } from "../../MoveRules/Standard/VerticalMove";
import { DiagonalLeftMove } from "../../MoveRules/Standard/DiagonalLeftMove";
import { DiagonalRightMove } from "../../MoveRules/Standard/DiagonalRightMove";
import { CannotAttackFriends } from "../../MoveRestrictions/Standard/CannotAttackFriends";
import { KingSideCastle } from "../../SpecialRules/Standard/KingSideCastle";
import { QueenSideCastle } from "../../SpecialRules/Standard/QueenSideCastle";

export class King extends Piece {
  constructor(x: number, y: number, team: Team) {
    super(x, y, team, "King");

    this.PointValue = 0;
    this.MoveRules = [
      new HorizontalMove(1),
      new VerticalMove(1),
      new DiagonalLeftMove(1),
      new DiagonalRightMove(1),
    ];

    this.SpecialMoves = [new KingSideCastle(), new QueenSideCastle()];

    this.MoveRestrictions = [new CannotAttackFriends()];
  }
}
