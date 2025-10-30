import { Game, gameloop, gl_normalize, SurfaceGL, Time, type TPoint } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const glSurface = new SurfaceGL(width, height)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  const color = ctx.uniform('u_FragColor', 'vec2')
  color.value = [0.1, 0.9]

  const aPosition = ctx.attribute('aPosition', 'vec3')

  const { game, screen } = Game.create(width, height, container)

  const points: TPoint[] = []
  gameloop(() => {

    for (const event of game.event.get()) {
      if (event.type === 'MOUSEDOWN') {
        
        points.push(gl_normalize( event.pos, width, height))
      }
    }
  
    ctx.clear(0x0)

    for (const point of points) {
      aPosition.value = [point.x, point.y, 0.0]
      ctx.drawArrays()
    }
    
  
    screen.fill('#e9e9e9')
    screen.blit(glSurface, glSurface.rect)

    fps.textContent = Time.fps.toFixed(0)
  })
  return {}
}
