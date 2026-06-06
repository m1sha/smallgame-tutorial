import { Point, Rect, ShapeStyle } from "smallgame"
import { PolygonShape, RectangleShape, Shape } from "./shapes"
import { removeItem } from "../../../../games/old-tv/utils"
import { SelectedShapes } from "./selected-shapes"
import { Tool, ToolFactory } from "../tools"

export class EditorState {
  
  currentTool: Tool
  private toolFactory: ToolFactory = new ToolFactory(this)
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

  createDrawingPolygon (start: Point, end: Point) { 
    const shape = new PolygonShape(start, end, this.shapeDrawStyle.clone())
    this.drawingShape = shape
    return shape
  }

  applyDrawingShape () {
    if (!this.drawingShape) return
    this.shapes.push(this.drawingShape)
    this.drawingShape = null
  }

  changeTool (name: string) {
    this.currentTool = this.toolFactory.create(name)
  }

  // shiftSelectedShapes (shift: Point) {

  // }

  
}