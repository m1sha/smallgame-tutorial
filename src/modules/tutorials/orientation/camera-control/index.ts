import { Viewer } from "../../../shared"
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
  let cameraFitRect = Rect.zero
  const calcCameraFitRect = () => (cameraFitRect = Rect.fromRatio(
    cursorRect.ratio, 
    cameraFitRect.width > cameraFitRect.height ? camera.width : camera.height, 
    cameraFitRect.width > cameraFitRect.height ? 'width' : 'height'
  ))
  calcCameraFitRect()
  const delta = img.rect.size.inverse(previewFitRect.size).toPoint()
  const getClipRect = () => cursorRect.scalesize(delta.x, delta.y).moveSelf(cursorRect.topLeft.scale(delta))
  let isCursorActive = false

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      isCursorActive = true
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
    
    camera.blit(img, cursorRect, { distRect: cameraFitRect.move(0, 0) })

    frame.blit(preview, preview.rect.move(700, 30))
    frame.blit(camera, camera.rect.move(30, 270))

    displayFps(fps)
  }

  ui.group('Camera View Area', gr => gr
    .expand()
    .tracker('Width', 1, img.width, 1, val => {
      if (img.width - (val + cursorRect.x) < 1) return
      cursorRect.width = val
      calcCameraFitRect()
    }, cursorRect.width)
    .tracker('Height', 1, img.height, 1, val => {
      if (img.height - (val + cursorRect.y)  < 1) return
      cursorRect.height = val
      calcCameraFitRect()
    }, cursorRect.height)
  )
  
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
