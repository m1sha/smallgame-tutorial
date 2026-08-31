import { loadBlob, loadImage, MemSurface, Sketch } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"
import { filterSmallBoundingBoxes, findSpriteBoundingBoxes } from "./bounding-box-detector"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const telemetry = builders.telemetry().noLegend()
  const ui = builders.ui()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  let img = await loadImage('platformer/characters/beaver/beaver_idle.png')
  // const img = await loadImage('platformer/characters/metalslug/Weapon_SFX.png')
  let boxes = []
  const boxCount = telemetry.def('boxes', boxes.length)
  const alphaThreshold = ui.var(10)
  const connectivity = ui.var<4 | 8>(4)
  const minSize = ui.var(2)
  const threshold = ui.var(0.025)

  let surface = new MemSurface(img.rect.size)
  const draw = () => {
    boxes = findSpriteBoundingBoxes(img.pixels.imageData, { 
      alphaThreshold: alphaThreshold.value, 
      connectivity: connectivity.value, 
      minSize: minSize.value 
    })
    boxes = filterSmallBoundingBoxes(boxes, threshold.value)
    surface.clear()
    surface.blit(img, img.rect)
    const sketch = new Sketch()
    boxes.forEach(box => sketch.rect({ stroke: 'green', lineWidth: 1 / viewer.viewport.zoom }, box))
    sketch.draw(surface)
    boxCount.value = boxes.length
  }

  draw()

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE' && ev.lbc) {
      //surface.rect.shiftSelf(ev.shift)
      viewer.viewport.panBy(ev.shift)
    }
    if (ev.type === 'WHEEL') {
      viewer.viewport.zoomAt(ev.deltaY, ev.pos.x, ev.pos.y)
      draw()
    }
  }
  viewer.surface.imageRendering = 'pixelated'
  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(surface, surface.rect.move(viewer.viewport.offset).scalesize(viewer.viewport.zoom))
    displayFps(fps)
  }

  ui.info('⬚ Detect sprite bounding boxes in a sprite atlas')
  ui.tracker('Alpha Threshold', 1, 100, 1, draw, alphaThreshold)
  ui.tracker('Connectivity', 4, 8, 4, draw, connectivity)
  ui.tracker('Min Size', 1, 10, 1, draw, minSize)
  ui.tracker('Min Square Threshold', 0.001, 100, .001, draw, threshold)

  ui.upload('Upload', async file => {
    img = await loadBlob(file)
    surface = new MemSurface(img.rect.size)
    draw()
  })
}
