import { GameEvents, Key, Surface } from "smallgame"
import { Shape } from "./shape"
import { Field } from "./field"
import { UI } from "./ui"
import type { Keys } from "smallgame/src/keys/keys"

export type FrameAction = (event: GameEvents, key: Keys) => Surface


export class Tetris {
  readonly ui: UI = new UI()
  state: 'playing' | 'paused' | 'gameover' | 'not-started' = 'playing'
  score: number = 0
  lines: number = 0
  level: number = 0
  rows: number = 20
  cols: number = 10
  shapes: Shape[] = []
  visibleShapeCount: number = 3
  cellWidth =  0
  cellHeight = 0

  private screen: Surface
  private field: Field
  private shape:  Shape

  constructor (public width: number, public height: number) {
    this.cellWidth =  0 | ((width - 0) / this.cols) * 1/2.5
    this.cellHeight = 0 | (height - 0) / this.rows 
    this.field = new Field(this.rows, this.cols, this.cellWidth, this.cellHeight)
    this.fillShapeList(this.field)
    this.shape = this.shapes.shift()!
    this.screen = new Surface(width, height)
  }

  nextFrame (events: GameEvents, key: Keys) {
    const { screen, field, shape } = this

    if (this.state !== 'playing') {
      for (const event of events.get()){
        if (event.type === 'KEYDOWN') {
          if (event.key === Key.PAUSE)
            if (this.state === 'paused') this.state = 'playing'
        }
      }

      return screen
    }

    if (this.field.isOverflow()) {
      this.ui.drawGameOver(this.screen)
      this.state = 'gameover'
      return screen
    }
    
    const keys = key.getPressed()
    if (keys[Key.LEFT]) shape.moveLeft()
    if (keys[Key.RIGHT]) shape.moveRight()
    if (keys[Key.DOWN]) {
      shape.fastMoveDown()
      field.updateScore()
    }

    for (const event of events.get()){
      if (event.type === 'KEYDOWN') {
        if (event.key === Key.SPACE){
          shape.rotate()
        }
          
        if (event.key === Key.PAUSE)
          this.state = 'paused'
      }
      
    }

    screen.clear()
    screen.fill('#444')
    field.image.blit(shape.image!, shape.rect)
    screen.blit(field.image!, field.rect.move(180, 5))
    shape.update()
    field.update()
    
    this.ui.drawScore(screen, field.score)
    this.ui.drawScoreBoard(screen, this.shapes, this.cellWidth, this.cellHeight)
  
    
    if (shape.finished) {
      this.createShape(field)
      this.shape = this.shapes.shift()!
      
    }

    return screen
  }

  private fillShapeList(field: Field) {
    for (let i = 0; i < this.visibleShapeCount + 1; i++) 
      this.createShape(field)
  }

  private createShape (field: Field) {
    const shape = Shape.create(this.cellWidth, this.cellHeight, field)
    shape.col = 0 | field.cols / 2 - 1
    shape.row = -shape.figure.rows
    this.shapes.push(shape)
  }

}