import { Game, gameloop, GlSurface, rad, Time, vec2 } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'

createGLScript('Vertex Buffer', async ({ container, fps }) => {
  const w = 800
  const h = 800
  const glSurface = new GlSurface(w, h)
  const ctx = glSurface.context
  const program = glSurface.createDefaultProgram(vertex, fragmnet)

  const mat = program.uniform('u_mat', 'mat4')
  const vertexeCount = program
    .vbo('static', 'float', { aPosition: vec2 })
    .push([
      -0.5, 0.5,
      -0.5, -0.5,
      0.5, 0.5,
      0.5, -0.5
    ])
  

  const { screen } = Game.create(w, h, container)

  let a = 0

  gameloop(() => {
    const m = new DOMMatrix().translate(0.1, 0.0, 0.0).rotate(0,0,a).scale3d(Math.tan(rad(a)) * 0.15)
    mat.set(m)
    a += Time.deltaTime * 20

    ctx.clear()
    ctx.drawArrays('triangle-strip', vertexeCount)
    
    screen.fill('#e9e9e9')
    screen.blit(glSurface, glSurface.rect)


    fps.textContent = Time.fps.toFixed(0)
  })
  
})