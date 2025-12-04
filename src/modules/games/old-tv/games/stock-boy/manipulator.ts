import { Point, Rect, Sketch, Sprite, Surface, Time } from "smallgame";
import { sizes } from "./sizes";
import { Box } from "./box";

export class Manipulator extends Sprite {
  private tubeRect: Rect
  discharge: boolean = false
  canDelete: boolean = true
  private man: Surface | null  = null
  onDischarge: ((box: Box, index: number, callback: () => void) => void) | null = null
  private lastIndexSolution: number = -1
  
  box: Box
  constructor (private width: number, private height: number, private direction: number, private boxIndex: number) {
    super()
    this.box = new Box(boxIndex)
    this.tubeRect = sizes.getTubeRect(this.width, this.height)
  }

  async create(): Promise<void> {
    await this.box.create()
    

    this.man = this.closed()
    this.image = new Surface(this.man.width, this.man.height)
    this.image.blit(this.man, this.man.rect)
    this.rect = this.man.rect

    this.rect.x = this.direction == -1 ? this.tubeRect.absWidth + sizes.boxSize : this.tubeRect.width - this.tubeRect.absWidth - sizes.boxSize
  }

  protected update(): void {
    
    if (!this.discharge) {
      this.box.draw(this.image)
    }

    if (this.rect.x > this.tubeRect.absWidth + sizes.boxSize) this.direction = -1
    if (this.rect.x < this.tubeRect.width - this.tubeRect.absWidth - sizes.boxSize) this.direction = 1
    this.rect.x += 180 * this.direction * Time.deltaTime
    this.canDelete = !(this.rect.x > this.tubeRect.x && this.rect.x < this.tubeRect.absWidth)
    
    if (!this.discharge && this.rect.x > this.tubeRect.x && this.rect.x < this.tubeRect.absWidth) {
      
      const a = 0 | Math.random() * 12
      const x = this.rect.x - this.tubeRect.x
      const b = 0 | x / (this.tubeRect.width / 12)

      if (this.lastIndexSolution != b) {
        this.discharge = a === b 
        this.lastIndexSolution = b
      }

      if (this.discharge) {
       
        
        if (this.onDischarge) this.onDischarge(this.box, a, () => {
          this.man = this.opened()
          this.image.clear()
          this.image.blit(this.man!, this.man!.rect)
          this.box.isGrounded = false
        })
      }
    } 
  }

  private closed () {
    const sketch = new Sketch()

    const nodeSize = 12
    const startPoint = new Point(this.tubeRect.x, this.tubeRect.absCenter.y)
    
    sketch.circle({ fill: '#a1a1a1', stroke: '#232323', lineWidth: 2 }, startPoint, 8)
    const rect = Rect.fromCenter(startPoint, nodeSize, nodeSize)
    sketch.roundedrect({ fill: '#111'}, rect, [1, 1, 8, 8])

    const hookStartPoint = startPoint.shift(0, nodeSize * 0.5 + 1)
    const hook0Point = new Point(25, 10)
    const hook1Point = new Point(0, 23)
    const left0Point = hookStartPoint.shift(hook0Point.x, hook0Point.y)
    sketch.line({ stroke: '#111', lineWidth: 5 }, hookStartPoint, left0Point)
    sketch.line({ stroke: '#111', lineWidth: 5 }, left0Point, left0Point.shift(hook1Point.x, hook1Point.y))
    const right0Point = hookStartPoint.shift(-hook0Point.x, hook0Point.y)
    sketch.line({ stroke: '#111', lineWidth: 5 }, hookStartPoint, right0Point)
    sketch.line({ stroke: '#111', lineWidth: 5 }, right0Point, right0Point.shift(hook1Point.x, hook1Point.y))

    this.box.rect.moveSelf(hookStartPoint.shift(0, 12), 'bottom-center')

    const { absWidth, absHeight } = sketch.bounds
    return sketch.toSurface(absWidth, absHeight + this.image.rect.height + 18)
  }

  private opened () {
    const sketch = new Sketch()

    const nodeSize = 12
    const startPoint = new Point(this.tubeRect.x, this.tubeRect.absCenter.y)
    
    sketch.circle({ fill: '#a1a1a1', stroke: '#232323', lineWidth: 2 }, startPoint, 8)
    const rect = Rect.fromCenter(startPoint, nodeSize, nodeSize)
    sketch.roundedrect({ fill: '#111'}, rect, [1, 1, 8, 8])

    const hookStartPoint = startPoint.shift(0, nodeSize * 0.5 + 1)
    const hook0Point = new Point(25, 3)
    const hook1Point = new Point(4, 23)
    const left0Point = hookStartPoint.shift(hook0Point.x, hook0Point.y)
    sketch.line({ stroke: '#111', lineWidth: 5 }, hookStartPoint, left0Point)
    sketch.line({ stroke: '#111', lineWidth: 5 }, left0Point, left0Point.shift(hook1Point.x, hook1Point.y))
    const right0Point = hookStartPoint.shift(-hook0Point.x, hook0Point.y)
    sketch.line({ stroke: '#111', lineWidth: 5 }, hookStartPoint, right0Point)
    sketch.line({ stroke: '#111', lineWidth: 5 }, right0Point, right0Point.shift(-hook1Point.x, hook1Point.y))

    this.box.rect.moveSelf(hookStartPoint.shift(0, 12), 'bottom-center')

    const { absWidth, absHeight } = sketch.bounds
    return sketch.toSurface(absWidth, absHeight + this.image.rect.height + 18)
  }
  

  static async create (width: number, height: number) {
    const manipulator = new Manipulator(
      width, 
      height, 
      Math.round(Math.random()) ? 1 : -1,
      0 | Math.random() * 4,
    )
    await manipulator.create()
    return manipulator
  }
}