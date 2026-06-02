import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { Key, Rect, Sketch, Time } from "smallgame"

import { Player } from "./player"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  const telemetry = builders.telemetry()
  const ui = builders.ui()

  const scrCenter = containerSize.half().toPoint()
  const groundRect = Rect.fromCenter(scrCenter, 900, 10).shiftSelf(0, 80)
  const backgroundRect = Rect.size(900, 200).moveSelf(groundRect, 'top-right')
  const heroRect = Rect.size(28, 72)
    .moveSelf(groundRect.topLeft, 'top-right').shiftSelf(0, -9)
  


  const player = new Player()
  await player.load()

  const force_recover = telemetry.def('force_recover', 14)
  let force_i = 0
  

  viewer.onKeyPressed = keys => {
    keys.sensitivityX = 0.8
    if ( keys.horizontalAxisRaw  === 0) player.isIdle = true
    else {
      player.isIdle = false
      player.dir = keys.horizontalAxisRaw 
      
    }

    const pressed = keys.getPressed()

    if (pressed[Key.SPACE] && !player.jumping && force_recover.value >= 14) {
      player.jumping = true
      force_i = force_recover.value
      force_recover.value = 0
    }
    
    heroRect.shiftSelf(keys.horizontalAxis, 0)
    //console.log(keys.horizontalAxis)
  }

  
 
  const hy = heroRect.y
  let a = 0.2
  viewer.onFrameChanged = surface => {
    surface.clear()

    if (force_i > 0) {
      force_i -= 80.5 * Time.deltaTime
      
     
     
      heroRect.shiftSelf(0, -force_i )
    }

    if (heroRect.y < hy) {
      a += a * Time.deltaTime
      console.log(a)
      heroRect.shiftSelf(0, a)
    }
    else {
      a = 3
      player.jumping = false
    }

    if (force_recover.value < 14 && !player.jumping) {
      force_recover.value += 40.5 * Time.deltaTime
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

 
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
