import { MemSurface, Point, Rect, Size, Surface } from "smallgame"
import { Renderer } from "./renderer"
import { ITileMap } from "./tile-map"


export class TiledSurface {
  private renderer: Renderer
  readonly rect: Rect
  readonly image: MemSurface

  constructor (size: Size, readonly map: ITileMap, tileSize: Size, zoom: number = 1, offset: Point = Point.zero) {
    this.rect = Rect.size(size)
    this.image = new MemSurface(size)
    this.renderer = new Renderer(size, tileSize, zoom, offset)
  }

  addTileSheet (tileSheet: Surface) {
    this.renderer.tileSheet = tileSheet
   
  }

  update () {
    
  }

  render () {
    this.renderer.data(this.map)
    this.renderer.render()
    this.image.clear()
    this.image.blit(this.renderer.surface, this.renderer.surface.rect)
  }
}