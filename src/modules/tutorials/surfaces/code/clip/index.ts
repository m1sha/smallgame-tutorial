import { loadImage, Rect, Sketch, Surface } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const ui = builders.ui()
  const img = await loadImage('istockphoto-517188688-612x612.jpg')
  const x = ui.var(160)
  const y = ui.var(100)
  const w = ui.var(300)
  const h = ui.var(200)
  const rect = img.rect.dup()
  rect.absCenter = viewer.viewportRect.center

  let clip: Surface | null = null
  const render = () => {
    clip = img.clip(new Rect(x.value, y.value, w.value, h.value))
    clip.rect.shiftSelf(rect.topLeft)
  }
  render()

  viewer.onFrameChanged = frame => {
    frame.clear()
    new Sketch()
      .rect({ fill: '#2f2f2f' }, rect.outline(-4))
      .draw(frame)
    frame.blit(img, rect)
    new Sketch()
      .rect({ fill: '#161616b6' }, rect.outline(-2))
      .draw(frame)

    const clipRect = clip.rect.shift(x.value, y.value)
    frame.blit(clip, clipRect)
    new Sketch()
      .rect({ stroke: '#ddd' }, clipRect)
      .draw(frame)
    displayFps(fps)
  }

  ui.tracker('X', 0, img.width, 1, render, x)
  ui.tracker('Y', 0, img.height, 1, render, y)
  ui.tracker('Width', 0, img.width, 1, render, w)
  ui.tracker('Height', 0, img.height, 1, render, h)
}
