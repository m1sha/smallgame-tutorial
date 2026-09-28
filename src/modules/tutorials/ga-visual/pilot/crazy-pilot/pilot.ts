import { Point, Size } from "smallgame";

export class Pilot {
  
  radius: number
  constructor (readonly position: Point, private size: Size) {
    this.radius = size.width * .05
  }

  move(x: number, y: number) {
    if (this.position.x + x - this.radius <= 0) return
    if (this.position.y + y - this.radius <= 0) return
    if (this.position.x + x + this.radius >= this.size.width) return
    if (this.position.y + y + this.radius >= this.size.height) return
    this.position.shiftSelf(x, y)
  }

  
}