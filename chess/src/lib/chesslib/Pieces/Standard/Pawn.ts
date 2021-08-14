import { Piece } from "../../Piece";
import { Team } from "../../Team";
import { VerticalMove } from "../../MoveRules/Standard/VerticalMove";
import {
  ElbowMove,
  ElbowMoveOptions,
} from "../../MoveRules/Standard/ElbowMove";
import { ElbowMoveFrontRight } from "../../MoveRules/Standard/ElbowMoveFrontRight";
import { ElbowMoveFrontLeft } from "../../MoveRules/Standard/ElbowMoveFrontLeft";
import { ElbowMoveBackLeft } from "../../MoveRules/Standard/ElbowMoveBackLeft";
import { ElbowMoveBackRight } from "../../MoveRules/Standard/ElbowMoveBackRight";
import { PawnDoubleMove } from "../../MoveRules/Standard/PawnDoubleMove";
import { ForwardRestriction } from "../../MoveRestrictions/Standard/ForwardRestriction";
import { DiagonalMoveOnlyIfAttack } from "../../MoveRestrictions/Standard/DiagonalMoveOnlyIfAttack";
import { CannotAttackPiecesVertically } from "../../MoveRestrictions/Standard/CannotAttackPiecesVertically";
import { CannotAttackFriends } from "../../MoveRestrictions/Standard/CannotAttackFriends";
import { EnPassant } from "../../SpecialRules/Standard/EnPassant";

export class Pawn extends Piece {
  constructor(x: number, y: number, team: Team) {
    super(x, y, team, "Pawn");
    const moveOptions = {
      distanceLength: 1,
      distanceWidth: 1,
      canFly: true,
    };

    this.MoveRules = [
      new ElbowMoveFrontRight({
        distanceLength: 1,
        distanceWidth: 1,
      }),
      new ElbowMoveFrontLeft({
        distanceLength: 1,
        distanceWidth: 1,
      }),
      new VerticalMove(1),
      new PawnDoubleMove(),
    ];

    this.SpecialMoves = [new EnPassant()];

    this.MoveRestrictions = [
      new ForwardRestriction(),
      new DiagonalMoveOnlyIfAttack(),
      new CannotAttackPiecesVertically(),
      new CannotAttackFriends(),
    ];
  }
}
