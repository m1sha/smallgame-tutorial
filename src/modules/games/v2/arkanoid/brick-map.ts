import { Array2D } from "smallgame/src/utils";
import { Brick } from "./brick";
import { Point, Rect, Size } from "smallgame";

export class BrickMap {
  bricks: Brick[] = []

  constructor (readonly map: Array2D<number>, readonly brickSize: Size, readonly bricksGap: Point, readonly bricksStartPos: Point) {
    for (let i = 0; i < map.rows; i++) {
      for (let j = 0; j < map.cols; j++) {
        const position = new Point(j * brickSize.width + bricksGap.x * j + bricksStartPos.x, i  * brickSize.height + bricksGap.y * i + bricksStartPos.y)
        const brick = new Brick(position, brickSize)
        this.bricks.push(brick)
      }  
    }
  }
}