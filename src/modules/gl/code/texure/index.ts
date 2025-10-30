import { Game, loadImage, vec2, Primitive2D, TexCoord, SurfaceGL } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  await main(container, width, height)
  return {}
}

async function main (container: HTMLDivElement, width: number, height: number) {
  const glSurface = new SurfaceGL(width, height)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  const img = await loadImage('workflow.png')
  const tv = await loadImage('tv.png')

  const tex = ctx.createTexture('u_sampler2D', img)
  
  const vertexCount = ctx
    .vbo('static', 'float', { a_Position: vec2, a_TexCoord: vec2 })
    .push(Primitive2D.rect(), TexCoord.rect())

  ctx.clear(0x0)
  ctx.drawArrays('triangle-strip', vertexCount)

  tex.update(tv)
  ctx.clear(0x0)
  ctx.drawArrays('triangle-strip', vertexCount)
  
  const { screen } = Game.create(width, height, container)
  
  screen.fill('#18f8f8')
  screen.blit(glSurface, glSurface.rect)
}