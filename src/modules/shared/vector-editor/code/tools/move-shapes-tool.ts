import { GameEvent } from "smallgame";
import { Tool } from "./tool";

export class MoveShapesTool extends Tool {
  private canMove: boolean = false

  input (ev: GameEvent) {
    if (ev.type === 'MOUSEDOWN') {
      const shapes = this.state.shapes.getByHittest(ev.pos, true)

      if (  shapes.length > 0) {
        this.state.selectedShapes.attachToSelected(shapes[0], ev.ctrlKey)
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