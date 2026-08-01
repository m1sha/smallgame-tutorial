import { GameEvent, Keys, Point, Size, Surface } from "smallgame"
import { createTileMap, TiledSurface } from "../../../../shared"
import { Array2D } from "../../../../../utils"
import { IInputDelegate } from "../../../../shared/viewer/input-delegate"
import { TilesCursor } from "./tiles-cursor"

export class LevelEditor implements IInputDelegate {
  private sOffest = new Point(300, 20)
  private cursor: TilesCursor | null = null
  private cursorPos: Point = Point.zero
  tiledSurface: TiledSurface | null = null
  zoom = 3

  cols: number
  rows: number

  constructor (private img: Surface, private tileSize: Size, private selfSize: Size, containerSize: Size) {
    this.cols = 0 | this.img.width / this.tileSize.width 
    this.rows = 0 | this.img.height / this.tileSize.height 
  }

  get image () {
    return this.tiledSurface!.image
  }
  get rect () {
    return this.tiledSurface!.rect
  }

  draw (frame: Surface) {
    frame.blit(this.image, this.rect.shift(this.sOffest))

    if (this.cursor) {
      frame.blit(this.cursor.surface, this.cursor.surface.rect.move(this.cursorPos).scalesize(this.zoom))
    }
  }

  update () {
    const dx = this.img.width / this.tileSize.width 
    const getTile = (i: number, j: number) => Array2D.toIndex(i, j, dx) 
    
    const map = createTileMap(this.tileSize, this.rows, this.cols, [])

    const data = [
      0, 1, 1, 1, 1, 1, 1, 2,
      getTile(1, 0), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 2),
      getTile(1, 0), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 2),
      getTile(1, 0), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 2),
      getTile(1, 0), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 1), getTile(1, 2),
      getTile(2, 0), getTile(2, 1), getTile(2, 1), getTile(2, 1), getTile(2, 1), getTile(2, 1), getTile(2, 1), getTile(2, 2),
    ]
    map.table.set(2,2, data, 6, 8)

    this.tiledSurface = new TiledSurface(this.selfSize, map, this.tileSize, this.zoom)
    this.tiledSurface.addTileSheet(this.img)
    this.tiledSurface.render()
  }

  setCursor (cursor: TilesCursor) {
    this.cursor = cursor
  }

  input (ev: GameEvent, owner: { cursor: string }) {
    console.log('input')
    const sOffest = this.sOffest

    if (ev.type === 'MOUSEMOVE') {
      
     const pos = this.tileSize.inverse(ev.pos.x, ev.pos.y).toPoint().int().scaleSelf(this.tileSize.width, this.tileSize.height)
     console.log(`Before ${ev.pos.x}  ${ev.pos.y}`)
     console.log(`After ${pos.x}  ${pos.y}`)
      this.cursorPos.moveSelf(ev.pos)
    }

    if (ev.type === 'MOUSEDOWN') {
      const pos = ev.pos.shift(sOffest.neg()).scale(1/ this.zoom)
      const { width: j, height: i } = this.tileSize.inverse(pos.x, pos.y).int()
      const index = Array2D.toIndex(i, j, this.cols)
      console.log(`i ${i}; j ${j}; index: ${index}`)
      

      debugger
      const data = this.cursor.data
      if (!data) return
      this.tiledSurface.map.table.set(i, j, data.data, data.rows, data.cols)
      this.tiledSurface.render()
    }
  }

  keyPressed (keys: Keys) {

  }
}