import { GameEvent, Point, Rect } from "smallgame"
import { Tool } from "./tool"
import { isPolygonShape, PolygonShape } from "../editor-state/shapes"
import { VectorEditorTools } from "./tool-types"

export class EditPolygonPointTool extends Tool {
  readonly name: VectorEditorTools = 'edit-polygon-points'
  
  
  input (ev: GameEvent) {
    const polygon = this.state.selectedShapes.items[0]
    if (!isPolygonShape(polygon)) return
    
    if (ev.type === 'MOUSEDOWN') {
      const point = polygon.getHittestPoint(ev.pos)
      polygon.selectPoint(point, ev.ctrlKey)
      this.state.stateChanged()
    }

    if (ev.type === 'MOUSEMOVE' && ev.lbc) {
      
      polygon.movePoints(ev.shift)
      this.state.stateChanged()
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      
    }
  } 
}