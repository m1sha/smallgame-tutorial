import { Point, Rect, ShapeStyle } from "smallgame"
import { RectangleShape, Shape } from "./shapes"
import { removeItem } from "../../../../games/old-tv/utils"
import { SelectedShapes } from "./selected-shapes"

export class EditorState {
  shapes: Shape[] = []
  drawingShape: Shape | null = null
  selectedShapes: SelectedShapes = new SelectedShapes(this)

  shapeDrawStyle: ShapeStyle = new ShapeStyle({ stroke: '#ddd' })
 
  getByHittest (pos: Point, onlyOne: boolean = false): Shape[] {
    const result = []
    for (const shape of this.shapes) {
      if (shape.type === 'rectangle') {
        if (shape.rect.containsPoint(pos)) {
          result.push(shape)
          if (onlyOne) break
        }
      }
    }
    return result
  }

  createDrawingRectangle (pos: Point) {
    const shape = new RectangleShape(pos, this.shapeDrawStyle.clone())
    this.drawingShape = shape
    return shape
  }

  applyDrawingShape () {
    if (!this.drawingShape) return
    this.shapes.push(this.drawingShape)
    this.drawingShape = null
  }

  // shiftSelectedShapes (shift: Point) {

  // }

  
}