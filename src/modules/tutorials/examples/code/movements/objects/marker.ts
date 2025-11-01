import { Sprite, Surface, setSize, Point, Rect, Sketch, TPoint } from "smallgame"

export class Marker extends Sprite {
  private normalImg: Surface
  private hoverImg: Surface
  size = setSize(10, 10)
  hovered = false
  constructor (private point: Point) {
    super()

    this.rect = Rect.fromCenter(point, this.size.width, this.size.height)
    
    this.normalImg = new Sketch()
      .circle({ fill: '#4a4a86ff' }, this.rect.center, this.rect.width / 2)
      .toSurface()
    this.hoverImg = new Sketch()
      .circle({ fill: '#787899' }, this.rect.center, this.rect.width / 2)
      .toSurface()

    this.image = this.normalImg
  }

  get collideRect () {
    return this.rect.outline(-20)
  }

  protected update(): void {
    this.image = this.hovered ? this.hoverImg: this.normalImg
  }

  hover () {
    this.hovered = true
  }

  shift (point: TPoint) {
    this.rect.shiftSelf(point)
    this.point.shiftSelf(point)
  }
}
