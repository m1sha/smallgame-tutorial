import { Rect, Sketch, Sprite, Surface, Time } from "smallgame"
import type { Field } from "./field"
import { Figure } from "./figure"
import colors from "./colors"


export abstract class Shape extends Sprite {
  currentState: number
  readonly stateCount: number
  readonly figures: Figure[]

  col: number = 0
  row: number = 0

  readonly cellWidth: number
  readonly cellHeight: number

  readonly images: Surface[]
  readonly color: string

  readonly field: Field

  finished: boolean = false

  moveDownSpeed = 2.8
  fastMoveDownSpeed = 30
  leftRightMoveSpeed = 0.05

  constructor (stateCount: number, cellWidth: number, cellHeight: number, color: string, field: Field) {
    super()
    this.currentState = 0
    this.stateCount = stateCount
    this.figures = []
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.images = new Array()
    this.color = color
    this.field = field
  }

  get figure () { return this.figures[0 | this.currentState] }

  update () {
    this.image = this.images[0 | this.currentState]
    this.rect = this.image.rect

    if (this.finished) return
    
    if (this.col < 0) this.col = 0
    if (this.col + this.figure.cols > this.field.cols) this.col = this.field.cols - this.figure.cols

    this.rect.y = (0 | this.row) * this.cellHeight
    this.row += this.moveDownSpeed * Time.deltaTime
    this.rect.x = (0 | this.col) * this.cellWidth

    if (this.field.check(this.figure, 0 | this.row, 0 | this.col, this.color)) {
      this.finished = true
    }
  }

  moveLeft () {
    if (this.canMove('left')) 
      this.col -= this.leftRightMoveSpeed
  }

  moveRight () {
    if (this.canMove('right')) 
      this.col += this.leftRightMoveSpeed
  }

  fastMoveDown () {
    this.row += this.fastMoveDownSpeed * Time.deltaTime
  }

  rotate () {
    this.currentState++

    if (this.currentState >= this.stateCount) 
      this.currentState = 0
  }

  protected createImages () {
    for (const fig of this.figures) {
      const surface = new Surface(this.cellWidth * fig.cols, this.cellHeight * fig.rows)
      const sketch = new Sketch()
      this.images.push(surface)

      for (let i = 0; i < fig.rows; i++) {
        for (let j = 0; j < fig.cols; j++) {
          if (fig.data[i * fig.cols + j]) {
            sketch.roundedrect({ fill: this.color, stroke: '#585858' }, new Rect(j * this.cellWidth, i * this.cellHeight, this.cellWidth, this.cellHeight ), 4)
          }
        }  
      }

      sketch.draw(surface)
    }
  }

  private canMove(dir: 'left' | 'right') {
    const col = (0 | this.col) + (dir === 'left' ? -1 : 1)
    const row = (0 | this.row) 
    const figCol =  dir == 'left' ? 0: this.figure.cols - 1
    let can = true
    for (let i = 0; i < this.figure.rows; i++) {
      const fv = this.field.getValue(row + i, col + figCol)
      const av = this.figure.getCell(i, figCol)
      if (av && fv) {
        can = false
        break
      }
    }
    return can
  }

  static create (cellWidth: number, cellHeight: number, field: Field): Shape {
    let result: Shape | null = null
    const index =  (0 | Math.random() * 7) + 1
    switch (index) {
      case 1: result = new FirstShape(cellWidth, cellHeight, field); break
      case 2: result = new SecondShape(cellWidth, cellHeight, field); break
      case 3: result = new ThirdShape(cellWidth, cellHeight, field); break
      case 4: result = new FourthShape(cellWidth, cellHeight, field); break
      case 5: result = new FivethShape(cellWidth, cellHeight, field); break
      case 6: result = new SixthShape(cellWidth, cellHeight, field); break
      case 7: result = new SeventhShape(cellWidth, cellHeight, field); break
    }
    if (!result) throw new Error('index is out range.')
    result.createImages()
    result.update()
    return result
  }
}

class FirstShape extends Shape {
  constructor (cellWidth: number, cellHeight: number, field: Field) {
    super(2, cellWidth, cellHeight, colors[1], field)

    this.figures.push(new Figure([
      1,  
      1,  
      1,  
      1 
    ], 1, 4 ))
    
    this.figures.push(new Figure([
      1, 1, 1, 1
    ], 4, 1 ))
  }
}

class SecondShape extends Shape {
  constructor (cellWidth: number, cellHeight: number, field: Field) {
    super(1, cellWidth, cellHeight, colors[2], field)

    this.figures.push(new Figure([
      1, 1,
      1, 1
    ], 2, 2 ))
  }
}

class ThirdShape extends Shape {
  constructor (cellWidth: number, cellHeight: number, field: Field) {
    super(4, cellWidth, cellHeight, colors[3], field)

    this.figures.push(new Figure([
      0, 1,
      0, 1,
      1, 1
    ], 2, 3 ))

    this.figures.push(new Figure([
      1, 0, 0,
      1, 1, 1
    ], 3, 2  ))

    this.figures.push(new Figure([
      1, 1,
      1, 0,
      1, 0
    ], 2, 3  ))

    this.figures.push(new Figure([
      1, 1, 1,
      0, 0, 1
    ], 3, 2 ))
  }
}


class FourthShape extends Shape {
  constructor (cellWidth: number, cellHeight: number, field: Field) {
    super(4, cellWidth, cellHeight, colors[4], field)
   
    this.figures.push(new Figure([
      1, 0,
      1, 0,
      1, 1
    ], 2, 3  ))

    this.figures.push(new Figure([
      1, 1, 1,
      1, 0, 0
    ], 3, 2  ))

    this.figures.push(new Figure([
      1, 1,
      0, 1,
      0, 1
    ], 2, 3  ))

    this.figures.push(new Figure([
      0, 0, 1,
      1, 1, 1
    ], 3, 2  ))
   
  }
}

class FivethShape extends Shape {
  constructor (cellWidth: number, cellHeight: number, field: Field) {
    super(2, cellWidth, cellHeight, colors[5], field)

    this.figures.push(new Figure([
      0, 1, 1,
      1, 1, 0
    ], 3, 2))

    this.figures.push(new Figure([
      1, 0,
      1, 1,
      0, 1
    ], 2, 3))
  }
}

class SixthShape extends Shape {
  constructor (cellWidth: number, cellHeight: number, field: Field) {
    super(2, cellWidth, cellHeight, colors[6], field)

    this.figures.push(new Figure([
      1, 1, 0,
      0, 1, 1
    ], 3, 2))

    this.figures.push(new Figure([
      0, 1,
      1, 1,
      1, 0,
    ], 2, 3))
  }
}

class SeventhShape extends Shape {
  constructor (cellWidth: number, cellHeight: number, field: Field) {
    super(4, cellWidth, cellHeight, colors[7], field)

    this.figures.push(new Figure([
      1, 1, 1,
      0, 1, 0,
    ], 3, 2 ))

    this.figures.push(new Figure([
      0, 1,
      1, 1,
      0, 1,
    ], 2, 3))
    
    this.figures.push(new Figure([
      0, 1, 0,
      1, 1, 1
    ], 3, 2 ))

    this.figures.push(new Figure([
      1, 0,
      1, 1,
      1, 0
    ], 2, 3))
  }
}