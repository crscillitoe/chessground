import { Board } from "./Board";

/**
 * Represents a position on the board.
 * Coordinates will range from 1, 1 (A1)
 * to Board.Width, Board.Height
 */
export class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns a list of all coordinates starting at this coordinate,
   * and ending at the target coordinate. Inclusive.
   *
   * Throws error if it walks out of bounds.
   *
   * @param target the target coordinate
   * @param board the board the coordinate is on
   */
  getAllCoordinatesBetween(target: Coordinate, board: Board): Coordinate[] {
    throw new Error("Not implemented");
  }

  /**
   * Returns a list of all adjacent coordinates that are on the board
   * for the current coordinate.
   *
   * @param board the board the coordinate is on
   */
  getAllAdjacentCoordinatesOnBoard(board: Board): Coordinate[] {
    const deltas: number[][] = [
      [0, 1],
      [0, -1],
      [1, 0],
      [1, 1],
      [1, -1],
      [-1, 0],
      [-1, 1],
      [-1, -1],
    ];

    let toReturn: Coordinate[] = [];
    for (const delta of deltas) {
      const coordinate = new Coordinate(this.x + delta[0], this.y + delta[1]);
      if (board.isOnBoard(coordinate)) {
        toReturn.push(coordinate);
      }
    }

    return toReturn;
  }

  /**
   * Returns up to two paths to the given target while only using one
   * horizontal move, and one vertical move.
   *
   * @param target the target coordinate
   * @param board the board the coordinate is on
   */
  getAllCoordinatesInLMove(
    target: Coordinate,
    board: Board
  ): Array<Coordinate[]> {
    const toReturn: Array<Coordinate[]> = [];

    const deltaX = target.x - this.x > 0 ? 1 : -1;
    const deltaY = target.y - this.y > 0 ? 1 : -1;

    let path1 = this.getAllCoordinatesInDirection(
      deltaX,
      0,
      Math.abs(target.x - this.x),
      board
    );
    path1 = path1.concat(
      path1[path1.length - 1].getAllCoordinatesInDirection(
        0,
        deltaY,
        Math.abs(target.y - path1[path1.length - 1].y),
        board
      )
    );

    let path2 = this.getAllCoordinatesInDirection(
      0,
      deltaY,
      Math.abs(target.y - this.y),
      board
    );
    path2 = path2.concat(
      path2[path2.length - 1].getAllCoordinatesInDirection(
        deltaX,
        0,
        Math.abs(target.x - path2[path2.length - 1].x),
        board
      )
    );

    return [path1, path2];
  }

  /**
   * Walks in the given direction until the edge of the board is reached.
   * Returns all coordinates found.
   */
  getAllCoordinatesInDirection(
    deltaX: number,
    deltaY: number,
    maxDistance: number,
    board: Board
  ): Coordinate[] {
    let toReturn: Coordinate[] = [];

    let startCoord = new Coordinate(this.x, this.y);

    while (true) {
      const toAdd: Coordinate = new Coordinate(
        startCoord.x + deltaX,
        startCoord.y + deltaY
      );

      if (toReturn.length === maxDistance) {
        break;
      }

      if (board.isOnBoard(toAdd)) {
        toReturn.push(toAdd);

        startCoord.x += deltaX;
        startCoord.y += deltaY;
      } else {
        break;
      }
    }

    return toReturn;
  }

  /**
   * Calculates the distance between the two coordinates measured along axes of right angles
   * @param otherCoord
   */
  manhattanDistance(otherCoord: Coordinate): number {
    return Math.abs(this.x - otherCoord.x) + Math.abs(this.y - otherCoord.y);
  }

  /**
   * Returns true if the given coordinate has the same x and y values
   * as this coordinate.
   *
   * @param other
   */
  static equals(a: Coordinate, b: Coordinate): boolean {
    return a.x === b.x && a.y === b.y;
  }
}
