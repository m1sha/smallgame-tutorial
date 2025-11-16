import { Point, Sprite, loadImage } from "smallgame"

export class Background extends Sprite {
  pos = Point.zero

  async create(): Promise<void> {
    this.image = await loadImage('space-fighter/Backgrounds/4.png')
    this.rect = this.image.rect
  }

  protected update(): void {
    this.rect.center = this.rect.center.shift(this.pos.neg())
  }
}