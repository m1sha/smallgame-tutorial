import { Game, gameloop, gl_normalize, SurfaceGL, Time, type TPoint } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'

createGLScript('Uniforms & Attributes', async ({container, fps}) => {
  const w = 800
  const h = 800
  const glSurface = new SurfaceGL(w, h)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  const color = ctx.uniform('u_FragColor', 'vec2')
  color.value = [0.1, 0.9]

  const aPosition = ctx.attribute('aPosition', 'vec3')

  const { game, screen } = Game.create(w, h, container)

  const points: TPoint[] = []
  gameloop(() => {

    for (const event of game.event.get()) {
      if (event.type === 'MOUSEDOWN') {
        
        points.push(gl_normalize( event.pos, w, h))
      }
    }
  
    ctx.clear()

    for (const point of points) {
      aPosition.value = [point.x, point.y, 0.0]
      ctx.drawArrays()
    }
    
  
    screen.fill('#e9e9e9')
    screen.blit(glSurface, glSurface.rect)

    fps.textContent = Time.fps.toFixed(0)
  })
})
