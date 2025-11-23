import { Game, gameloop, GMath, Rect, Sketch, Time } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { createButton, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Car } from "./car"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { easeInBounce, easeInOutBounce, easeInOutElastic, easeInSine, easeOutBounce, easeInOutCirc, easeInOutQuad } from "../movements/func"
import { TelemetryBuilder } from "../../../../../components/example/code/telemetry"
import { Flag } from "./flag"
import { ParallaxBG } from "./parallax-bg"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = new TelemetryBuilder()
  const { game, screen } = Game.create(width, height, container)
  const car              = new Car()
  await car.create()
  car.rect.center        = screen.rect.center.shiftY(320)
  //car.rect.shiftSelf(-width / 2 + 400, 0)

  const parallaxBg = new ParallaxBG(screen.size)
  await parallaxBg.create()

  const startFlag = new Flag('#e04c1fff')
  startFlag.rect.moveSelf(car.rect.bottomRight, 'top-right')
  const endFlag = new Flag('#108533ff')
  endFlag.rect.moveSelf(car.rect.bottomRight, 'top-right')

  let edge0 = 0.2
  let edge1 = 1.0
  let dist = 10200
  let speed = 0.1

  const ground = new Sketch()
    .rect({ fill: 'rgba(58, 58, 58, 1)' }, new Rect(0, car.rect.absHeight - 80, width, 200))
    .rect({ fill: 'rgba(51, 49, 40, 1)' }, new Rect(0, car.rect.absHeight - 80 + 200, width, 300))
    .toSurface()

  let currSpeed = 0
  
  let t = 0
  let s = false
  let startPos = startFlag.rect.x
  let currPos = 0
  endFlag.rect.x = dist
  gameloop(() => {
    screen.fill('#c1cce0ff')
    parallaxBg.draw(screen)
    screen.blit(ground, ground.rect)
    car.draw(screen)
    startFlag.draw(screen)
    endFlag.draw(screen)
    
    t = t < 1 ? t + Time.deltaTime * speed : 1
    
    const c = GMath.smoothstep(edge0, edge1, easeInOutQuad(t))
    const x = c * dist
    if (s)
    currSpeed = Math.abs(x - currPos)  / Time.deltaTime
    currPos = x
    //car.rect.x = x
    car.i = x
    s = true

    parallaxBg.setPos(x+ startPos)

    startFlag.rect.x = -currPos + startPos
    endFlag.rect.x =   - currPos + dist + startPos

    displayFps(fps)
    telemetry.tick()
  })


  const ui = new UIBuilder()
  ui.group('Common', group => group
    .open()
    .tracker('Speed', 0.001, 3, 0.001, val => { speed = val }, speed)
    .tracker('Distabce', 100, 30000, 1, val => { dist = val }, dist)
  )
  ui.group('Smoothstep', group => group
    .open()
    .tracker('edge0', 0, 1, 0.001, val => { edge0 = val }, edge0)
    .tracker('edge1', 0, 1, 0.001, val => { edge1 = val }, edge1)
  )
  ui.button('Restart', () => { t = 0; telemetry.resetAuto(); currSpeed = 0; s = false; })

  telemetry.open()
  telemetry.openChart()
  telemetry.param('Distance', () => currPos.toFixed(4))
  telemetry.param('t', () => t.toFixed(4))
  telemetry.param('Speed', () => currSpeed.toFixed(4))
  telemetry.auto(() => t > 0, () => t > 1)
 

  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      game.kill() 
    }
  }
}
