import { Game, loadImage, vec2, Primitive2D, TexCoord, SurfaceGL } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'

createGLScript('Texture', async ({ container, fps }) => {
  await main(container)
})

async function main (container: HTMLDivElement) {
  const w = 800
  const h = 800
  const glSurface = new SurfaceGL(w, h)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  const img = await loadImage('workflow.png')

  ctx.createTexture('u_sampler2D', img)
  
  const vertexCount = ctx
    .vbo('static', 'float', { a_Position: vec2, a_TexCoord: vec2 })
    .push(Primitive2D.rect(), TexCoord.rect())

  ctx.clear()
  ctx.drawArrays('triangle-strip', vertexCount)
  
  const { screen } = Game.create(w, h, container)
  
  screen.fill('#18f8f8')
  screen.blit(glSurface, glSurface.rect)
}