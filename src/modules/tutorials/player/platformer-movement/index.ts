import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { Key, Rect, Sketch, Time } from "smallgame"

import { Player } from "./player"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  const scrCenter = containerSize.half().toPoint()
  const groundRect = Rect.fromCenter(scrCenter, 900, 10).shiftSelf(0, 80)
  const backgroundRect = Rect.size(900, 200).moveSelf(groundRect, 'top-right')
  const heroRect = Rect.size(28, 72)
    .moveSelf(groundRect.topLeft, 'top-right').shiftSelf(0, -9)
  const enemyRect = Rect.size(32, 96)
    .moveSelf(groundRect.topRight, 'top-left').shiftSelf(0, -5)


  const player = new Player()
  await player.load()

 

  viewer.onKeyPressed = keys => {
    keys.sensitivityX = 0.8
    if ( keys.horizontalAxisRaw  === 0) player.isIdle = true
    else {
      player.isIdle = false
      player.dir = keys.horizontalAxisRaw 
      
    }

    const pressed = keys.getPressed()

    if (pressed[Key.SPACE] && !player.jumping) {
      player.jumping = true
    }
    
    heroRect.shiftSelf(keys.horizontalAxis, 0)
    //console.log(keys.horizontalAxis)
  }

  let enMoveDir = -1

  let jy = 0
 
  const hy = heroRect.y
  const g = 1
  viewer.onFrameChanged = surface => {
    surface.clear()

    if (heroRect.y < hy) heroRect.shiftSelf(0, g)

    if (player.jumping) {
      if (jy < 5) jy += 0.5
      else {
        jy = 0
        player.jumping = false
      }
     
     
      heroRect.shiftSelf(0, -jy)
    }

    Sketch.new()
      .rect({ fill: '#2b2b2b' }, backgroundRect)
      .rect({ fill: '#311e09' }, groundRect)
      .draw(surface)

    const p_img = player.image
    p_img.rect.absCenter = heroRect.absCenter
    player.action()
    surface.blit(p_img, p_img.rect)

    displayFps(fps)
  }

  const ui = builders.ui()
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
