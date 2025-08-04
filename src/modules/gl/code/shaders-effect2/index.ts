import { Game, gameloop, loadImage, Primitive2D, SurfaceGL, TexCoord, Time, vec2 } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'
import { displayFps } from '../../../../utils/display-fps'

createGLScript('Shaders Effect 2', async ({ container, fps }) => {
  const w = 800
  const h = 800
  const glSurface = new SurfaceGL(w, h)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')
  
  const img = await loadImage('workflow.png')
  ctx.createTexture('u_sampler2D', img)
  
  const vertexCount = ctx
    .vbo('static', 'float', { aPosition: vec2, a_TexCoord: vec2 })
    .push(Primitive2D.rect(), TexCoord.rect())
  
  const time = ctx.uniform('time', 'float')

  const { screen } = Game.create(w, h, container)

  gameloop(() => {
    ctx.clear()
    ctx.drawArrays('triangle-strip', vertexCount)
    
    screen.fill('#222')
    screen.blit(glSurface, glSurface.rect)
    time.value = Time.time
    
    displayFps(fps, Time.fps)
  })
})
