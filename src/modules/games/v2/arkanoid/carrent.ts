import { Point, Size } from "smallgame"

export class Carrent {
  constructor (readonly position: Point, readonly velocity: Point, readonly speed: number, readonly size: Size) {

  }

  moveLeft (tick: number) { this.position.x -= this.speed * tick }
  moveRight (tick: number) { this.position.x += this.speed * tick }
}