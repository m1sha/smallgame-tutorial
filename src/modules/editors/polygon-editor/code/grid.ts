import { setPoint, Sketch, Sprite } from "smallgame"

export class Grid extends Sprite {
  private sketch: Sketch
  readonly width: number
  readonly height: number
  visible: boolean = true

  constructor (width: number, height: number) {
    super()
    this.width = width
    this.height = height

    const rows = 30
    const cols = 20

    const rows2 = 60
    const cols2 = 60

    const cellWidth = width / cols
    const cellHeight = height / rows

    const cell2Width = width / cols2
    const cell2Height = height / rows2

    this.sketch = new Sketch()
    this.sketch.defineStyle('grid-style', { fill: '#e2e2e2' })
    this.sketch.defineStyle('grid-style2', { fill: '#f0f0f0' })

    for (let i = 0; i < rows2; i++) {
      this.sketch.hline('grid-style2', setPoint(0, i * cell2Height), width)
    }

    for (let j = 0; j < cols2; j++) {
      this.sketch.vline('grid-style2', setPoint(j * cell2Width, 0), height)
    } 

    for (let i = 0; i < rows; i++) {
      this.sketch.hline('grid-style', setPoint(0, i * cellHeight), width)
    }

    for (let j = 0; j < cols; j++) {
      this.sketch.vline('grid-style', setPoint(j * cellWidth, 0), height)
    } 

    this.image = this.sketch.toSurface(width, height)
    this.rect = this.image.rect
  }

  protected update(): void {
    if (this.visible) {
      this.image = this.sketch.toSurface(this.width, this.height)
    } else {
      this.image?.clear()
    }
  }
  
}