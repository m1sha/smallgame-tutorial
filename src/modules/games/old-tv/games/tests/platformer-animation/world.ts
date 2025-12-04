import { Rect, Sprite } from "smallgame";

export class World extends Sprite {
  gravity: number = 250

  constructor(width: number, private height: number) {
    super()

    this.rect = Rect.size(width, height)
  }

  isGound (y: number) {
    return y >= this.height - 30
  }
}