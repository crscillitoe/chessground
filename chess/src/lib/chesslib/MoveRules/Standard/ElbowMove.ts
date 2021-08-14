import { MoveRule } from "../../MoveRule";
import { Board } from "../../Board";
import { Piece } from "../../Piece";
import { Coordinate } from "../../Coordinate";
import { Quadrant } from "../../Quadrant";

interface WalkResult {
  canReachDestination: boolean;
  intermediateCoordinates: Coordinate[];
}

export abstract class ElbowMove {
  protected distanceLength: number;
  protected distanceWidth: number;
  protected numStations: number;
  protected mustReachDestination: boolean;
  protected isTallPiece: (movingPiece: Piece, blockingPiece: Piece) => boolean;

  ALL_TALL = (movingPiece: Piece, blockingPiece: Piece): boolean => true;
  ALL_SHORT = (movingPiece: Piece, blockingPiece: Piece): boolean => false;

  constructor(moveOptions: ElbowMoveOptions) {
    this.distanceLength = moveOptions.distanceLength || 1;
    this.distanceWidth = moveOptions.distanceWidth || 1;
    this.numStations = moveOptions.numStations || 2;
    if (this.numStations < 2) {
      this.numStations = 2;
    }
    this.isTallPiece = moveOptions.isTallPiece || this.ALL_SHORT;
    this.mustReachDestination =
      moveOptions.mustReachDestination !== undefined
        ? moveOptions.mustReachDestination
        : true;
  }

  protected getStationsForTargets(
    source: Coordinate,
    targets: Coordinate[],
    board: Board
  ): Coordinate[] {
    let toReturn: Coordinate[] = [];
    for (const target of targets) {
      if (!board.isOnBoard(target)) continue;
      toReturn = toReturn.concat(this.getStations(source, target, board));
    }
    return toReturn;
  }

  protected getStations(
    source: Coordinate,
    target: Coordinate,
    board: Board
  ): Coordinate[] {
    const pathways = source.getAllCoordinatesInLMove(target, board);
    const movingPiece = board.getPieceAtCoordinate(source);
    let toReturn: Coordinate[] = [];
    const distanceBetweenStops = Math.round(
      source.manhattanDistance(target) / (this.numStations - 1)
    );
    let anyValidPath = false;

    for (let pathIndex = 0; pathIndex < pathways.length; pathIndex++) {
      const path = pathways[pathIndex];
      const pieceIndices = board.identifyPieces(path);
      let currentPathValid = true;
      let validPath = path;
      pieceIndices.forEach((i) => {
        const blockingPiece = board.getPieceAtCoordinate(path[i]);
        if (
          this.isTallPiece(movingPiece, blockingPiece) &&
          !Coordinate.equals(blockingPiece.Coordinate, target)
        ) {
          if (this.mustReachDestination) {
            currentPathValid = false;
          } else {
            validPath = path.slice(0, i + 1);
          }
        }
      });
      anyValidPath = anyValidPath || currentPathValid;
      if (!currentPathValid) continue;
      const stationReferenceCoord = pathIndex === 1 ? source : target;
      const stations = validPath
        .filter(
          (coord) =>
            coord.manhattanDistance(stationReferenceCoord) %
              distanceBetweenStops ==
            0
        )
        .slice(0, this.numStations - 1);
      toReturn = toReturn.concat(stations);
      if (path.length === validPath.length) toReturn.push(target);
    }
    return anyValidPath ? toReturn : [];
  }
}

/**
 * @param distanceLength: Long arm of maximal elbow move
 * @param distanceWidth: Short arm of maximal elbow move
 * @param numStations: Number of stations between source and maximal elbow move. Minimum of 2.
 * @param mustReachDestination: True if a piece must be able to make the maximal elbow move in order to move to any of its stations.
 * @param isTallPiece: Function to determine whether or not a piece may block the moving piece
 */
export interface ElbowMoveOptions {
  distanceLength?: number;
  distanceWidth?: number;
  numStations?: number;
  mustReachDestination?: boolean;
  isTallPiece?: (movingPiece: Piece, blockingPiece: Piece) => boolean;
}
