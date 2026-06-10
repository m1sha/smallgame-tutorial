import { GameEvent, Point, Rect } from "smallgame"
import { Tool } from "./tool"
import { RectangleShape } from "../editor-state/shapes"
import { VectorEditorTools } from "./tool-types"

export class DrawRectangleTool extends Tool {
  readonly name: VectorEditorTools = 'draw-rectangle'
  private shape: RectangleShape | null = null
  private sp = Point.zero
  input (ev: GameEvent) {
    
    if (ev.type === 'MOUSEDOWN') {
      this.sp.moveSelf(ev.pos)
      this.shape = this.state.createDrawingRectangle(ev.pos)
    }

    if (ev.type === 'MOUSEMOVE') {
      if (ev.lbc && this.shape) {
        this.shape.rect = Rect.fromTwoPoints(this.sp,  ev.pos)
        this.state.stateChanged()
      }
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.state.applyDrawingShape()
    }

    
  } 
}