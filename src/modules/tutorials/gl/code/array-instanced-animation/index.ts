import { float, GL, GlPointerArrayBufferObject, GMath, loadImage, Rect, Time, vec2 } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { UIBuilder, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'
import { Viewer } from '../../../../shared'

export default async ({ container, containerSize, fps }: ScriptSettings): Promise<ScriptModule> => {
  const ui = new UIBuilder()
  const gl = new GL(containerSize)
  const glSurface = gl.toSurface()
  using programm = gl.createProgram(vertex, fragmnet, 'assemble-and-use')

  const img = await loadImage('space-striker/asteroids/Asteroid_1.png')
  gl.createTexture('uSampler', img)
  gl.uniform('uResolution', 'vec2').value = [containerSize.width, containerSize.height]

  const rect = Rect.size(100, 100)
  rect.center = Rect.size(containerSize).center

  gl.uniform('uRectCenter', 'vec2').value = rect.absCenter.arr()

  const rectArr = rect.triangles()
  const texCoord = new Rect(0, 0, 1, 1).triangles()

  const vao = gl.createVAO()
  let vertexCount = 0
  let instanceCount = 0
  let rotBuffer: GlPointerArrayBufferObject | null = null

  vao.use(() => {
    const vbo = gl.vbo('static', 'float', { aPos: vec2, aTexCoord: vec2 })
    vertexCount = vbo.push(rectArr, texCoord)

    instanceCount = gl.pabo('aShift', vec2)
      .div(1)
      .push([
        -300., 0.,
        0., 0., 
        300., 0.,
      ])

    rotBuffer = gl.pabo('aAngle', float, 'dynamic')
    rotBuffer
      .div(1)
      .push([
        90 * GMath.rad,
        45 * GMath.rad,
        0 * GMath.rad,
      ])
  })

  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  let a = 0
  viewer.onFixedUpdate = () => {
    a += 2.5

    rotBuffer.set([
      (90 - a) * GMath.rad,
    ])

    rotBuffer.set([
      (45 + a) * GMath.rad,
      (270  + a) * GMath.rad,
    ], Float32Array.BYTES_PER_ELEMENT )

    programm.use(() => {
      vao.use(() => {
         gl.clear(0x0)
         gl.drawArraysInstanced('triangle-strip', 0, vertexCount, instanceCount)
      })
    })
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
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