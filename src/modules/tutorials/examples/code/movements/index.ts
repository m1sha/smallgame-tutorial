import { displayFps } from "../../../../../utils/display-fps"
import { gameloop, killgameloop, Point, Rect, Sketch, Surface, Time } from "smallgame"
import { lerp, easeOutBounce, easeOutElastic, easeInOutCirc, easeInElastic, easeInSine } from "./func"
import { createSelect, type ScriptSettings, type ScriptModule } from "../../../../../components/example"


export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const screen = new Surface(width, height)
  container.append(screen.origin as any)

  const circleSketch = new Sketch()
  const rect = Rect.size(100, 100)
  circleSketch.circle({ fill: '#2f553cff' }, rect.center, rect.width * 0.5)
  const surface = circleSketch.toSurface()

  let t  = 0
  let func = easeOutBounce

  const startPoint = new Point(rect.width * 2,  rect.height)
  const endPoint = new Point(screen.rect.width - rect.width * 2, screen.rect.height - rect.height * 2)


  const lineSketch = new Sketch()
  
  lineSketch.line({ stroke: '#6e6e6eff', lineWidth: 4, lineDash: [3, 5] }, startPoint, endPoint)
  const surface2 = lineSketch.toSurface(screen.rect.width, screen.rect.height)

  gameloop(() => {
    screen.fill('#38393dff')
    screen.blit(surface2, surface2.rect)
    screen.blit(surface, surface.rect)

    if (t < 1) t +=  Time.deltaTime * 0.2

    surface.rect.moveSelf(lerp(startPoint, endPoint, func(t)), 'center-center')
    displayFps(fps)
  })

  const curveTypeNames = ['easeOutBounce', 'easeOutElastic', 'easeInOutCirc', 'easeInElastic', 'easeInSine']
  const curveTypeParam = createSelect(
    'Curve Type', 
    curveTypeNames, 
    name => {
      t = 0
      const index = curveTypeNames.findIndex(p => p === name)
      func = [easeOutBounce, easeOutElastic, easeInOutCirc, easeInElastic, easeInSine][index]
    }, 
    'easeOutBounce'
  )

  return {
    parameters: [
      curveTypeParam
    ],
    dispose () {
      killgameloop()
    }
  }
}

