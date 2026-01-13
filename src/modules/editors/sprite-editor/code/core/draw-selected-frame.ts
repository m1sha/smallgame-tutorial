import { Rect, setSize, Sketch, Surface, Time } from "smallgame"
import { DrawableObject } from "./drawable-object"

export function drawSelectedObjects (objects: DrawableObject[], screen: Surface) {
  const sketch = Sketch.new()
  
  objects.forEach(obj => {
    const rect = obj.rect.scale(obj.zoom, 'center-center').outline(-4)
    const mkSize = setSize(6, 6)
    const color = '#aaa'
    sketch
      .rect({ stroke: color, lineDash:  [5, 3] }, rect)
      .rect({ fill: color }, Rect.size(mkSize).move(rect.topLeft, 'center-center'))
      .rect({ fill: color }, Rect.size(mkSize).move(rect.topRight, 'center-center'))
      .rect({ fill: color }, Rect.size(mkSize).move(rect.bottomLeft, 'center-center'))
      .rect({ fill: color }, Rect.size(mkSize).move(rect.bottomRight, 'center-center'))
  })
  sketch.draw(screen)
}