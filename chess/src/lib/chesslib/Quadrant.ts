import { Coordinate } from "./Coordinate";
import { Piece } from "./Piece";

export class Quadrant {
    deltaX = 1;
    deltaY = 1;
    constructor(deltaX: number, deltaY: number) {
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    /**
     * Determine whether a coordinate is in this quadrant
     * @param piece: Piece to use as center point
     * @param coord Coordinate to check
     * @returns True if coordinate is in the quadrant
     */
    InQuadrant(piece: Piece, coord: Coordinate): boolean {
        const centerPoint = piece.Coordinate;
        const deltaX = coord.x - centerPoint.x > 0 ? 1 : -1;
        const deltaY = coord.y - centerPoint.y > 0 ? 1 : -1;
        return deltaX === this.deltaX && deltaY === this.deltaY;
    }
}