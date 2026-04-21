import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { Icons, type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { GMath, loadImage, MemSurface, Point, Rect, setSize, Sketch, Surface, SurfaceBase, TSize } from "smallgame"

class Camera {
  private preview: MemSurface
  clipRect = Rect.zero
  zoom = 1

  constructor (size: TSize) {
    this.preview = new MemSurface(size)
  }
  
  set position (value: Point ) {
    this.preview.rect.moveSelf(value)
  }
  
  capture (screen: SurfaceBase, target: Point) {
    const rect = this.preview.rect
    this.clipRect = screen.rect.dup()
      .scaleSelf(this.zoom)
      .shiftSelf(target.scale(this.zoom))
      .shiftSelf(rect.center)
    this.preview.clear()
    this.preview.blit(screen, this.clipRect)

    Sketch
      .new()
      .rect({ stroke: '#c5c5c5' }, Rect.size(rect.size).outline(1))
      .cross({ stroke: '#f8f8f877' }, Rect.fromCenter(rect.center, 81, 81), { tickWidth: 12, tickGap: 20 })
      .circle({ fill: '#00a54a' }, rect.center, 1)
      .draw(this.preview)
  }

  draw (screen: Surface) {
    screen.blit(this.preview, this.preview.rect)
  }
}

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = builders.telemetry().open().noLegend()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const mousePos = telemetry.def('Cursor', Point.zero)
  const zoom = telemetry.def('Zoom', 1)
  const clipRect = telemetry.def('Clip Rect', Rect.zero)

  const img = await loadImage('istockphoto-517188688-612x612.jpg')
  img.rect.absCenter = viewer.surface.rect.absCenter.shiftX(200)

 
  const cam = new Camera(setSize(400, 300))
  cam.position = new Point(400, 110)
  let step = 1
  
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE') {
      mousePos.value = ev.pos
    }

    if (ev.type === 'WHEEL') {
      step -= Math.sign(ev.deltaY)
      GMath.clamp(step, 0, 14)
      zoom.value = GMath.logZoom(step, 14, 1, 2)
    }
  }
  
  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(img, img.rect)
    
    cam.zoom = zoom.value
    cam.capture(surface, mousePos.value.neg())
    cam.draw(surface)

    clipRect.value = cam.clipRect
    displayFps(fps)
  }

  const ui = builders.ui().info(Icons.computerMouse + ' Use mouse wheel to zoom the picture')
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
