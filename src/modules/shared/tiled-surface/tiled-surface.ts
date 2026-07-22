import { MemSurface, Rect, Size, Surface } from "smallgame"
import { Renderer } from "./renderer"
import { ITileMap } from "./tile-map"


export class TiledSurface {
  private renderer: Renderer
  readonly rect: Rect
  readonly image: MemSurface

  constructor (size: Size, private map: ITileMap) {
    this.rect = Rect.size(size)
    this.image = new MemSurface(size)
    this.renderer = new Renderer(size)
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
    this.image.blit(this.renderer.glSurface, this.renderer.glSurface.rect)
  }
}