import { GameEvent } from "smallgame";
import { Tool } from "./tool";
import { VectorEditorTools } from "./tool-types";
import { MoveShapesCommand } from "../commands";

export class MoveShapesTool extends Tool {
  readonly name: VectorEditorTools = 'move-shapes'
  private canMove: boolean = false

  input (ev: GameEvent) {

    if (ev.type === 'MOUSEDOWN') {
      const pos = this.toLocalPoint(ev.pos)
      this.state.shapes.selecteds.select(pos, ev.ctrlKey)
    }

    // if (ev.type === 'MOUSEDOWN') {
    //   const pos = this.toLocalPoint(ev.pos)
    //   const shapes = this.state.shapes.getByHittest(pos, true)
    //   const selecteds = this.state.shapes.selecteds

    //   if (shapes.length > 0) {
    //     selecteds.attachToSelected(shapes[0], ev.ctrlKey)
    //   }

    //   selecteds.forEach(shape => {
    //     this.canMove = shape.pointIn(pos)
    //     if (this.canMove) return false
    //   })
    // }

    if (ev.type === 'MOUSEMOVE') { 
      //if (this.canMove && ev.lbc) {
      //  this.state.shapes.shift(ev.shift)
      //}
      if (ev.lbc) this.state.shapes.shift(ev.shift)
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.state.sendCommand(new MoveShapesCommand())
      this.canMove = false
    }
  }
}