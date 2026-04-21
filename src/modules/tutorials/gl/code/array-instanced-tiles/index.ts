import { GL, loadImage, MatrixUtils, MemSurface, Point, Rect, Time, vec2 } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'
import { Viewer } from '../../../../shared'

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const ui = builders.ui()
  const gl = new GL(containerSize)
  const glSurface = gl.toSurface()
  using programm = gl.createProgram(vertex, fragmnet, 'assemble-and-use')

  const img = await loadImage('platformer/Terrain_(16x16).png')
  const rect = Rect.size(64, 64)
  const tileSize = new Point(16, 16)
  const tileRows = 11
  const tileCols = 22
  const shift = new Point(300, 50)
  const gap = 4
  const getTile = (col: number, row: number) => new Point(col * tileSize.x, row * tileSize.y).shiftYSelf(tileSize.y).uv(img.rect).arr()
  
  const tilesPositions = []
  const tiles = []
  for (let i = 0; i < tileRows; i ++) {
    for (let j = 0; j < tileCols; j ++) {
      tilesPositions.push(...[shift.x + j * rect.width + j * gap, shift.y + i * rect.height + i * gap,])
      tiles.push(...getTile(j, i))
    }  
  }

  const vao = gl.createVAO()
  let vertexCount = 0
  let instanceCount = 0
  
  gl.createTexture('uSampler', img, { minMag: 'nearest' })
  gl.uniform('uResolution', 'vec2').value = [containerSize.width, containerSize.height]
  gl.uniform('uProj', 'mat3').value = MatrixUtils.ortho2D(0, containerSize.width, containerSize.height, 0) as any
  gl.uniform('uTileSize', 'vec2').value = tileSize.uv(img.rect).arr()

  vao.use(() => {
    vertexCount = gl.pabo('aPos', vec2)
      .push(rect.triangles())

    instanceCount = gl.pabo('aShift', vec2)
      .div(1)
      .push(tilesPositions)
    
    gl.pabo('aTexCoord', vec2)
      .div(1)
      .push(tiles)
  })

  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  const tempSurface = new MemSurface(glSurface)
  programm.use(() => {
    vao.use(() => {
      gl.clear(0x0)
      gl.drawArraysInstanced('triangle-strip', 0, vertexCount, instanceCount)
    })
  })
  tempSurface.blit(glSurface, glSurface.rect)

  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(tempSurface, tempSurface.rect)
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