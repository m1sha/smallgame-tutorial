import { GameEvent, Point, Rect } from "smallgame"
import { Tool } from "./tool"
import { PolygonShape } from "../editor-state/shapes"
import { VectorEditorTools } from "./tool-types"

export class DrawPolygonTool extends Tool {
  readonly name: VectorEditorTools = 'draw-polygon'
  private shape: PolygonShape | null = null
  private sp = Point.zero
  input (ev: GameEvent) {
    
    if (ev.type === 'MOUSEDOWN') {
      const pos = this.toLocalPoint(ev.pos)
      this.sp.moveSelf(pos)
      this.shape = this.state.createDrawingPolygon(pos, pos)
    }

    if (ev.type === 'MOUSEMOVE') {
      if (ev.lbc && this.shape) {
        const pos = this.toLocalPoint(ev.pos)
        this.shape = this.state.createDrawingPolygon(this.sp,  pos)
      }
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.state.applyDrawingShape()
    }
  } 
}