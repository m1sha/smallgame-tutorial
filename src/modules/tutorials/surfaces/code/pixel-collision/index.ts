import { Color, Game, gameloop, loadImage, Point, Rect, Sketch, Surface, TPoint } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { TelemetryBuilder } from "../../../../../components/example/code/telemetry"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)
  const telemetry = new TelemetryBuilder().open('wide')
 
  const overlapRect = telemetry.def('Overlap Rect', Rect.zero)
  const frigateRect = telemetry.def('Frigate Rect', Rect.zero)
  const alienRect = telemetry.def('Alien Rect', Rect.zero)
  const mousePos = telemetry.def('Positon', Point.zero)
  const hittest = telemetry.def('Collided', false)

  const frigate = await loadImage('space-striker/ships/Frigate_1.png')
  const frigateMask = frigate.createMask()
  const alien = await loadImage('space-striker/ships/Alien_4.png')
  const alienMask = alien.createMask()
  frigate.rect.absCenter = screen.rect.center
  frigateRect.value = frigate.rect
  alienRect.value = alien.rect

  const frigateMaskImg = await frigateMask.toSurface()
  const frigateMaskImgSelected = await frigateMask.toSurface(Color.green)
  const alienMaskImg = await alienMask.toSurface()
  const alienMaskImgSelected = await alienMask.toSurface(Color.green)

  let showMask = false
  let showFrame = true

  const preview = new Surface(400, 400)
  
  gameloop(() => {
    screen.fill('#383838ff')
    for (const ev of game.event.get()) {
      if (ev.type === 'MOUSEMOVE') {
        alien.rect.absCenter = ev.pos
        alienRect.value = alien.rect
        mousePos.value = Point.from(ev.pos)
      }
    }

    overlapRect.value = frigate.rect.getOverlapRect(alien.rect)
    let color = overlapRect ? '#a33' : 'transparent'

    if (overlapRect.value) {
      const frigateOffesetRect = overlapRect.value.shift(frigate.rect.topLeft.neg())
      const alienOffesetRect = overlapRect.value.shift(alien.rect.topLeft.neg())

      const viewPoint0 = new Point(300, 150)
      const viewPoint1 = new Point(300, 350)
      Sketch
        .new()
        //.rect({ fill: '#188' }, overlapRect.value)
        .rect({ stroke: '#188' }, frigateOffesetRect.shift(viewPoint0))
        .rect({ stroke: '#ddd' }, frigate.rect.move(0,0).shift(viewPoint0))
        .rect({ stroke: '#188' }, alienOffesetRect.shift(viewPoint1))
        .rect({ stroke: '#ddd' }, alien.rect.move(0,0).shift(viewPoint1))
        .draw(screen.surface)
      
        hittest.value = frigateMask.overlaps(alienMask)

      if (hittest.value) {
        color = '#271'
      }
    }
    
    if (showFrame) Sketch.new()
      .rect({ stroke: color }, frigate.rect)
      .rect({ stroke: color }, alien.rect)
      .draw(screen.surface)
    
    if (showMask) {
      if (hittest.value){
        screen.blit(frigateMaskImgSelected, frigate.rect)
        screen.blit(alienMaskImgSelected, alien.rect)
      } else {
        screen.blit(frigateMaskImg, frigate.rect)
        screen.blit(alienMaskImg, alien.rect)
      }
    } else {
      screen.blit(frigate, frigate.rect)
      screen.blit(alien, alien.rect)
    }

    if (overlapRect.value) {
      preview.clear()
      preview.blit(screen.surface, screen.surface.rect.move(mousePos.value.shift(-preview.width / 6).neg()).scale(3))
      screen.blit(preview, preview.rect.move(300, 450))
      Sketch
        .new()
        .rect({ stroke: '#999' }, preview.rect.move(300, 450))
        .draw(screen.surface)
    }
    
    displayFps(fps)
    telemetry.tick()
  })

  const ui = new UIBuilder()
  ui.select('Show Mask', ['Yes', 'No'], val => showMask = val === 'Yes', 'No')
  ui.select('Show Frames', ['Yes', 'No'], val => showFrame = val === 'Yes', 'Yes')
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      game.kill() 
    }
  }
}
