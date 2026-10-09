import { Point } from "smallgame"

export class Ball {
  constructor (readonly position: Point, readonly velocity: Point, readonly speed: number, readonly radius: number) {

  }

  move (tick: number) {
    this.position.shiftSelf(this.velocity.scale(this.speed * tick))
  }
}