import { Array2D } from "smallgame/src/utils";
import { Brick } from "./brick";
import { Point, Rect, Size } from "smallgame";

export class BrickMap {
  bricks: Brick[] = []
  get allBroken () { return !this.bricks.some(p => p.alive && !p.immortal)}

  get brokenCount () {
    return this.bricks.filter(p => !p.alive && !p.immortal).length
  }

  get count () {
    return this.bricks.length
  }

  constructor (readonly map: Array2D<number>, readonly brickSize: Size, readonly bricksGap: Point, readonly bricksStartPos: Point) {
    for (let i = 0; i < map.rows; i++) {
      for (let j = 0; j < map.cols; j++) {
        const v = map.get(i, j)
        const position = new Point(j * brickSize.width + bricksGap.x * j + bricksStartPos.x, i  * brickSize.height + bricksGap.y * i + bricksStartPos.y)
        const brick = new Brick(position, brickSize)
        brick.immortal = v === 2
        this.bricks.push(brick)
      }  
    }
  }
}