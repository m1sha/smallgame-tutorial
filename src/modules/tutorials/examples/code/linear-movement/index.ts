import { Game, gameloop, GMath, Rect, Sketch, Time } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { createButton, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Car } from "./car"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { easeInBounce, easeInOutBounce, easeInOutElastic, easeInSine, easeOutBounce } from "../movements/func"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)
  const car              = new Car()
  await car.create()
  car.rect.center        = screen.rect.center
  car.rect.shiftSelf(-width / 2 + 400, 0)

  let edge0 = 0.2
  let edge1 = 1.0
  let dist = 1200
  let speed = 0.08

  const ground = new Sketch()
    .rect({ fill: 'rgba(58, 58, 58, 1)' }, new Rect(0, car.rect.absHeight - 80, width, 200))
    .rect({ fill: 'rgba(51, 49, 40, 1)' }, new Rect(0, car.rect.absHeight - 80 + 200, width, 300))
    .toSurface()

  
  let t = 0
  gameloop(() => {
   
    screen.fill('#c1cce0ff')
    screen.blit(ground, ground.rect)
    car.draw(screen)
    

    if (t < 1)
      t += Time.deltaTime * speed
    
    const c = GMath.smoothstep(0.2, 1., easeOutBounce(t))
    car.rect.x = c * dist
    car.i = c * dist
    

    displayFps(fps)
  })


  const ui = new UIBuilder()
  ui.group('Common', group => group
    .open()
    .tracker('Speed', 0.001, 3, 0.001, val => { speed = val }, speed)
    .tracker('Distabce', 100, 1600, 1, val => { dist = val }, dist)
  )
  ui.group('Smoothstep', group => group
    .open()
    .tracker('edge0', 0, 1, 0.001, val => { edge0 = val }, edge0)
    .tracker('edge1', 0, 1, 0.001, val => { edge1 = val }, edge1)
  )
  ui.button('Restart', () => t = 0)

  return {
    ui: ui.build(),
    dispose () { 
      game.kill() 
    }
  }
}
