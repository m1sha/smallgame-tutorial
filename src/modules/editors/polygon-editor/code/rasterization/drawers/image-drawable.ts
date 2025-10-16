import { Rect, Sketch, Surface, TShapeStyle } from "smallgame"
import { ImageObject } from "../../objects"
import { Drawable } from "./drawable"

export class ImageDrawable extends Drawable<ImageObject> {
  normal (surface: Surface, object: ImageObject): void {
    surface.blit(object.image, object.image.rect)
  }

  hover (surface: Surface, object: ImageObject): void {
    
  }

  selected (surface: Surface, object: ImageObject): void {
    const rect = object.imageRect
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
}