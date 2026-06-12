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

    if (ev.type === 'MOUSEMOVE') {
      const { segment, point } = polygon.getActiveSegmentAndPoint(ev.pos)
      
      polygon.setActiveSegment(null)
      polygon.setActivePoint(null)

      if (ev.ctrlKey) {
        polygon.setActiveSegment(segment)
        polygon.setActivePoint(point)
      }
      
      if ( ev.lbc) {
        polygon.shiftPoints(ev.shift)
        
      }
      this.state.stateChanged()
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      const { segmentIndex } = polygon.getActiveSegmentAndPoint(ev.pos)
      if (polygon.activePoint && segmentIndex >= 0 && ev.ctrlKey) {
        polygon.addPoint(segmentIndex)
        this.state.stateChanged()
      }
    }
  } 
}