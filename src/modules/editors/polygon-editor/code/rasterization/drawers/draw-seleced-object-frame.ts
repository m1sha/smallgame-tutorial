import { Surface, Sketch, TShapeStyle, Rect } from "smallgame"
import { BaseObject, ImageObject, Polygon } from "../../objects"

export function drawSelectedObjectFrame (obj: BaseObject, surface: Surface) {
  if (obj instanceof Polygon) {
    drawPolygonFrame(obj, surface)
  }

  if (obj instanceof ImageObject) {
    drawImageObjectFrame(obj, surface)
  }
}

function drawPolygonFrame (polygon: Polygon, surface: Surface)  {
  const sketch = new Sketch()
  sketch.defineStyle('point_fund', { fill: 'tomato', stroke: 'red' })
  sketch.defineStyle('point_temp', { fill: 'grey', stroke: 'grey' })
  sketch.defineStyle('point_selected_fund', { fill: 'tomato', stroke: 'transparent' })
  sketch.defineStyle('point_selected_temp', { fill: 'grey', stroke: 'transparent' })

  sketch.dots('point_fund', polygon.points, 3 / polygon.zoomIndex)
    
  polygon.calculateTempPoints()
  sketch.dots('point_temp', polygon.tempPoints, 3 / polygon.zoomIndex)
  if (polygon.selectedPoint) {
    if (polygon.selectedPointType === 'fund')
      sketch.circle('point_selected_fund', polygon.selectedPoint, 5 / polygon.zoomIndex)
    if (polygon.selectedPointType === 'temp')
      sketch.circle('point_selected_temp', polygon.selectedPoint, 5 / polygon.zoomIndex)
  }

  sketch.draw(surface)
}

function drawImageObjectFrame (img: ImageObject, surface: Surface) {
  const rect = img.imageRect
  const pickerSize = 8
  const pickerStyle: TShapeStyle = { fill: '#333' }
  const sketch = new Sketch()
  sketch.rect({ stroke: '#333', lineDash: [3,5] }, rect)
  sketch.rect(pickerStyle, Rect.fromCenter(rect.topLeft, pickerSize, pickerSize))
  sketch.rect(pickerStyle, Rect.fromCenter(rect.topRight, pickerSize, pickerSize))
  sketch.rect(pickerStyle, Rect.fromCenter(rect.bottomLeft, pickerSize, pickerSize))
  sketch.rect(pickerStyle, Rect.fromCenter(rect.bottomRight, pickerSize, pickerSize))

  sketch.draw(surface)
}