import { Point, Size } from "smallgame"

export class Brick {
  lives = 2
  immortal = false
  constructor (readonly position: Point, readonly size: Size) {

  }

  get alive () { return this.lives >= 1 }

  setHit () {
    this.lives--
  }

  get x () { return this.position.x }
  get y () { return this.position.y }
  get width () { return this.size.width }
  get height () { return this.size.height }
}