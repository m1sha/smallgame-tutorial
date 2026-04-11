import { Color, GL, GMath, Point, Rect, Time, vec2, vec3 } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { UIBuilder, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'
import { Viewer } from '../../../../shared'


export default async ({ container, containerSize, fps }: ScriptSettings): Promise<ScriptModule> => {
  const ui = new UIBuilder()
  const gl = new GL(containerSize, true)
  const glSurface = gl.toSurface()
  using programm = gl.createProgram(vertex, fragmnet, 'assemble-and-use')

  const r1 = new Rect(0, 0, 100, 300).gl(containerSize, 'triangles')
  const r2 = new Rect(-100, 100, 300, 100).gl(containerSize, 'triangles')

  const vao = gl.createVAO()

  let vertexCount = 0
  let instanceCount = 0


  vao.use(() => {
    const vbo = gl.vbo('static', 'float', { aPos: vec2 })
    vbo.push([
      ...r1,
      ...r2
    ])

    vertexCount = vbo.count

    //const aPos = gl.pabo('aPos', vec2)
    //aPos.push([
    //  ...r1,
    //  ...r2
    //])

    const aSize = gl.pabo('aColor', vec3)
    aSize.push([
      ...Color.from("#474747").toArray(),
      ...Color.from("#546f85").toArray(),
      ...Color.from("#5c124c").toArray(),
    ])
    aSize.div(1)

    instanceCount = aSize.vertextCount

    const aShift = gl.pabo('aTransform', vec3)
    aShift.push([
      0.5, -0.1, 15 * GMath.rad,
      1, -0.1, 45 * GMath.rad,
      1.5, -0.1,  10 * GMath.rad,
    ])
    aShift.div(1)
  })
  

  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  viewer.onFrameChanged = surface => {
    programm.use(() => {
      vao.use(() => {
        gl.clear(0x0)
        gl.drawArraysInstanced('triangles', 0, vertexCount, instanceCount)
      })
    })

    surface.blit(glSurface, glSurface.rect)
    displayFps(fps, Time.fps)
  }
  
 
  ui.info('DrawArrayInstanced')
  return {
    ui: ui.build(),
    dispose: () => {
      glSurface.remove()
      vao.remove()
      viewer.remove()
    }
  }
}