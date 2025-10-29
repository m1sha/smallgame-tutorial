import { Rect, Surface, TPoint } from "smallgame"
import { BaseObject } from "../base-object"

export class ImageObject extends BaseObject {
  
  readonly type = 'image'
  #surface: Surface
  #img: Surface | null = null
  
  visible: boolean = true
  

  constructor(width: number, height: number) {
    super()
    this.#surface = new Surface(width, height)
  }

  get imageRect () { return this.#img?.rect ?? Rect.zero }

  setImage (surface: Surface) { 
    this.#img = surface
    const rect =  this.#img.rect
    rect.moveSelf(this.#surface.rect.center, 'center-center')
    this.#surface.blit(surface, rect) 
  }
  
  hittest(pos: TPoint): boolean {
    return this.#img?.rect.containsPoint(pos) ?? false
  }

  clear () { this.#surface.clear() }

  protected update(): void {
    this.#surface.clear()
    if (this.#img) this.#surface.blit(this.#img, this.#img.rect) 
    this.image = this.#surface
    this.rect = this.#surface.rect
  }

  collidePoint (pos: TPoint): boolean {
    if (!this.#img) return false
    return this.#img.rect.containsPoint(pos)
  }

  shift (pos: TPoint) {
    if (!this.#img) return

    this.#img.rect.shiftSelf(pos)
  }
  
}