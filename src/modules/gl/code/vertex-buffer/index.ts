import { Game, gameloop, rad, SurfaceGL, Time, vec2 } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const glSurface = new SurfaceGL(width, height)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  const mat = ctx.uniform('u_mat', 'mat4')
  const vertexeCount = ctx
    .vbo('static', 'float', { aPosition: vec2 })
    .push([
      -0.5, 0.5,
      -0.5, -0.5,
      0.5, 0.5,
      0.5, -0.5
    ])
  

  const { screen } = Game.create(width, height, container)

  let a = 0

  gameloop(() => {
    const m = new DOMMatrix().translate(0.1, 0.0, 0.0).rotate(0,0,a).scale3d(Math.tan(rad(a)) * 0.15)
    mat.set(m)
    a += Time.deltaTime * 20

    ctx.clear(0x0)
    ctx.drawArrays('triangle-strip', vertexeCount)
    
    screen.fill('#e9e9e9')
    screen.blit(glSurface, glSurface.rect)


    fps.textContent = Time.fps.toFixed(0)
  })
  
  return {}
}
