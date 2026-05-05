import { Magnifier, Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { loadBlob, loadImage, MemSurface, Point, Rect, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders, viewerControls }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, viewerControls })
  const telemetry = builders.telemetry()
  const zoom = telemetry.def('Zoom', 1)

  let img = await loadImage('nature-3082832_1280.jpg') // await loadImage('juiiana-zebra-10048351_1280.jpg')
  img.rect.center = viewer.viewportRect.center
  let rect = img.rect.dup()

  const previewLen = 500
  const previewRect = Rect.square(previewLen).moveSelf(containerSize.width - previewLen - 10, 10)
  let aspRect = Rect.scaleToFit(rect, previewLen)
  aspRect.absCenter = previewRect.absCenter

  const preview = new MemSurface(previewRect.size)
  const magnifier = new Magnifier()
  const cursorOnPreview = Point.zero

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE') {
      cursorOnPreview
        .moveSelf(ev.pos)
        .shiftSelf(rect.topLeft.neg())
        .scaleSelf(rect.size.inverse().toPoint())
        .scaleSelf(aspRect.size.toPoint())
        .shiftSelf(aspRect)

      if (ev.lbc) {
        rect.shiftSelf(ev.shift)
      }
    }
    
    if (ev.type === 'WHEEL') {
      magnifier.byDelta(ev.deltaY)
      zoom.value = magnifier.zoom
      
      const prevRect = rect.dup()
      rect = img.rect.dup()

      const cursor = ev.pos
        .shift(prevRect.topLeft.neg())
        .scaleSelf(prevRect.size.inverse().toPoint())
        .scaleSelf(rect.size.toPoint())
        .shiftSelf(rect.topLeft)

      const cursorShift = ev.pos.shift(cursor.neg())
      
      rect.scaleSelf(magnifier.zoom, cursor)
      rect.shiftSelf(cursorShift)
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(img, rect)

    Sketch.new()
      .rect({ stroke: 'white', fill: '#212121' }, previewRect.move(0, 0))
      .draw(preview)

    const previewLeftTop = previewRect.topLeft.neg()
    preview.blit(img, aspRect.shift(previewLeftTop))

    Sketch.new()
      .cross({ stroke: '#fff', lineWidth: 2 }, Rect.fromCenter(cursorOnPreview, 16, 16).shiftSelf(previewLeftTop))
      .rect({ stroke: 'white' }, previewRect.shift(previewLeftTop))
      .draw(preview)

    surface.blit(preview, previewRect)

    displayFps(fps)
  }

  const ui = builders.ui()
  ui.upload('Load Image', async file => {
    img = await loadBlob(file)
    img.rect.center = viewer.viewportRect.center
    rect = img.rect.dup()
    aspRect = Rect.scaleToFit(rect, previewLen)
    aspRect.absCenter = previewRect.absCenter
    magnifier.reset()
    zoom.value = magnifier.zoom
  })
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
