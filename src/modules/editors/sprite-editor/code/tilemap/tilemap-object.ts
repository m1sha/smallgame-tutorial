import { MemSurface, Rect, Sketch, Surface, TRect, TSize } from "smallgame"
import { DrawableObject } from "../core"
import { TilemapDisplayObject } from "./tilemap-display-object"

export class TilemapObject extends DrawableObject {
  constructor (surface: Surface, private tileSize: TSize, rect: TRect, private cols: number, private rows: number) {
    super()

    this.surface = new MemSurface(surface.rect.size)
    this.surface.blit(surface, surface.rect)

    this.rect = Rect.from(rect)
  }

  draw (screen: Surface) {
    Sketch.new().rect({ fill: '#ffffff65' }, this.surface.rect).draw(screen)
  }

  toDisplay (): TilemapDisplayObject {
    return {
      id: '',
      name: 'Tilemap Object',
      hidden: false,
      type: 'tilemap-object'
    }
  }
}