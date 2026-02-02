import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings, TelemetryBuilder, UIBuilder } from "../../../../components/example"
import { loadImage, MemSurface, Point, Rect, setSize, Sketch } from "smallgame"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = new TelemetryBuilder().open()
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })
  const offset = telemetry.def('Offset', Point.zero)
  const zoom = telemetry.def('Zoom', 1)
  const clipRect = telemetry.def('Clip Rect', Rect.zero)

  const img = await loadImage('istockphoto-517188688-612x612.jpg')
  img.rect.absCenter = viewer.surface.rect.absCenter

  const camera = new MemSurface(setSize(300, 300))
  camera.rect.moveSelf(200, 110)

  
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE') {
      offset.value = ev.pos
    }
  }

  let oldZoom = 1
  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(img, img.rect)

    camera.clear()
    const clipCenter = offset.value.neg().shift(camera.rect.center)
    const clip = surface.rect.clone()
    clip.shiftSelf(offset.value.neg().shift(camera.rect.absCenter))
    
    //clip.scale(zoom.value, camera.rect.center)
    //clip.scalesizeSelf(zoom.value)
    //clip.topLeft = offset.value.neg().shift(clipCenter).scale(zoom.value)
    clip.shiftSelf(clip)
    //clip.scaleSelf(zoom.value, zoom.value, clipCenter)
    oldZoom = zoom.value
    
    
    //clip.moveSelf(clip.topLeft.scale(zoom.value).shift(camera.rect.center.neg()))
    //clip.resizeSelf(clip.width * zoom.value, clip.height * zoom.value)
  
    camera.blit(surface, clip)

    clipRect.value = clip
    Sketch
      .new()
      .defineStyle('line', { stroke: '#c5c5c5' })
      .defineStyle('line-light', { stroke: '#f8f8f877' })
      .rect('line', Rect.size(camera.rect.size).outline(1))
      .hline('line-light', Point.zero.move(camera.rect.width / 3, camera.rect.height / 2), camera.rect.width * 0.66)
      .vline('line-light', Point.zero.move(camera.rect.width / 2, camera.rect.height / 3), camera.rect.height * 0.66)
      .circle({ fill: '#00a54a' }, camera.rect.center, 1)
      .draw(camera)
    surface.blit(camera, camera.rect)
    displayFps(fps)
  }

  const ui = new UIBuilder()
  ui.group('Camera', group => group.open()
    .tracker('Zoom', 1/4, 4, 0.1, v => zoom.value = v, zoom.value)
  )
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
