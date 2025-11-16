import { GMath, Point, Sketch, Sprite, Surface, Time } from "smallgame"
import { easeInBounce, easeInElastic, easeInOutSine, easeInQuad, easeInSine, easeOutBounce } from "../movements/func"

export class Missile extends Sprite {
  constructor (private startPos: Point, img: Surface, private speed: number) {
    super()

    this.image = img //new Sketch().circle({ fill: '#990e1aff' }, new Point(12, 12), 12).toSurface(24, 24)
    this.rect = this.image.rect
    this.rect.center = startPos
  }

  private goal = 6

  private t = 0
  protected update(): void {
    if (this.t < 1) this.t += Time.deltaTime * this.speed
    this.rect.y = GMath.lerp(this.startPos.y, this.goal, easeOutBounce(this.t))
  }
}