import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptSettings } from "../../../../../components/example"
import { loadImage, Point, Rect } from "smallgame"

export default async ({ container, containerSize, fps, builders, garbageCollect }: ScriptSettings): Promise<void> => {
  const ui = builders.ui()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect })
  const img = await loadImage('space-striker/bg.png')
  // const img = await loadImage('istockphoto-517188688-612x612.jpg')
  let pattern = img.toPattern('repeat')
  const zoom = ui.var(1)
  const w = ui.var(img.width)
  const h = ui.var(img.height)
  const x = ui.var(0)
  const y = ui.var(0)
  const offsetX = ui.var(0)
  const offsetY = ui.var(0)
  
  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.fill(pattern, new Point(offsetX.value, offsetY.value))
    displayFps(fps)
  }

  ui.group('Offset')
    .expand()
    .tracker('x', 0, 2000, 1, undefined, offsetX)
    .tracker('y', 0, 2000, 1, undefined, offsetY)
  ui.group('Original Image')
    .expand()
    .tracker('zoom', .1, 4, 0.1, update, zoom)
  ui.group('Clip Rect')
    .expand()
    .tracker('x', -img.width / 2, img.width / 2, 1, update, x)
    .tracker('y', -img.height / 2, img.height / 2, 1, update, y)
    .tracker('w', 1, img.width, 1, update, w)
    .tracker('h', 1, img.height, 1, update, h)

  function update () {
    pattern = img
      .scale(zoom.value, zoom.value)
      .clip(new Rect(x.value, y.value, w.value, h.value))
      .toPattern('repeat')
  }
}
