import { Rect, Sketch, Sprite } from "smallgame";

export class Flag extends Sprite {
  constructor (color: string) {
    super() 

    this.image = new Sketch()
    .rect({ fill: '#aa6f02ff' }, new Rect(20, 0, 10, 200))
    .rect({ fill: '#a06902ff' }, new Rect(20, 0, 2, 200))
    .rect({ fill: '#a06902ff' }, new Rect(28, 0, 2, 200))
    .rect({ fill: color }, new Rect(30, 0, 70, 40))
    .rect({ fill: '#525252ff' }, new Rect(0, 200, 50, 20))
    .toSurface()

    this.rect = this.image.rect
  }
}