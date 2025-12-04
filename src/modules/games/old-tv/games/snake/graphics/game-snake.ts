import { Rect, Sketch } from "smallgame"
import { Game } from "../game"

export class GameSnake {
  constructor (private game: Game, private cellSize: number) {

  }

  private drawSnake () {
      const cellSize = this.cellSize
      const sketch = new Sketch()
      sketch.defineStyle('snake', { fill: '#777', stroke: '#aaa', lineWidth: 1, paintOrder: 'stroke' })
      const snake = this.game.snake
      for (let i = 0; i < snake.cells.length; i++) {
        const { col, row } = snake.cells[i]
        sketch.rect('snake', new Rect(cellSize * col, cellSize * row, cellSize, cellSize))
      }
      //sketch.rect({ stroke: 'red', lineWidth: 3 }, sketch.bounds)
      debugger
      return sketch.toSurface()
  }

  get surface () {
    return this.drawSnake()
  }
}