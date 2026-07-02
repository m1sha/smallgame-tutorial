import { Rect, Sketch, Surface } from "smallgame"

export class GameField {
  surface: Surface
  
  constructor (private rows: number, private cols: number, private cellSize: number) {
    this.surface = this.createField()
  }

  private createField () {
    const { rows, cols, cellSize } = this
    const sketch = new Sketch()
    sketch.defineStyle('rect', { fill: '#222222ee', stroke: '#888', lineWidth: 1, paintOrder: 'stroke' })
    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cols; j++){
        sketch.rect('rect', new Rect(cellSize * j +1, cellSize * i +1, cellSize, cellSize))
      }  
    }
    return sketch.toSurface()
  }
}