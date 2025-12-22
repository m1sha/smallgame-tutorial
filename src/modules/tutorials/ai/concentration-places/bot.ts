import { GMath, Point, Rect, Sketch, Sprite, Time } from "smallgame"
import { PolarPoint } from "./polar"
import { easeOutBounce } from "../../examples/code/movements/func"
import { SeparateGrid } from "./speratate-grid"
import { Model } from "./model"

export class Bot extends Sprite {
  grid: SeparateGrid | null = null
  private goal = Point.zero
  model: Model | null = null
  private current = Point.zero
  private t = 1

  constructor (color: string) {
    super()
    const rect = Rect.size(8, 8)
    this.image = new Sketch().circle({ fill: color, stroke: color }, rect.center, rect.width / 2 - 2).toSurface()
    this.rect = this.image.rect
  }

  setGoalPosition(ppb: PolarPoint) {
    this.goal = Point.from(ppb.point)
  }

  setStartPosition(ppb: PolarPoint) {
    this.rect.center = ppb.point
    this.current = Point.from(ppb.point)
  }

  private a = -Math.random() * 0.025 + 0.095
  forward = false

  protected update (): void {
    //if (this.t < 1) {
      this.t += this.a * Time.deltaTime
    //}
    if (this.t > 1) {
      this.forward = false
      this.a *= -1
    }
    if (this.t < 0) {
      this.forward = true
      this.a *= -1
    }
    const rect = this.rect.clone()
    const pos = GMath.lerp(this.current, this.goal, easeOutBounce(this.t))
    rect.center = pos

    const neighbors = this.grid!.getNeighbors(rect)
    
    for (const neighbor of neighbors) {
      if (neighbor.equals(this.rect)) {
        continue
      }

      if (neighbor.overlaps(this.rect)) {
       this.t -= this.a * Time.deltaTime

       //this.rect.x = -this.a * Time.deltaTime
       
       return
      }
    }

    this.rect.moveSelf(rect)
  }
}