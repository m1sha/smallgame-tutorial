import { Sketch, Surface, TPoint, TSegment } from "smallgame"
import { Polygon } from "../../objects"

export function drawPolygon (polygon: Polygon, surface: Surface) {
  const sketch = new Sketch()
  sketch.defineStyle('normal', { stroke: 'green', fill:'#00dd0025' })
  sketch.defineStyle('hover', { stroke: 'green', fill:'#00f60050' })
  sketch.defineStyle('point_fund', { fill: 'tomato', stroke: 'red' })
  sketch.defineStyle('point_temp', { fill: 'grey', stroke: 'grey' })
  sketch.defineStyle('point_selected_fund', { fill: 'tomato', stroke: 'transparent' })
  sketch.defineStyle('point_selected_temp', { fill: 'grey', stroke: 'transparent' })

  const vecs = points2segments(polygon.points, true)
  sketch.polygon(polygon.isPolygonSelected ? 'hover' : 'normal', polygon.points)
  sketch.arrows(polygon.isPolygonSelected ? 'hover' : 'normal', vecs)
      
      
  if (polygon.isActive) {
    sketch.dots('point_fund', polygon.points, 3 / polygon.zoomIndex)
    
    polygon.calculateTempPoints()
    sketch.dots('point_temp', polygon.tempPoints, 3 / polygon.zoomIndex)
    if (polygon.selectedPoint) {
      if (polygon.selectedPointType === 'fund')
        sketch.circle('point_selected_fund', polygon.selectedPoint, 5 / polygon.zoomIndex)
      if (polygon.selectedPointType === 'temp')
        sketch.circle('point_selected_temp', polygon.selectedPoint, 5 / polygon.zoomIndex)
    }
  }

  return sketch.draw(surface)
}


export function setSegment (p0: TPoint, p1: TPoint): TSegment {
  return { p0, p1 }
}

export function points2segments (points: TPoint[], closePath: boolean = false): TSegment[] {
  if (points.length < 2) return []
  const result: TSegment[] = []
  
  for (let i = 1; i < points.length; i++) {
    result.push(setSegment(points[i - 1], points[i]))
  }

  if (closePath && points.length > 2)
    result.push(setSegment(points[points.length - 1], points[0]))

  return result
}
