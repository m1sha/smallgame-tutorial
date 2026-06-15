import { Point, ShapeStyle } from "smallgame"
import { Shape } from "./shape"
import { removeItem } from "smallgame/src/utils"
import { EditorState } from "../editor-state"
import { SelectedShapes } from "../selected-shapes"
import { RectangleShape } from "./rectangle"
import { PolygonShape } from "./polygon"

export class Shapes {
  items: Shape[] = []
  selecteds: SelectedShapes
  drawingShape: Shape | null = null
  drawStyle: ShapeStyle = new ShapeStyle({ stroke: '#ddd' })

  constructor (private state: EditorState) {
    this.selecteds = new SelectedShapes(state)
  }

  //onShapesChanged:  (() => void) | null = null

  getByHittest (pos: Point, onlyOne: boolean = false): Shape[] {
    const result = []
    for (let i = this.items.length - 1; i >= 0; i--) {
      const shape = this.items[i]
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
    const shape = new RectangleShape(pos, this.drawStyle.clone())
    this.drawingShape = shape
    this.state.stateChanged('shapes', 'drawing')
    return shape
  }

  createDrawingPolygon (start: Point, end: Point) { 
    const shape = new PolygonShape(start, end, this.drawStyle.clone())
    this.drawingShape = shape
    this.state.stateChanged('shapes', 'drawing')
    return shape
  }
  
  applyDrawingShape () {
    if (!this.drawingShape) return
    this.add(this.drawingShape)
    this.drawingShape = null
  }

  delete (shape: Shape) {
    this.selecteds.delete(shape)
    removeItem(this.items, p => p === shape)
    this.state.stateChanged('shapes', 'deleted')
  }

  get count () { return this.items.length }

  add (shape: Shape) {
    this.items.push(shape)
    this.state.stateChanged('shapes', 'created')
  }
}