import { GameEvent } from "smallgame";
import { Tool } from "./tool";
import { VectorEditorTools } from "./tool-types";

export class MoveShapesTool extends Tool {
  readonly name: VectorEditorTools = 'move-shapes'
  private canMove: boolean = false

  input (ev: GameEvent) {
    if (ev.type === 'MOUSEDOWN') {
      const pos = this.toLocalPoint(ev.pos)
      const shapes = this.state.shapes.getByHittest(pos, true)

      if (  shapes.length > 0) {
        this.state.selectedShapes.attachToSelected(shapes[0], ev.ctrlKey)
      }

      this.state.selectedShapes.forEach(shape => {
        this.canMove = shape.pointIn(pos)
        if (this.canMove) return false
      })
    }

    if (ev.type === 'MOUSEMOVE') { 
      if (this.canMove && ev.lbc) {
        this.state.selectedShapes.forEach(shape => {
          shape.shift(ev.shift)
        })
        this.state.stateChanged()
      }
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.canMove = false
    }
  }
}