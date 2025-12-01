import { Rect, Size, TSize } from "smallgame";

export class SeparateGrid {
  cellSize: TSize
  map: Map<string, Rect[]> = new Map()

  constructor (mapSize: TSize, public rows: number, public cols: number ) {
    this.cellSize = new Size(mapSize.width / cols, mapSize.height / rows)
  }



  update (sprites: { rect: Rect }[]) {
    this.map.clear()
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.rows; col++) {
        this.map.set(row + ':' +col, [])
      }
    }

    sprites.forEach(sprite => {
      const rect = sprite.rect
      const col = 0 | (rect.x / this.cellSize.width)
      const row = 0 | (rect.y / this.cellSize.height)
      this.map.get(row + ':' +col)?.push(rect)
    })
    
  }

  getNeighbors (rect: Rect) {
    const col = 0 | (rect.x / this.cellSize.width)
    const row = 0 | (rect.y / this.cellSize.height)
    return this.map.get(row + ':' +col) ?? []
  }
}