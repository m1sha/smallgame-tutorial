import { MemSurface, Rect, Size, Sketch, Surface } from "smallgame";
import { Box } from "./panels"

export class Renderer {
  readonly surface: MemSurface
  constructor (readonly size: Size) {
    this.surface = new MemSurface(size)
  }

  render (img: Surface, ae: { boxes: Box[], mode: 'detection' | 'edit-rect' | 'move-sprite' | 'export' }, zoom: number) {
    this.surface.clear()
    this.surface.blit(img, img.rect)
    const sketch = new Sketch()
    ae.boxes.forEach(box => {
      const rect = Rect.from(box)
      sketch.rect({ stroke: 'green', lineWidth: 1 / zoom }, rect)

      if (ae.mode === 'edit-rect') {
        const d = 4
        const color = '#999'
        const points = [
          rect.topLeft, rect.midTop, rect.topRight,
          rect.midLeft, rect.midRight,
          rect.bottomLeft, rect.midBottom, rect.bottomRight,
        ]
        points.forEach(points => sketch.rect({ fill: color }, Rect.fromCenter(points, d, d)))
      }
    })
    sketch.draw(this.surface)
  }
}