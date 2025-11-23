import { TPoint, TSize } from "smallgame"

export class MapSource {
  readonly map
   dx
   dy

  constructor (data: number[][], cellSize: TSize) {
    this.map = data
    this.dx = cellSize.width //0 | this.width / this.mx 
    this.dy = cellSize.height //0 | this.height / this.my
  }

  setSize (cellSize: TSize) {
    this.dx = cellSize.width //0 | this.width / this.mx 
    this.dy = cellSize.height 
  }

  get rows ()  { return this.map.length }
  get cols ()  { return this.map[0].length }

  get width () {
    return this.cols * this.dx
  }

  get height () {
    return this.rows * this.dy
  }
  
  get (y: number, x: number): number {
    return this.map[y][x]
  }

  find_ij(val: number): [number, number] {
    for (let i =0; i < this.rows; i++)
      for (let j =0; j < this.cols; j++)
        if (this.map[i][j] == val) return [i, j]
    return [0, 0]
  }

  setGoal (cell: TPoint) {
    if (cell.y < 0 || cell.x < 0) return
    if (cell.y >= this.map.length || cell.x >= this.map[0].length) return
    const [y, x] = this.find_ij(3)
    this.map[y][x] = 0
    this.map[cell.y][cell.x] = 3
  }

  setValue (cell: TPoint, value: number) {
    this.map[cell.y][cell.x] = value
  }

  
    
}