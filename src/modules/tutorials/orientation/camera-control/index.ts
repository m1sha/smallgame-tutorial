import { DragPanels, Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { loadImage, MemSurface, Rect, Size, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const ui = builders.ui()

  const img = await loadImage('aaa/screenshot 2026-06-24 222445.jpg')
  const preview = new MemSurface(new Size(1200, 720))
  const camera = new MemSurface(new Size(640, 480))
  camera.imageRendering = 'pixelated'
  const previewFitRect = Rect.fromRatio(img.rect.ratio, preview.width, 'width')
  const cursorRect = new Rect(0, 0, 800, 600)
  cursorRect.moveSelf(img.rect).shiftSelf(0, img.height - cursorRect.height)
  let cameraFitRect = Rect.scaleToFit(cursorRect, camera) 
  const delta = img.rect.size.inverse(previewFitRect.size).toPoint()
  const getClipRect = () => cursorRect.scalesize(delta.x, delta.y).moveSelf(cursorRect.topLeft.scale(delta))
  let isCursorActive = false
  const panels = new DragPanels(containerSize)
  const cameraPanel = panels.add('Camera', new Rect(20, 300, 600, 460), { useSmooth: true, resizable: true })
  viewer.useInput(panels)

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      const clipRect = getClipRect()
      if (clipRect.containsPoint(ev.pos.shift(-700, -30))) isCursorActive = true
    }

    if (ev.type === 'MOUSEMOVE') {
      if (isCursorActive) {
        const nextStep = ev.shift.scale(delta.invert())
        const clipRect = getClipRect().shift(nextStep)
        if (!clipRect.inside(previewFitRect)) return
        cursorRect.shiftSelf(nextStep)
      }
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      isCursorActive = false
    }
  }

  viewer.onFrameChanged = frame => {
    frame.clear()
    
    preview.fill('#252525')
    preview.blit(img, previewFitRect)
    camera.clear()
    camera.fill('#252525')
    
    const srect = getClipRect()
    Sketch.new()
    .rect({ stroke: '#0f98d8', lineWidth: 3 }, srect)
    .draw(preview)
    
    cameraFitRect.center = camera.rect.center
    camera.blit(img, cursorRect, { distRect: cameraFitRect })

    frame.blit(preview, preview.rect.move(700, 30))

    cameraPanel.content = camera
    panels.draw(frame)

    displayFps(fps)
  }

  ui.group('Camera View Area', gr => gr
    .expand()
    .tracker('Width', 1, img.width, 1, val => {
      if (img.width - (val + cursorRect.x) < 1) return
      cursorRect.width = val
      cameraFitRect = Rect.scaleToFit(cursorRect, camera) 
    }, cursorRect.width)
    .tracker('Height', 1, img.height, 1, val => {
      if (img.height - (val + cursorRect.y)  < 1) return
      cursorRect.height = val
      cameraFitRect = Rect.scaleToFit(cursorRect, camera) 
    }, cursorRect.height)
  )
  
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
