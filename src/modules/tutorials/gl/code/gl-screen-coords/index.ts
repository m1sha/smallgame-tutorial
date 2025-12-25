import { float, Game, GL, Primitive2D, Rect, Size, SurfaceGL, Time, vec2 } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const size = new Size(width, height)
  const gl = new GL(size, true)
  const prog = gl.createProgram(vertex, fragmnet, 'assemble-and-use')
  const glRect = new Rect(100, 10, 200, 200).gl(size, 'triangles')
  const glRect2 = new Rect(400, 10, 200, 200).gl(size, 'triangles')
  const geo = [...glRect, ...glRect2]
  const colors = [0.8, 0.8, 0.8, 0.3, 0.3, 0.3,    0.1, 0.1, 0.1, 0.2, 0.1, 0.2]
  const vao = gl.vao('static', 'float', { a_Position: vec2, a_Color: float }, geo, colors)
  vao.use(() => {
    gl.clear(0x0)
    gl.drawArrays('triangles', vao.vertexCount)
  })
  const glSurface = gl.toSurface()
  
  const { screen } = Game.create(width, height, container)
  screen.fill('#313131ff')
  screen.blit(glSurface, glSurface.rect)
  displayFps(fps, Time.fps)
 
  return {
    dispose() {
      prog.remove()
      vao.remove()
    },
  }
}