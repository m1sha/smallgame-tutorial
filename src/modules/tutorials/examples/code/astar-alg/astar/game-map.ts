import { Rect, Sketch, Surface, TPoint } from "smallgame"

export class MapSource {
  readonly map
  readonly my
  readonly mx
  readonly dx
  readonly dy
  

  constructor (public width: number, public height: number, data: number[][]) {
    this.map = data
    this.mx = this.map[0].length
    this.my = this.map.length
    this.dx = 0 | this.width / this.mx 
    this.dy = 0 | this.height / this.my
  }
  
  get (y: number, x: number): number {
    return this.map[y][x]
  }

  find_ij(val: number): [number, number] {
    for (let i =0; i < this.my; i++)
      for (let j =0; j < this.mx; j++)
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

  toSurface () {
    const { dx, dy } = this
    const surface = new Surface(this.width, this.height)
    const sketch = new  Sketch()
    for (let i = 0; i < this.my; i++) {
      for (let j = 0; j < this.mx; j++) {
        const rect = new Rect(dx * j, dy * i, dx, dy)
        const val = this.map[i][j]
        let color = '#cececeff'
        if (val === 1) color = '#353431ff'
        if (val === 2) color = '#1300bbff'
        if (val === 3) color = '#11661cff'
        if (val === 4) color = '#f8ffddff'
        if (val === 5) color = '#d0ecfcff'
        
        sketch.rect({ fill: color, stroke: '#1a1a1a52' }, rect)
      }  
    }

    sketch.draw(surface)
    return surface
  }
    
}