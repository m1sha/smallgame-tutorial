import { Point, Size } from "smallgame"

export class Brick {
  constructor (readonly position: Point, readonly size: Size) {

  }

  alive = true

  get x () { return this.position.x }
  get y () { return this.position.y }
  get width () { return this.size.width }
  get height () { return this.size.height }
}