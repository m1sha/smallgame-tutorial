import { setPoint, Sketch, Sprite, Time } from "smallgame";

export class Bird extends Sprite {
  accel = 0.2
  v = 0
  dir = 1

  constructor () {
    super()

    const sketch = new Sketch()
    sketch.defineStyle('bird', { fill: 'red' })
    sketch.circle('bird', setPoint(20, 20), 19)

    this.image = sketch.toSurface(40, 40)
    this.rect = this.image.rect
  }


  up () {
    if (this.dir == -1) this.v = 0
    this.dir = 50 * Time.deltaTime
    this.accel = 0.08
  }

  down () {
    if (this.dir == 1) this.v = 0
    this.dir = -20 * Time.deltaTime 
    this.accel = .5   
  }

  protected update(): void {
    this.v += this.accel * this.dir
    this.rect.y += this.v
  }


}