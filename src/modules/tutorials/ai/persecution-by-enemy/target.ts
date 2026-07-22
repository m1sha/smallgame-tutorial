import { loadImage, Point, Rect, Surface } from "smallgame"

export class Target {
  private img: Surface
  private heroRect = Rect.size(32, 32)
  hovered = false
  startMove = false
  
  async load () {
    this.img = await loadImage('platformer/food/meat2/02.png')
  }

  get image () {
    this.img.rect.absCenter = this.heroRect.absCenter
    return this.img
  }

  get position () {
    return this.heroRect.absCenter
  }

  setPos (pos: Point) {
    this.heroRect.moveSelf(pos, 'top-right').shiftSelf(0, -1)
  }

  hittest (pos: Point) {
    const isPointIn = this.img.rect.containsPoint(pos)
    this.hovered = this.startMove ? true : isPointIn
    return isPointIn
  }

  move (pos: Point) {
    this.heroRect.shiftSelf(pos.x, 0)
  }
}