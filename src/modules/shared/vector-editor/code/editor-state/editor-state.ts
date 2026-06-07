import { Point, ShapeStyle } from "smallgame"
import { PolygonShape, RectangleShape, Shape } from "./shapes"
import { SelectedShapes } from "./selected-shapes"
import { Tool, ToolFactory, VectorEditorTools } from "../tools"
import { Shapes } from "./shapes/shapes"

export class EditorState {
  
  currentTool: Tool
  private toolFactory: ToolFactory = new ToolFactory(this)
  shapes: Shapes = new Shapes()
  drawingShape: Shape | null = null
  selectedShapes: SelectedShapes = new SelectedShapes(this)
  shapeDrawStyle: ShapeStyle = new ShapeStyle({ stroke: '#ddd' })

  
  onToolChanged:  (() => void) | null = null

  get onSelectedShapes () { return this.selectedShapes.onSelectedShapes }
  set onSelectedShapes (value: (() => void) | null) { 
    this.selectedShapes.onSelectedShapes = value 
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
    this.shapes.add(this.drawingShape)
    this.drawingShape = null
  }

  changeTool (name: VectorEditorTools) {
    this.currentTool = this.toolFactory.create(name)
  }

  
  
}