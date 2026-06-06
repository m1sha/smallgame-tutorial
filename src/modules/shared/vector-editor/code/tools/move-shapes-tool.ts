import { GameEvent } from "smallgame";
import { Tool } from "./tool";

export class MoveShapesTool extends Tool {
  private canMove: boolean = false

  input (ev: GameEvent) {
    if (ev.type === 'MOUSEDOWN') {
      const shapes = this.state.getByHittest(ev.pos, true)

      if (ev.ctrlKey && shapes.length > 0) {
        this.state.selectedShapes.attachToSelected(shapes[0], true)
      }

      this.state.selectedShapes.forEach(shape => {
        if (shape.type === 'rectangle') {
          this.canMove = shape.rect.containsPoint(ev.pos)
          if (this.canMove) return false
        }
      })
    }

    if (ev.type === 'MOUSEMOVE') { 
      if (this.canMove && ev.lbc) {
        this.state.selectedShapes.forEach(shape => {
          if (shape.type === 'rectangle') {
            shape.rect.shiftSelf(ev.shift)
          }
        })
      }
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.canMove = false
    }
  }
}