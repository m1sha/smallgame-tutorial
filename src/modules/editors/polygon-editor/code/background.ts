import { Sprite, Surface } from "smallgame";

export class Background extends Sprite {
  #surface: Surface
  visible: boolean = true

  constructor(width: number, height: number) {
    super()
    this.#surface = new Surface(width, height)
  }

  setImage (surface: Surface) { 
    const rect = surface.rect
    rect.moveSelf(this.#surface.rect.center, 'center-center')
    this.#surface.blit(surface, rect) 
  }

  clear () { this.#surface.clear() }

  protected update(): void {
    this.image = this.#surface
    this.rect = this.#surface.rect
  }
}