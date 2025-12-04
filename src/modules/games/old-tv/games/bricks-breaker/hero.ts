import { Rect, Sketch, Sprite, Surface } from 'smallgame'
import { sizes } from './size'

export class Hero extends Sprite {
  constructor (x: number, y: number) {
    super()
    this.image = new Surface(sizes.platform_width, sizes.platform_height)
    this.rect = new Rect(0, 0, sizes.platform_width, sizes.platform_height)
    const sketch = new Sketch()
    const r = this.rect.clone()
    sketch.rect({ fill: '#111'}, r)
    sketch.circle({ fill: '#a01122'}, r.topLeft, 5)
    sketch.circle({ fill: '#a01122'}, r.topRight, 5)
    sketch.circle({ fill: '#a01122'}, r.bottomLeft, 5)
    sketch.circle({ fill: '#a01122'}, r.bottomRight, 5)
    sketch.draw(this.image)

    this.x = x
    this.y = y
  }

  get x () { return this.rect!.x }
  set x (value: number) { this.rect!.x = value }
  get y () { return this.rect!.y }
  set y (value: number) { this.rect!.y = value }
}