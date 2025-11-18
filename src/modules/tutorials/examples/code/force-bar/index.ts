import { loadImage, Point, Game, gameloop, Time, Sketch, Rect, Text, Key, setSize, GMath } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { createSelect, createTracker, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { setDebounce } from "smallgame/src/time"
import { easeInElastic, easeInQuad, easeInBounce } from "../movements/func"
import { Bar } from "./bar"


const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const linear = (t: number) => t

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)

  const bar = new Bar(setSize(0,0))
  const bar2 = new Bar(setSize(0,0))
  const bar3 = new Bar(setSize(0,0))
  
  const text = new Text('Press Space', { fontSize: '50px', color: 'rgba(31, 48, 41, 1)' }).toSurface(250, 80)

  let func = easeInQuad
  let func2 = linear
  let func3 = (t: number) =>  t
  let force = 0
  let force2 = 0
  let force3 = 0
  let t = 0
  let speed = 1

  const raiseForce = setDebounce(() => { 
    if (t < 1) t += 0.01 * speed; 
    force = lerp(0, 800, func(t)) 
    force2 = lerp(0, 800, func2(t))
    force3 = GMath.smoothstep(.1, .8, func3(t)) * 800
  }, 30)

  const fallForce = setDebounce(() => { 
    if (t > 0) t -= 0.005 * speed; 
    force = lerp(0, 800, func(t)) 
    force2 = lerp(0, 800, func2(t))
    force3 = GMath.smoothstep(.1, .5, func(t)) * 800
  }, 30)

  gameloop(() => {
    screen.fill('#154d36ff')
    
    bar.force = force
    bar.update()
    screen.blit(bar.image, bar.rect.move(screen.rect.center.shiftX(-100), 'center-center'))

    bar2.force = force2
    bar2.update()
    screen.blit(bar2.image, bar2.rect.move(screen.rect.center.shiftX(-340), 'center-center'))

    bar3.force = force3
    bar3.update()
    screen.blit(bar3.image, bar3.rect.move(screen.rect.center.shiftX(-580), 'center-center'))

    
    screen.blit(text, text.rect.move(screen.rect.center.shift(200, -20), 'center-center'))

    displayFps(fps)


    if (game.key.getPressed()[Key.SPACE]) {
      raiseForce()
    } else {
      fallForce()
    }
  })


  const funcParam = createSelect('function', [ 'linear', 'easeInElastic', 'easeInBounce', 'easeInQuad' ], v => {
    if (v === 'linear') func = linear
    if (v === 'easeInElastic') func = easeInElastic
    if (v === 'easeInBounce') func = easeInBounce
    if (v === 'easeInQuad') func = easeInQuad
  }, 'easeInQuad')

  const speedParam = createTracker('Speed', 0.01, 4, 0.001, v => speed = v, 1)

  return {
    parameters: [funcParam, speedParam],
    dispose () { 
      game.kill() 
    }
  }
}
