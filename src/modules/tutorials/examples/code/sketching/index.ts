import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptSettings } from "../../../../../components/example"
import { Rect, Shape, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders, garbageCollect }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect })

  const entities = builders.entities()
  const shapeList = entities.addList<Shape>(shape => ({ caption: shape.type }))

  const sketch = new Sketch()
  sketch.rect({ fill: '#444' }, new Rect(400, 10, 200, 100))
  const shape = sketch.shapes.current
  shapeList.add(shape)

  if (shape.type === 'rectangle') shape.y = 80

  viewer.onFrameChanged = frame => {
    frame.clear()
    sketch.draw(frame)
    displayFps(fps)
  }
}
