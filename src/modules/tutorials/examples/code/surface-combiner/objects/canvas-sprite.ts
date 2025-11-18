import { Sprite, Size, Sketch, Rect } from "smallgame"

export class CanvasSprite extends Sprite {
  constructor (size: Size, private screenRect: Rect) {
    super()

    this.image = new Sketch().rect({ fill: '#fff' }, Rect.size(size)).toSurface()
    this.rect = this.image.rect
    this.rect.center = screenRect.center
  }

  setWidth(val: number) {
    this.rect.width = val
    this.image = new Sketch().rect({ fill: '#fff' }, this.rect).toSurface()
    this.rect.center = this.screenRect.center
  }

  setHeight(val: number) {
    this.rect.height = val
    this.image = new Sketch().rect({ fill: '#fff' }, this.rect).toSurface()
    this.rect.center = this.screenRect.center
  }
}