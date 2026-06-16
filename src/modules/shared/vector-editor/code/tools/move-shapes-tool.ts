import { GameEvent } from "smallgame";
import { Tool } from "./tool";
import { VectorEditorTools } from "./tool-types";
import { MoveShapesCommand } from "../commands";
import { Shape } from "../editor-state/shapes/shape";

export class MoveShapesTool extends Tool {
  readonly name: VectorEditorTools = 'move-shapes'
  private canMove: boolean = false
  private canMoveEdge: boolean = false
  private shape: Shape | null = null

  input (ev: GameEvent) {

    if (ev.type === 'MOUSEDOWN') {
      const pos = this.toLocalPoint(ev.pos)
      this.state.shapes.selecteds.select(pos, ev.ctrlKey)

      if (this.shape) {
        this.shape.seletedCorner = this.shape.hoveredCorner
      }
    }

    if (ev.type === 'MOUSEMOVE') { 

      const pos = this.toLocalPoint(ev.pos)
      this.state.shapes.selecteds.forEach(shape => {
        shape.hoveredCorner = shape.getHittestCorner(pos, 5)
        if (shape.hoveredCorner !== 'none') this.shape = shape
      })
      if (this.state.shapes.selecteds.count > 0)
        this.state.stateChanged('shapes', 'hovered-corner')

      if (this.shape) {
        if (ev.lbc) this.shape.resizeBySelectedCorner(ev.shift)
          this.state.stateChanged('shapes', 'resize-corner')
      }
      else {
        if (ev.lbc) this.state.shapes.shift(ev.shift)
      }
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.state.sendCommand(new MoveShapesCommand())
      
      if (this.shape) {
        this.shape.seletedCorner = 'none'
        this.shape = null
      }
    }
  }
}