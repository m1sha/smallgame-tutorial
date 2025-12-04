import { Rect, Sketch, Surface } from "smallgame"
import { Game } from "../game"

export class GameFood {
  private appleSurface: Surface
  #surface: Surface
  
  constructor (width: number, height: number, private game: Game, private cellSize: number) {
    this.appleSurface = this.createApply()
    this.#surface = new Surface(width, height)
  }

  private createApply() {
    const sketch = new Sketch()
    
    sketch.defineStyle('green', { fill: '#3b3', stroke: '#b22', lineWidth: 1, paintOrder: 'stroke' })
    sketch.defineStyle('greenOut', { fill: '#3f3' })
    sketch.defineStyle('fruit', { fill: '#a33', stroke: '#b22', lineWidth: 1, paintOrder: 'stroke' })
    sketch.defineStyle('blick', { fill: '#f88'  })
    
    sketch.roundedrect('fruit', new Rect(0, 0, this.cellSize, this.cellSize), [2, 2, 9, 9])
    sketch.roundedrect('green', new Rect(this.cellSize / 2 - 6, 0, 12, 4), [2, 2, 9, 9])
    sketch.rect('greenOut', new Rect(this.cellSize / 2 - 6, 3, 6, 3))
    sketch.rect('blick', new Rect(this.cellSize / 2 + 3, this.cellSize / 2 -  2, 4, 4))

    const appleSurface = sketch.toSurface()
    return appleSurface
  }
  
  private drawFood () {
    this.#surface.clear()
    const cellSize = this.cellSize
    const fruits = this.game.field.fruits
    
    for (let i = 0; i < fruits.length; i++) {
      const { col, row } = fruits[i]
      //sketch.rect('fruit', new Rect(cellSize * col, cellSize * row, cellSize, cellSize))
      this.#surface.blit(this.appleSurface, new Rect(cellSize * col, cellSize * row, cellSize, cellSize) )
    }

    return this.#surface
  }

  setLevel(level: number) {
    this.game.updateSpeed(level)
  }

  get surface () {
    return this.drawFood()
  }
}