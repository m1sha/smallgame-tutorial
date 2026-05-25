import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { MemSurface, Point, Rect, Size, Sketch } from "smallgame"
import { Enemy } from "./enemy"
import { Target } from "./target"
import { Flag } from "./flag"


export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  const surfaceSize = new Size(900, 210)
  const surface = new MemSurface(surfaceSize)
  const scrCenter = surface.rect.center
  const groundRect = Rect.fromCenter(scrCenter, surfaceSize.width, 10).shiftSelf(0, 80)
  const backgroundRect = Rect.size(surfaceSize.width, 200).moveSelf(groundRect, 'top-right')

  const enemy = new Enemy()
  enemy.patrolDistance = 100
  enemy.catchDistance = 200
  enemy.attackDistance = 50
  enemy.runSpeed = 80
  enemy.patrolSpeed = 10
  enemy.setPos(groundRect.midTop)
  await enemy.load()

  const flag = new Flag()
  await flag.load()
  flag.setPos(groundRect.midTop)
  
  const target = new Target()
  await target.load()
  target.setPos(groundRect.topLeft)

  const zoom = 2.2
  surface.imageRendering = 'pixelated'
  surface.rect.scalesizeSelf(zoom, zoom)
  surface.rect.absCenter = containerSize.half().toPoint()
  
  const calcPos = (pos: Point) => pos.shift(surface.rect.topLeft.neg()).scale(1 / zoom)
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') { 
      target.startMove = target.hittest(calcPos(ev.pos))
    }
    if (ev.type === 'MOUSEMOVE') {
      target.hittest(calcPos(ev.pos))
      if (target.startMove) target.move(ev.shift.scale(1 / zoom))
    }
    if (ev.type === 'MOUSEUP') {
      target.startMove = false
    }
  }
  
  viewer.onFrameChanged = frame => {
    enemy.setTarget(target.position)
    enemy.action()

    surface.clear()
    Sketch.new()
      .rect({ fill: '#2b2b2b' }, backgroundRect)
      .rect({ fill: '#311e09' }, groundRect)
      .rect({ stroke: target.hovered ?  '#808080' : 'transparent' }, target.image.rect.outline(-4))
      .draw(surface)
    
    flag.draw(surface)
    surface.blit(target.image, target.image.rect)
    surface.blit(enemy.image, enemy.image.rect)

    frame.blit(surface, surface.rect)
    displayFps(fps)
  }

  const ui = builders.ui()
  ui.group('Zombie', gr => {
    gr.open()
    gr.group('Distance', _ => _.open()
      .tracker('Patrol', 1, 450, 1, val => enemy.patrolDistance = val, enemy.patrolDistance)
      .tracker('Catch', 1, 450, 1, val => enemy.catchDistance = val, enemy.catchDistance)
      .tracker('Atack', 1, 60, 1, val => enemy.attackDistance = val, enemy.attackDistance)
    )
    gr.group('Speed', _ => _.open()
      .tracker('Patrol', 1, 100, 1, val => enemy.patrolSpeed = val, enemy.patrolSpeed)
      .tracker('Run', 1, 300, 1, val => enemy.runSpeed = val, enemy.runSpeed)
    )
  })
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
