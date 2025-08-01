import { Game, GlSurface, loadImage, vec2, Primitive2D, TexCoord } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'

createGLScript('Texture 2', async ({ container, fps }) => {
  const w = 800
  const h = 800
  const glSurface = new GlSurface(w, h)
  const ctx = glSurface.context
  const program = glSurface.createDefaultProgram(vertex, fragmnet)

  const img1 = await loadImage('workflow.png')
  const img2 = await loadImage('Dungeon.png')
  program.createTexture('u_sampler2D_1', img1)
  program.createTexture('u_sampler2D_2', img2)

  const vertexCount = program
    .vbo('static', 'float', { a_Position: vec2, a_TexCoord: vec2 })
    .push(Primitive2D.rect(), TexCoord.rect())

  ctx.clear()
  ctx.drawArrays('triangle-strip', vertexCount)
  
  const { screen } = Game.create(w, h, container)
  screen.fill('#f8f8f8')
  screen.blit(glSurface, glSurface.rect)
})