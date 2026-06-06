import { Rect, Sketch, Surface } from "smallgame";
import { EditorState } from "../editor-state";

export class Renderer {
  constructor (protected state: EditorState) {}

  render (frame: Surface) {
    this.drawShapes(frame)
    this.drawDrawingShape(frame)
    this.drawSelectedShapes(frame)
  }

  private drawShapes (frame: Surface) {
    const sketch = new Sketch()
    for (const shape of this.state.shapes) {
      if (shape.type === 'rectangle') {
        sketch.rect(shape.style, shape.rect)
      }
    }
    sketch.draw(frame)
  }

  private drawDrawingShape (frame: Surface) {
    const sketch = new Sketch()

    if (this.state.drawingShape && this.state.drawingShape.type === 'rectangle') {
      sketch.rect(this.state.shapeDrawStyle, this.state.drawingShape.rect)
    }

    sketch.draw(frame)
  }

  private drawSelectedShapes (frame: Surface) {
    const sketch = new Sketch()
    const size = 5
    sketch.defineStyle('dotcolor', { stroke: '#eee' })
    
    this.state.selectedShapes.forEach(shape => {
      if (shape.type === 'rectangle') {
        sketch.rect({ stroke: '#4d9c75', lineDash: [3,5] }, shape.rect)
        sketch.rect('dotcolor', Rect.fromCenter(shape.rect.topLeft, size, size))
        sketch.rect('dotcolor', Rect.fromCenter(shape.rect.midTop, size, size))
        sketch.rect('dotcolor', Rect.fromCenter(shape.rect.topRight, size, size))
        sketch.rect('dotcolor', Rect.fromCenter(shape.rect.midLeft, size, size))
        sketch.rect('dotcolor', Rect.fromCenter(shape.rect.midRight, size, size))
        sketch.rect('dotcolor', Rect.fromCenter(shape.rect.bottomLeft, size, size))
        sketch.rect('dotcolor', Rect.fromCenter(shape.rect.midBottom, size, size))
        sketch.rect('dotcolor', Rect.fromCenter(shape.rect.bottomRight, size, size))
      }
    })
    sketch.draw(frame)
  }
}