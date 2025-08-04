import { Game, gameloop, SurfaceGL, Time, vec2, vec3 } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'

createGLScript('Vertex Buffer 2', async ({ container, fps }) => {
  const w = 800
  const h = 800
  const glSurface = new SurfaceGL(w, h)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  const mat = ctx.uniform('u_mat', 'mat4')
  const points = [
    -0.5,  0.5,
    -0.5, -0.5,
     0.5,  0.5,
     0.5, -0.5,
     -0.6, -0.1
  ]

  const colors = [
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    1.0, 0.0, 1.0
  ]

  const vertexeCount = ctx
    .vbo('static', 'float', { aPosition: vec2, aColor: vec3 })
    .push(points, colors)
 

  const { screen } = Game.create(w, h, container)

  let a = 0

  gameloop(() => {
    const m = new DOMMatrix()//.translate(0.1, 0.0, 0.0).rotate(0,0,a).scale3d((Math.sin(rad(a))/ Math.cos(rad(a))) * 0.65)
    mat.set(m)
    a += Time.deltaTime * 200

    ctx.clear()
    ctx.drawArrays('points', vertexeCount)
    
    screen.fill('#e9e9e9')
    screen.blit(glSurface, glSurface.rect)


    fps.textContent = Time.fps.toFixed(0)
  })
  
})