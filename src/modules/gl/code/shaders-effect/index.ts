import { Game, gameloop, Primitive2D, SurfaceGL, Time, vec2 } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'
import { displayFps } from '../../../../utils/display-fps'

createGLScript('Shaders Effect', async ({ container, fps }) => {
  const w = 800
  const h = 800
  const glSurface = new SurfaceGL(w, h)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')
  
  const time = ctx.uniform('time', 'float')
  const vertexCount = ctx
    .vbo('static', 'float', { aPosition: vec2 })
    .push(Primitive2D.rect())
  
  

  const { screen } = Game.create(w, h, container)
  
  gameloop(() => {
    ctx.clear()
    ctx.drawArrays('triangle-strip', vertexCount)
    
    screen.fill('#e9e9e9')
    screen.blit(glSurface, glSurface.rect)
    time.value = Time.time
    
    displayFps(fps, Time.fps)
  })
})
