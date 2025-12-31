import { loadImage, Point, Game, gameloop, Time, Sketch, Rect, Text, Key, setSize, GMath } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { createSelect, createTracker, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { setDebounce } from "smallgame/src/time"
import { easeInElastic, easeInQuad, easeInBounce } from "../movements/func"
import { Bar } from "./bar"
import { Viewer } from "../../../../shared"
import { UIBuilder } from "../../../../../components/example/code/ui"


const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const linear = (t: number) => t

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  //const { game, screen } = Game.create(width, height, container)
  const viewer = new Viewer({ width, height}, container)

  const bar = new Bar(setSize(0,0))
  const bar2 = new Bar(setSize(0,0))
  const bar3 = new Bar(setSize(0,0))
  
  //const text = new Text('Press Space', { fontSize: '50px', color: 'rgba(31, 48, 41, 1)' }).toSurface(250, 80)

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

  viewer.onKeyPressed = key => {
    if (key.getPressed()[Key.SPACE]) {
      raiseForce()
    } else {
      fallForce()
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    
    bar.force = force
    bar.update()
    surface.blit(bar.image, bar.rect.move(surface.rect.center.shiftX(300), 'center-center'))

    bar2.force = force2
    bar2.update()
    surface.blit(bar2.image, bar2.rect.move(surface.rect.center.shiftX(0), 'center-center'))

    bar3.force = force3
    bar3.update()
    surface.blit(bar3.image, bar3.rect.move(surface.rect.center.shiftX(-300), 'center-center'))

    
    //surface.blit(text, text.rect.move(surface.rect.center.shift(200, -20), 'center-center'))

    displayFps(fps)


    
  }

//  const speedParam = createTracker('Speed', 0.01, 4, 0.001, v => speed = v, 1)

  const ui = new UIBuilder()
  ui.info('Press Space key to take force for bars')
  ui.select('function', [ 'linear', 'easeInElastic', 'easeInBounce', 'easeInQuad' ], v => {
    if (v === 'linear') func = linear
    if (v === 'easeInElastic') func = easeInElastic
    if (v === 'easeInBounce') func = easeInBounce
    if (v === 'easeInQuad') func = easeInQuad
  }, 'easeInQuad')
  ui.tracker('Speed', 0.01, 4, 0.001, v => speed = v, 1)

  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
