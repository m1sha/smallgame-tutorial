import { Color, GMath, loadImage, Point, Rect, Sketch, Surface } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Icons, UIBuilder } from "../../../../../components/example/code/ui"
import { TelemetryBuilder } from "../../../../../components/example/code/telemetry"
import { Viewer } from "../../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height}, container)
  const telemetry = new TelemetryBuilder().open('wide')
  const overlapRect = telemetry.def('Overlap Rect', Rect.zero)
  const frigateRect = telemetry.def('Frigate Rect', Rect.zero)
  const alienRect = telemetry.def('Alien Rect', Rect.zero)
  const mousePos = telemetry.def('Cursor', Point.zero)
  const hittest = telemetry.def('Collided', false)
  const frigate = await loadImage('space-striker/ships/Frigate_1.png')
  const frigateMask = frigate.createMask()
  const alien = await loadImage('space-striker/ships/Alien_4.png')
  const alienMask = alien.createMask()
  frigate.rect.absCenter = viewer.surface.rect.center
  frigateRect.value = frigate.rect
  alienRect.value = alien.rect
  const frigateMaskImg = await frigateMask.toSurface()
  const frigateMaskImgSelected = await frigateMask.toSurface(Color.green)
  const alienMaskImg = await alienMask.toSurface()
  const alienMaskImgSelected = await alienMask.toSurface(Color.green)
  let showMask = false
  let showFrame = true
  const preview = new Surface(400, 400)
  preview.imageRendering = 'pixelated'
  let step = 1
  let zoom = 1

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE') {
      alien.rect.absCenter = ev.pos
      alienRect.value = alien.rect
      mousePos.value = Point.from(ev.pos)

      overlapRect.value = frigate.rect.getOverlapRect(alien.rect)
      hittest.value = overlapRect.value && frigateMask.overlaps(alienMask)
    }
    if (ev.type === 'WHEEL') {
      step -= Math.sign(ev.deltaY)
      GMath.clamp(step, 0, 9)
      zoom = GMath.logZoom(step, 14, 1, 2)
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    
    const frigateOffesetRect = overlapRect.value ? overlapRect.value.shift(frigate.rect.topLeft.neg()) : Rect.zero
    const alienOffesetRect = overlapRect.value ? overlapRect.value.shift(alien.rect.topLeft.neg()) : Rect.zero
    const viewPoint0 = new Point(300, 190)
    const viewPoint1 = new Point(300, 390)
    Sketch
      .new()
      .rect({ stroke: '#188', fill: hittest.value ? '#155' : 'transparent' }, frigateOffesetRect.shift(viewPoint0))
      .rect({ stroke: '#ddd' }, frigate.rect.move(0,0).shift(viewPoint0))
      .rect({ stroke: '#188', fill: hittest.value ? '#155' : 'transparent' }, alienOffesetRect.shift(viewPoint1))
      .rect({ stroke: '#ddd' }, alien.rect.move(0,0).shift(viewPoint1))
      .draw(surface)
    
    if (showFrame) Sketch.new()
      .rect({ stroke: hittest.value ? '#271' : '#a33' }, frigate.rect)
      .rect({ stroke: hittest.value ? '#271' : '#a33' }, alien.rect)
      .draw(surface)
    
    if (showMask) {
      if (hittest.value){
        surface.blit(frigateMaskImgSelected, frigate.rect)
        surface.blit(alienMaskImgSelected, alien.rect)
      } else {
        surface.blit(frigateMaskImg, frigate.rect)
        surface.blit(alienMaskImg, alien.rect)
      }
    } else {
      surface.blit(frigate, frigate.rect)
      surface.blit(alien, alien.rect)
    }

    preview.clear()
    const clipRect = surface.rect.clone()
    clipRect.scaleSelf(zoom)
    clipRect.shiftSelf(mousePos.value.neg().scale(zoom).shift(preview.rect.center))
      
    preview.blit(surface, clipRect)
    surface.blit(preview, preview.rect.move(300, 450))
    Sketch
      .new()
      .rect({ stroke: '#999' }, preview.rect.move(300, 450))
      .draw(surface)
    
    displayFps(fps)
    telemetry.tick()
  }
  
  const ui = new UIBuilder()
  ui.info(Icons.computerMouse + 'Use Mouse Wheel for zoom')
  ui.group('Settings', group => group.open()
    .switch('Show Mask', val => showMask = val, false)
    .switch('Show Frames', val => showFrame = val, true)
  )
  
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
