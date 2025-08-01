import { Rect, Sketch, Sprite, Surface } from "smallgame"
import type { Figure } from "./figure"
import colors from "./colors"

export class Field extends Sprite {
  private score_float: number = 0.0
  rows = 20
  cols = 10
  map: number []
  
  w: number
  h: number
  cellWidth: number
  cellHeight: number

  score: number = 0

  constructor (rows: number, cols: number, cellWidth: number, cellHeight: number) {
    super()
    this.rows = rows
    this.cols = cols
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.map = new Array<number>(rows * cols)
    this.map.fill(0)
    
    this.w = cellWidth * this.cols
    this.h = cellHeight * this.rows

    this.image = new Surface(this.w, this.h)
    this.rect = this.image.rect

    //
    this.update()
  }

  update(): void {
    this.removeFullLines()
    this.image!.fill('tomato')
    const sketch = new Sketch()  
    for (let i = 0; i< this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const colorIndex = this.map[i * this.cols + j]
        sketch.rect({ fill: colors[0], stroke: '#2c2c2c' }, new Rect(j * this.cellWidth, i * this.cellHeight, this.cellWidth, this.cellHeight ))
        if (colorIndex > 0) {
          sketch.roundedrect({ fill: colors[colorIndex], stroke: '#585858'  }, new Rect(j * this.cellWidth, i * this.cellHeight, this.cellWidth, this.cellHeight ), 4)
        }
      } 
    }
    sketch.draw(this.image!)
  }

  isOverflow () {
    for (let i = 0; i < this.cols; i++) {
      if (this.map[i]) return true
    }
    return false
  }

  check (fig:  Figure, row: number, col: number, color: string) {
    if (row + fig.rows > this.rows)  {
      this.setFigure(fig, row - 1, col, color)
      return true
    }

    for (let i = 0; i < fig.rows; i++ )
      for (let j = 0; j < fig.cols; j ++) {

      const fieldCell = this.getValue(row + fig.rows - i -1, col + j)
      const figCell = fig.getCell((fig.rows -i -1), + j)
      
      if (fieldCell > 0 && figCell === 1){
        this.setFigure(fig, row -1 , col, color)
        return true
      }
    }

    return false
  }

  removeFullLines () {
    let n = 0
    for (let i = 0; i < this.rows; i++) {
      if (this.checkRow(i)) {
        this.clearRow(i)
        this.shiftLinesDown(i)
        n++
      }
    }

    this.score += 100 * n * n
  }

  updateScore () {
    this.score_float += 0.1
    if (this.score_float > 1) {
      this.score += 1
      this.score_float = 0
    }
  }


  private setFigure(fig:  Figure, row: number, col: number, color: string) {
    for (let i = row; i< row + fig.rows; i++) {
      for (let j = col; j < col + fig.cols; j++) {
        if (this.map[i * this.cols + j] === 0) {
          const value = fig.getCell(i - row, j - col)
          this.map[i * this.cols + j] = value ? colors.indexOf(color) : 0
        }
          
      }
    }
  }

  getValue(row: number, col: number) {
    return this.map[row * this.cols + col]
  }

  private setValue(row: number, col: number, value: number) {
    this.map[row * this.cols + col] = value
  }

  private checkRow(row: number) {
    const startpos = row * this.cols
    for (let i = 0; i < this.cols; i++) {
      if (!this.map[startpos + i]) return false
    }
    return true
  }

  private clearRow(row: number) { 
    const startpos = row * this.cols
    for (let i = 0; i < this.cols; i++) {
      this.map[startpos + i] = 0
    }
  }

  private shiftLinesDown(row: number) {
    const getrow = (n: number) => {
      const result = new Array<number>()
      const startpos = n * this.cols
      for (let i = 0; i < this.cols; i++) {
        result.push(this.map[startpos + i])
      }
      return result
    }

    const setrow = (n: number, values: any[]) => {
      const startpos = n * this.cols
      for (let i = 0; i < this.cols; i++) {
        this.map[startpos + i] = values[i]
      }
    }

    for (let i = row; i > 0; i--){
      const values = getrow(i - 1)
      setrow(i, values)
      
    }
  }
}