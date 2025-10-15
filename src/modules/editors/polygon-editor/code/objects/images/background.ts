import { Rect, type TShapeStyle, Sketch, Surface, TPoint } from "smallgame"
import { BaseObject } from "../base-object"

export class ImageObject extends BaseObject {
  readonly type = 'image'
  #surface: Surface
  #img: Surface | null = null
  #framSurface: Surface | null = null
  visible: boolean = true
  active = false

  constructor(width: number, height: number) {
    super()
    this.#surface = new Surface(width, height)
  }

  setImage (surface: Surface) { 
    this.#img = surface
    const rect =  this.#img.rect
    rect.moveSelf(this.#surface.rect.center, 'center-center')
    this.#surface.blit(surface, rect) 

    this.createEditFrame(rect)

    if (this.#framSurface && this.active)
      this.#surface.blit(this.#framSurface, this.#framSurface.rect) 
  }

  clear () { this.#surface.clear() }

  protected update(): void {
    this.image = this.#surface
    this.rect = this.#surface.rect

    if (!this.#img) return

    this.image.clear()
    this.#surface.blit(this.#img, this.#img.rect) 

    if (this.#framSurface && this.active)
      this.#surface.blit(this.#framSurface, this.#framSurface.rect) 
  }

  collidePoint (pos: TPoint): boolean {
    if (!this.#img) return false
    return this.#img.rect.containsPoint(pos)
  }

  private createEditFrame (rect: Rect) {
    if (this.#surface.rect.equals(rect) && this.#framSurface) return

    const pickerSize = 8
    const pickerStyle: TShapeStyle = { fill: '#333' }
    const sketch = new Sketch()
    sketch.rect({ stroke: '#333', lineDash: [3,5] }, rect)
    sketch.rect(pickerStyle, Rect.fromCenter(rect.topLeft, pickerSize, pickerSize))
    sketch.rect(pickerStyle, Rect.fromCenter(rect.topRight, pickerSize, pickerSize))
    sketch.rect(pickerStyle, Rect.fromCenter(rect.bottomLeft, pickerSize, pickerSize))
    sketch.rect(pickerStyle, Rect.fromCenter(rect.bottomRight, pickerSize, pickerSize))

    this.#framSurface = sketch.toSurface()
  }
}