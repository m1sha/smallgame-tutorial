import { Game, loadImage, vec2, Primitive2D, TexCoord, SurfaceGL } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'

createGLScript('Texture 2', async ({ container, fps }) => {
  const w = 800
  const h = 800
  const glSurface = new SurfaceGL(w, h)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  const img1 = await loadImage('workflow.png')
  const img2 = await loadImage('terrain.png')
  ctx.createTexture('u_sampler2D_1', img1)
  ctx.createTexture('u_sampler2D_2', img2)

  const vertexCount = ctx
    .vbo('static', 'float', { a_Position: vec2, a_TexCoord: vec2 })
    .push(Primitive2D.rect(), TexCoord.rect())

  ctx.clear(0x0)
  ctx.drawArrays('triangle-strip', vertexCount)
  
  const { screen } = Game.create(w, h, container)
  screen.fill('#f8f8f8')
  screen.blit(glSurface, glSurface.rect)
})