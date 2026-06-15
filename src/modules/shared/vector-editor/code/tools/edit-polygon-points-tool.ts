import { GameEvent, Point, Rect } from "smallgame"
import { Tool } from "./tool"
import { isPolygonShape, PolygonShape } from "../editor-state/shapes"
import { VectorEditorTools } from "./tool-types"

export class EditPolygonPointTool extends Tool {
  readonly name: VectorEditorTools = 'edit-polygon-points'
  
  
  input (ev: GameEvent) {
    const polygon = this.state.shapes.selecteds.all()[0]
    if (!isPolygonShape(polygon)) return
    
    if (ev.type === 'MOUSEDOWN') {
      const pos = this.toLocalPoint(ev.pos)
      const point = polygon.getHittestPoint(pos)
      polygon.selectPoint(point, ev.ctrlKey)
      this.state.stateChanged('polygon')
    }

    if (ev.type === 'MOUSEMOVE') {
      const pos = this.toLocalPoint(ev.pos)
      const { segment, point } = polygon.getActiveSegmentAndPoint(pos)
      
      polygon.setActiveSegment(null)
      polygon.setActivePoint(null)

      if (ev.ctrlKey) {
        polygon.setActiveSegment(segment)
        polygon.setActivePoint(point)
      }
      
      if ( ev.lbc) {
        polygon.shiftPoints(ev.shift)
        
      }
      this.state.stateChanged('polygon')
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      const pos = this.toLocalPoint(ev.pos)
      const { segmentIndex } = polygon.getActiveSegmentAndPoint(pos)
      if (polygon.activePoint && segmentIndex >= 0 && ev.ctrlKey) {
        polygon.addPoint(segmentIndex)
        this.state.stateChanged('polygon')
      }
    }
  } 
}