import { Rect, Size, TSize } from "smallgame";



export class SeparateGrid<T extends { rect: Rect }> {
  private cellSize: TSize
  private map: Map<number, T[]> = new Map()

  constructor (mapSize: TSize, public rows: number, public cols: number ) {
    this.cellSize = new Size(mapSize.width / cols, mapSize.height / rows)
  }

  update (objects: T[]) {
    this.map.clear()
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.map.set(row * this.cols + col, [])
      }
    }

    objects.forEach(object => {
      const rect = object.rect
      const col = 0 | (rect.x / this.cellSize.width)
      const row = 0 | (rect.y / this.cellSize.height)
      this.map.get(row * this.cols + col)?.push(object)
    })
  }

  getNeighbors (object: T) {
    const col = 0 | (object.rect.x / this.cellSize.width)
    const row = 0 | (object.rect.y / this.cellSize.height)
    return this.map.get(row * this.cols + col) ?? []
  }

  clear () {
    this.map = new Map()
  }
}