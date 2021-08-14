import { MoveRule } from "./MoveRule";
import { Board } from "./Board";
import { Coordinate } from "./Coordinate";

import { Team, TeamOption } from "./Team";
import { SpecialMoveRule } from "./SpecialMoveRule";

/**
 * Contains all the information needed for a single piece
 */
export abstract class Piece {
  MoveRules: MoveRule[];
  MoveRestrictions: MoveRule[];
  SpecialMoves: SpecialMoveRule[];

  Coordinate: Coordinate;
  Team: Team;
  SVGName: string;

  KillCount: number = 0;
  TimesMoved: number = 0;
  DistanceTraveled: number = 0;
  CostEffectiveness: number = 0;

  IsBomb: boolean = false;

  PointValue: number;

  constructor(x: number, y: number, team: Team, SVGName: string) {
    this.Coordinate = new Coordinate(x, y);

    if (team.equals(TeamOption.WHITE)) {
      this.SVGName = `White_${SVGName}.svg`;
    } else {
      this.SVGName = `Black_${SVGName}.svg`;
    }

    this.Team = team;
  }

  /**
   * Returns a set of squares that this piece can legally move to.
   */
  getValidSquares(board: Board): Set<Coordinate> {
    let rules = new Set<Coordinate>();
    let restrictions: Coordinate[] = board.getAllSquares();
    let specialRules: Coordinate[] = [];

    for (const moveRule of this.MoveRules) {
      for (const coordinate of moveRule.ValidSquares(this, board)) {
        rules.add(coordinate);
      }
    }

    if (!this.MoveRestrictions) {
      return rules;
    }

    for (const moveRestriction of this.MoveRestrictions) {
      restrictions = restrictions.filter((allowedSquares) => {
        for (const coordinate of moveRestriction.ValidSquares(this, board)) {
          if (
            allowedSquares.x === coordinate.x &&
            allowedSquares.y === coordinate.y
          ) {
            return true;
          }
        }

        return false;
      });
    }

    if (this.SpecialMoves) {
      for (const specialMove of this.SpecialMoves) {
        for (const moveDefinition of specialMove.ValidSquares(this, board)) {
          specialRules.push(moveDefinition.target);
        }
      }
    }

    return new Set(
      [...rules]
        .filter((coord) => {
          for (const restriction of restrictions) {
            if (restriction.x === coord.x && restriction.y === coord.y) {
              return true;
            }
          }

          return false;
        })
        .concat(specialRules)
    );
  }

  /**
   * Checks if the given square can be moved onto.
   *
   * @param x The x coordinate to move the piece to
   * @param y The y coordinate to move the piece to
   */
  isValidSquare(x: number, y: number, board: Board): boolean {
    for (const coordinate of Array.from(this.getValidSquares(board))) {
      if (coordinate.x === x && coordinate.y === y) {
        return true;
      }
    }
  }
}
