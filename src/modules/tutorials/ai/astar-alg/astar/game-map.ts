import { TPoint, TSize } from "smallgame"

export class MapSource {
  readonly map
   

  constructor (data: number[][]) {
    this.map = data
   
  }

 

  get rows ()  { return this.map.length }
  get cols ()  { return this.map[0].length }

  
  
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
    if (this.map[cell.y][cell.x] !== 0) return
    const [y, x] = this.find_ij(3)
    this.map[y][x] = 0
    this.map[cell.y][cell.x] = 3
  }

  setValue (cell: TPoint, value: number) {
    this.map[cell.y][cell.x] = value
  }

  
    
}