import { MemSurface, Rect, Sketch, Surface } from "smallgame";
import { EditorState } from "../editor-state";

export class Renderer {
  constructor (protected state: EditorState) {}
  surface: MemSurface | null

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

    if (this.state.drawingShape && this.state.drawingShape.type === 'rectangle') {
      sketch.rect(this.state.shapeDrawStyle, this.state.drawingShape.rect)
    }

    if (this.state.drawingShape && this.state.drawingShape.type === 'polygon') {
      sketch.polygon(this.state.shapeDrawStyle, this.state.drawingShape.points)
    }

    sketch.draw(frame)
  }

  private drawSelectedShapes (frame: Surface) {
    const sketch = new Sketch()
    const size = 5
    sketch.defineStyle('dotcolor', { stroke: '#eee' })
    
    this.state.selectedShapes.forEach(shape => {
      if (shape.type === 'polygon' && shape.editPoints) { 

        sketch.dots({ fill: '#a3a3a3' }, shape.points, 5)
        sketch.dots({ fill: '#038d03' }, shape.selectedPoints, 5)
        return 
      }

      const rect = shape.bounds
      sketch.rect({ stroke: '#4d9c75', lineDash: [3,5] }, rect)
      sketch.rect('dotcolor', Rect.fromCenter(rect.topLeft, size, size))
      sketch.rect('dotcolor', Rect.fromCenter(rect.midTop, size, size))
      sketch.rect('dotcolor', Rect.fromCenter(rect.topRight, size, size))
      sketch.rect('dotcolor', Rect.fromCenter(rect.midLeft, size, size))
      sketch.rect('dotcolor', Rect.fromCenter(rect.midRight, size, size))
      sketch.rect('dotcolor', Rect.fromCenter(rect.bottomLeft, size, size))
      sketch.rect('dotcolor', Rect.fromCenter(rect.midBottom, size, size))
      sketch.rect('dotcolor', Rect.fromCenter(rect.bottomRight, size, size))
    })
    sketch.draw(frame)
  }
}