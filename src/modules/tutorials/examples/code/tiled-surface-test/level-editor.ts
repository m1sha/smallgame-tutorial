import { GameEvent, Keys, Size, Surface } from "smallgame"
import { createTileMap, TiledSurface } from "../../../../shared"
import { Array2D } from "../../../../../utils"
import { IInputDelegate } from "../../../../shared/viewer/input-delegate"

export class LevelEditor implements IInputDelegate {
  tiledSurface: TiledSurface | null = null

  constructor (private img: Surface, private tileSize: Size, private selfSize: Size, containerSize: Size) {
    
  }

  get image () {
    return this.tiledSurface!.image
  }
  get rect () {
    return this.tiledSurface!.rect
  }

  draw (frame: Surface) {
    frame.blit(this.image, this.rect.shift(300, 80))
  }

  update () {
    const dx = this.img.width / this.tileSize.width 
    const getTile = (i: number, j: number) => Array2D.toIndex(i, j, dx) 
    
    const map = createTileMap(this.tileSize, 3, 3, [
      0, 1, 2,
      getTile(1, 0), getTile(1, 1), getTile(1, 2),
      getTile(2, 0), getTile(2, 1), getTile(2, 2),
    ])

    this.tiledSurface = new TiledSurface(this.selfSize, map)
    this.tiledSurface.addTileSheet(this.img)
    this.tiledSurface.render()
  }

  input (ev: GameEvent, owner: { cursor: string }) {

  }

  keyPressed (keys: Keys) {

  }
}