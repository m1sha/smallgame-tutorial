import { Group, Rect, Sketch, Sprite, Surface } from "smallgame"
import { sizes } from "./sizes"
import { Box } from "./box"
import { Clock } from "smallgame/src/utils"
import { BoxExplosions } from "./anim/box-explosions"
import { Cells } from "./cells"
import { Boy } from "./boy"

export class Field extends Sprite {
  private boxes: Group<Box>
  private boy: Boy
  private boxExplosions: BoxExplosions
  private bg: Surface | null = null 
  private cells: Cells
  private fieldRect: Rect
  private updateClock: Clock
  ///private task: Task

  constructor (private width: number, private height: number) {
    super()
    this.cells = new Cells(0, 0)
    this.fieldRect = new Rect(0, 0, 1, 1)
    this.boxes = new Group()
    this.boy = new Boy()
    this.boxExplosions = new BoxExplosions()
    this.updateClock = new Clock(() => {
      //this.isLastDownLineFull()
    }, 500, true)
  }

  async create(): Promise<void> {
    const boxSize = sizes.boxSize
    this.fieldRect = sizes.getFieldRect(this.width, this.height)

    this.cells = new Cells(sizes.rows, sizes.cols)
    this.cells.callback = (actionName, id) => this.onCellsCollision(actionName, id) 
    await this.createBoy()

    window.cells = this.cells
    
    const sketch = new Sketch()
    sketch.defineStyle('cell', { stroke: '#333', fill: '#121212', lineWidth: 0.25 })
    sketch.rects('cell', new Rect(this.fieldRect.x, this.fieldRect.y, boxSize, boxSize), sizes.cols, sizes.rows, { skipRows: 1 })  
    
    this.bg = sketch.toSurface()
    this.image = new Surface(this.bg.width, this.bg.height)
    this.rect = this.image.rect
  }

  protected update(): void {
    this.image.clear()
    
    if (this.bg) this.image.blit(this.bg, this.bg.rect)
    
    this.drawBoxes()
    this.drawBoy()
    this.cells.update()
    this.updateClock.tick()
    this.boxExplosions.draw(this.image)
  }

  setBoxOnTopColumn(columnIndex: number, box: Box) {
    const { x, y } = sizes.getFieldRect(this.width, this.height)
    box.rect.moveSelf(x + columnIndex * sizes.boxSize, y)
    box.fieldRect = this.fieldRect
    this.boxes.add(box)
  }

  moveRight () {
    if (this.boy.moving) return
    
    if (this.cells.moveCursorRight()) {
      this.boy.setTarget(sizes.boxSize)
    }
  }
  
  moveLeft () {
    if (this.boy.moving) return
    if (this.cells.moveCursorLeft()) {
      this.boy.setTarget(-sizes.boxSize)
    }
  }
  
  moveUp () {
    this.cells.moveCursorUp()
    this.boy.jump(-sizes.boxSize)
  }

  private drawBoxes () {
    this.boxes.sprites.forEach(box => {
      const { id, colorIndex } = box
      const { row, col } = box.cell
      box.isGrounded = !this.cells.setBox(row, col, id, colorIndex)
      box.draw(this.image)
    })
  }

  private drawBoy () {
    this.boy.draw(this.image)
  }

  private async createBoy () {
    await this.boy.create()
    const { point, isGround } = this.cells.getCursorPosition(sizes.boxSize, this.fieldRect)
    this.boy.position = point
    this.boy.isGrounded = isGround
  }

  private onCellsCollision (actionName: string, boxId: string) {
    const box = this.boxes.find(p => p.id === boxId)
    
    if (!box) {
      console.error(`The box ${boxId} is not found.`)
      return
    }

    switch (actionName) {
      case 'move-right':
        //box.setTarget(sizes.boxSize)
        box.rect.x += 45
        break
      case 'move-left':
        //box.setTarget(-sizes.boxSize)
        box.rect.x -= 45
        break
      case 'die':
        this.boxes.remove(box)
        //this.boy.die()
        break
    }
  }

  //addTask (task: Task) {
  //}
}