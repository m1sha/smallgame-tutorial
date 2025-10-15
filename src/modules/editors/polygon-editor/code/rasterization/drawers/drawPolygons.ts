import { Sketch, Surface, TPoint, TSegment } from "smallgame"
import { BaseObject, Polygon } from "../../objects"

export function drawPolygon (polygon: Polygon, surface: Surface, currentObject: BaseObject | null) {
  const sketch = new Sketch()
  sketch.defineStyle('normal', { stroke: 'green', fill:'#00dd0025' })
  sketch.defineStyle('hover', { stroke: 'green', fill:'#00f60050' })

  const vecs = points2segments(polygon.points, true)
  sketch.polygon(polygon.isPolygonSelected ? 'hover' : 'normal', polygon.points)
  sketch.arrows(polygon.isPolygonSelected ? 'hover' : 'normal', vecs)
  sketch.draw(surface)
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
