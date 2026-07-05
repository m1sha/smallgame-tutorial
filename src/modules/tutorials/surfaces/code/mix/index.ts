import { loadImage, Rect, Size, Surface } from "smallgame"
import { DragPanel, DragPanels, type ScriptSettings, Viewer, displayFps } from "../../../core"

export default async ({ container, containerSize, fps, builders, garbageCollect }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect })
  const ui = builders.ui()
  let mixMethod: GlobalCompositeOperation = 'source-in'
  const mixMethods = ["color" , "color-burn" , "color-dodge" , "copy" , "darken" , "destination-atop" , "destination-in" , "destination-out" , "destination-over" , "difference" , "exclusion" , "hard-light" , "hue" , "lighten" , "lighter" , "luminosity" , "multiply" , "overlay" , "saturation" , "screen" , "soft-light" , "source-atop" , "source-in" , "source-out" , "source-over" , "xor"]
  let source = await loadImage('nature-3082832_1280.jpg')
  let distination = (await loadImage('masks/mask-3.png')).scaleSelf(1.2, 1.2)

  let result = Surface.default
  const updateMix = () => {
    result = distination.clone()
    result.mix(mixMethod, source)
    result.rect.absCenter = viewer.viewportRect.absCenter
  }
  updateMix()

  const panels = new DragPanels()
  panels
    .add("Source", new Rect(100, 10, 400, 400), { resizable: true })
    .content = source
  panels
    .add("Distination", new Rect(100, 430, 400, 400), { resizable: true })
    .content = distination
  const resultPanel = panels
    .add("Result", new Rect(550, 100, 1200, 600), { resizable: true })
  viewer.useInput(panels)

  viewer.onFrameChanged = frame => {
    frame.clear()
    resultPanel.content = result
    panels.draw(frame)
    displayFps(fps)
  }

  ui.select('Mix method', mixMethods, val => {
    mixMethod = val as GlobalCompositeOperation
    updateMix()
  }, mixMethod)
}
