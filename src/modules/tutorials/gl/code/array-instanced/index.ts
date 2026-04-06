import { Color, float, Game, GL, Rect, Time, vec2, vec3 } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { UIBuilder, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'

export default async ({ container, containerSize, fps }: ScriptSettings): Promise<ScriptModule> => {
  const ui = new UIBuilder()
  const gl = new GL(containerSize, true)
  const glSurface = gl.toSurface()
  using _ = gl.createProgram(vertex, fragmnet, 'assemble-and-use')

  const r1 = new Rect(10, 10, 100, 100).gl(containerSize, 'triangles')
  const r2 = new Rect(10, 110, 200, 100).gl(containerSize, 'triangles')

  const vbo = gl.vbo('static', 'float', { aPos: vec2 })
  vbo.push([
   ...r1,
   ...r2
  ])

  //const aPos = gl.pointerArray('aPos', vec2, 'float', 2)
  //aPos.push([
  //  ...r1,
  //  ...r2
  //])

  

  const aSize = gl.pointerArray('aColor', vec3, 'float', 3)
  aSize.push([
    ...Color.from("#474747").toArray(),
    ...Color.from("#546f85").toArray(),
    ...Color.from("#5c124c").toArray(),
  ])
  aSize.div(1)


  const aShift = gl.pointerArray('aShift', vec2, 'float', 2)
  aShift.push([
    0.1, -0.2,
    0.3, -0.2,
    0.5, -0.2,
  ])
  aShift.div(1)

  

  
  gl.clear(0x0)
  gl.drawArraysInstanced('triangles', 0, 12, 3)
  
  const { screen } = Game.create(containerSize.width, containerSize.height, container)
  screen.fill('#194432')
  screen.blit(glSurface, glSurface.rect)
  displayFps(fps, Time.fps)
 
  ui.info('DrawArrayInstanced')
  return {
    ui: ui.build()
  }
}