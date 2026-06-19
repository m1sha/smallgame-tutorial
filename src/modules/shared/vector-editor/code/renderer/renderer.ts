import { MemSurface, Rect, Size, Sketch, Surface } from "smallgame";
import { EditorState } from "../editor-state";
import { Shape } from "../editor-state/shapes";

export class Renderer {
  readonly surface: MemSurface 
  constructor (protected state: EditorState, size: Size) {
    this.surface = new MemSurface(size)
  }

  render () {
    this.surface.clear()
    this.drawShapes(this.surface)
    this.drawDrawingShape(this.surface)
    this.drawSelectedShapes(this.surface)
  }

  update () {
    this.render()
  }

  private drawShapes (frame: Surface) {
    const sketch = new Sketch()
    for (const shape of this.state.shapes.items) {
      if (shape.type === 'rectangle') {
        sketch.rect(shape.style, shape.rect)
      }
      if (shape.type === 'polygon') {
        sketch.polygon(shape.style, shape.points)
      }
    }
    sketch.draw(frame)
  }

  private drawDrawingShape (frame: Surface) {
    const sketch = new Sketch()

    const drawingShape = this.state.shapes.drawingShape
    const shapeDrawStyle = this.state.shapes.drawStyle
    if (drawingShape) {
      
      if (drawingShape.type === 'rectangle') {
        sketch.rect(shapeDrawStyle, drawingShape.rect)
      }

      if (drawingShape.type === 'polygon') {
        sketch.polygon(shapeDrawStyle, drawingShape.points)
      }
    }

    sketch.draw(frame)
  }

  private drawSelectedShapes (frame: Surface) {
    const sketch = new Sketch()
    const size = 5
    sketch.defineStyle('dotcolor', { stroke: '#eee', fill: '#fff' })
    sketch.defineStyle('dotcolor-hover', { stroke: '#eee', fill: '#08cf4a' })
    sketch.defineStyle('dotcolor-seleted', { stroke: '#06832b', fill: '#098031' })
    
    this.state.shapes.selecteds.forEach(shape => {
      if (shape.type === 'polygon' && shape.editPoints) { 

        sketch.dots({ fill: '#a3a3a3' }, shape.points, 5)
        sketch.dots({ fill: '#038d03' }, shape.selectedPoints, 5)

        if (shape.activePoint) {
          sketch.circle({ fill: '#911' }, shape.activePoint, 5)
        }
        return 
      }

      const rect = shape.bounds
      sketch.rect({ stroke: '#e2e2e2', lineDash: [3,5] }, rect)
      sketch.rect(getDotStyle(shape,'top-left'), Rect.fromCenter(rect.topLeft, size, size))
      sketch.rect(getDotStyle(shape,'mid-top'), Rect.fromCenter(rect.midTop, size, size))
      sketch.rect(getDotStyle(shape,'top-right'), Rect.fromCenter(rect.topRight, size, size))
      sketch.rect(getDotStyle(shape,'mid-left'), Rect.fromCenter(rect.midLeft, size, size))
      sketch.rect(getDotStyle(shape,'mid-right'), Rect.fromCenter(rect.midRight, size, size))
      sketch.rect(getDotStyle(shape,'bottom-left'), Rect.fromCenter(rect.bottomLeft, size, size))
      sketch.rect(getDotStyle(shape,'mid-bottom'), Rect.fromCenter(rect.midBottom, size, size))
      sketch.rect(getDotStyle(shape,'bottom-right'), Rect.fromCenter(rect.bottomRight, size, size))
    })
    sketch.draw(frame)
  }
}

function getDotStyle (shape: Shape, corner: string) {
  if (shape.seletedCorner === corner)
    return 'dotcolor-seleted'
  if (shape.hoveredCorner === corner)
    return 'dotcolor-hover'
  return 'dotcolor'
}