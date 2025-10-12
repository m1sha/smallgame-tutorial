import { displayFps } from "../../../../utils/display-fps"
import { createScript } from "../script"
import { Game, gameloop, Point, Rect, Sketch, Surface, Time } from "smallgame"
import { lerp, easeOutBounce, easeOutElastic, easeInOutCirc, easeInElastic, easeInSine } from "./func"


createScript('Movements', async ({ container, width, height, fps, selector }) => {
  //const { screen } = Game.create(width, height, container)
  const screen = new Surface(width, height)
  container.append(screen.origin as any)

  const circleSketch = new Sketch()
  const rect = Rect.size(100, 100)
  circleSketch.circle({ fill: '#116677' }, rect.center, rect.width * 0.5)
  const surface = circleSketch.toSurface()
  

  selector.items.push({ id: 'easeOutBounce', name: 'easeOutBounce' })
  selector.items.push({ id: 'easeOutElastic', name: 'easeOutElastic' })
  selector.items.push({ id: 'easeInOutCirc', name: 'easeInOutCirc' })
  selector.items.push({ id: 'easeInElastic', name: 'easeInElastic' })
  selector.items.push({ id: 'easeInSine', name: 'easeInSine' })
  //easeInElastic

  let t  = 0
  let func = easeOutBounce

  const startPoint = new Point(rect.width * 2,  rect.height)
  const endPoint = new Point(screen.rect.width - rect.width * 2, screen.rect.height - rect.height * 2)


  const lineSketch = new Sketch()
  
  lineSketch.line({ stroke: '#353535ff', lineWidth: 4, lineDash: [3, 5] }, startPoint, endPoint)
  const surface2 = lineSketch.toSurface(screen.rect.width, screen.rect.height)

  gameloop(() => {
    screen.fill('#73797eff')
    screen.blit(surface2, surface2.rect)
    screen.blit(surface, surface.rect)
    

    if (t < 1) t +=  Time.deltaTime * 0.2

    surface.rect.moveSelf(lerp(startPoint, endPoint, func(t)), 'center-center')
    displayFps(fps)
  })

  selector.callback = id => { 
    t = 0
    switch (id) {
      case 'easeOutBounce': 
        func = easeOutBounce
        break
      case 'easeOutElastic': 
        func = easeOutElastic
        break
      case 'easeInOutCirc': 
        func = easeInOutCirc
        break
      case 'easeInElastic': 
        func = easeInElastic
        break
      case 'easeInSine': 
        func = easeInSine
        break
    }
  }
})