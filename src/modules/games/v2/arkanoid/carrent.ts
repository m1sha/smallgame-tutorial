import { Point, Size } from "smallgame"

export class Carrent {
  constructor (readonly position: Point, readonly velocity: Point, readonly speed: number, readonly size: Size) {

  }

  moveLeft (tick: number) { this.position.x -= this.speed * tick }
  moveRight (tick: number) { this.position.x += this.speed * tick }

  toLeft () { this.position.x = 1 }
  toRight (width: number) { this.position.x = width - this.size.width - 1 }
}