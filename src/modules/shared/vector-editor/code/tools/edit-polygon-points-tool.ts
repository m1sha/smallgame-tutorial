import { GameEvent, Point, Rect } from "smallgame"
import { Tool } from "./tool"
import { isPolygonShape, PolygonShape } from "../editor-state/shapes"
import { VectorEditorTools } from "./tool-types"

export class EditPolygonPointTool extends Tool {
  readonly name: VectorEditorTools = 'edit-polygon-points'
  //private shape: PolygonShape | null = null
  private movingPoint: Point | null = null
  
  input (ev: GameEvent) {
    const polygon = this.state.selectedShapes.items[0]
    if (!isPolygonShape(polygon)) return
    
    if (ev.type === 'MOUSEDOWN') {
      this.movingPoint = polygon.points.find(p => p.inRadius(ev.pos, 5))
    }

    if (ev.type === 'MOUSEMOVE') {
      
      polygon.movePoint(ev.shift, this.movingPoint)
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.movingPoint = null
    }
  } 
}