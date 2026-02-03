import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { Icons, type ScriptModule, type ScriptSettings, TelemetryBuilder, UIBuilder } from "../../../../components/example"
import { GMath, loadImage, MemSurface, Point, Rect, setSize, Sketch, Surface, SurfaceBase, TSize } from "smallgame"

class Camera {
  private surface: MemSurface
  clip = Rect.zero
  zoom = 1

  constructor (size: TSize) {
    this.surface = new MemSurface(size)
  }
  
  set position (value: Point ) {
    this.surface.rect.moveSelf(value)
  }
  
  capture (surface: SurfaceBase, point: Point) {
    const rect = this.surface.rect
    this.clip = surface.rect.clone()
    this.clip.scaleSelf(this.zoom)
    this.clip.shiftSelf(point.scale(this.zoom).shift(rect.center))
    this.surface.clear()
    this.surface.blit(surface, this.clip)

    Sketch
      .new()
      .rect({ stroke: '#c5c5c5' }, Rect.size(rect.size).outline(1))
      .cross({ stroke: '#f8f8f877' }, Rect.fromCenter(rect.center, 81, 81), { tickWidth: 12, tickGap: 20 })
      .circle({ fill: '#00a54a' }, rect.center, 1)
      .draw(this.surface)
  }

  draw (surface: Surface) {
    surface.blit(this.surface, this.surface.rect)
  }
}

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = new TelemetryBuilder().open()
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })
  const mousePos = telemetry.def('Cursor', Point.zero)
  const zoom = telemetry.def('Zoom', 1)
  const clipRect = telemetry.def('Clip Rect', Rect.zero)

  const img = await loadImage('istockphoto-517188688-612x612.jpg')
  img.rect.absCenter = viewer.surface.rect.absCenter

 
  const cam = new Camera(setSize(400, 300))
  cam.position = new Point(200, 110)
  let step = 1
  
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE') {
      mousePos.value = ev.pos
    }

    if (ev.type === 'WHEEL') {
      step -= Math.sign(ev.deltaY)
      GMath.clamp(step, 0, 9)
      zoom.value = GMath.logZoom(step, 14, 1, 2)
      //zoom.value = GMath.clamp(zoom.value, 0.1, 8)
    }
  }

  
  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(img, img.rect)
    
    cam.zoom = zoom.value
    cam.capture(surface, mousePos.value.neg())
    cam.draw(surface)

    clipRect.value = cam.clip
    displayFps(fps)
  }

  const ui = new UIBuilder().info(Icons.computerMouse + ' Use mouse wheel to zoom the picture')
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
