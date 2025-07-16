import { type PointData } from 'pixi.js';

/**
 * Utitlity class for relative positioning.
 */
export class Relative {
    /**
     * Returns a translation of a value between 0 and 1 -> to the actual pixel size.
     * @param x number between 0 and 1
     * @param y number between 0 and 1
     * @returns PointData `{ x: number, y: number }`
     */
    public static set(x: number, y: number): PointData {
        const point = { x, y };

        point.x = window.innerWidth * x;
        point.y = window.innerHeight * y;

        return point;
    }

    public static width(width: number): number {
        return window.innerWidth / width;
    }

    public static height(height: number): number {
        return window.innerHeight / height;
    }
}
