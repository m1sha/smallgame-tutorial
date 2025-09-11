import { GL, loadImage, setSize, Surface, vec2 } from "smallgame"
import ver from "./shaders/ver"
import frag from "./shaders/frag"
import { UVAtlas } from "./atlas"
import { Grid } from "./grid"

export default async function (): Promise<{ canvas: HTMLCanvasElement }> {
  const vwSize = setSize(16,  16)
  const img = await loadImage('terrain.png')
  const uv = new UVAtlas(img, setSize(16, 16))
  const gl = new GL(vwSize, true)
  gl.createProgram(ver, frag, 'assemble-and-use')
  gl.viewport(vwSize)

  const rectClear = uv.rect(3, 0)
  const rect11 = uv.rect(0, 0)
  const rect12 = uv.rect(0, 2)
  const rect13 = uv.rect(0, 3)
  
  const rect21 = uv.rect(1, 0)
  const rect22 = uv.rect(1, 2)
  const rect23 = uv.rect(1, 3)

  const rect31 = uv.rect(2, 0)
  const rect32 = uv.rect(2, 2)
  const rect33 = uv.rect(2, 3)

  console.log(rect11)

  

  const grid = new Grid(3, 3, setSize(16, 16), vwSize)
  const rects = grid.rects()

  const vertexCount = gl
    .vbo('static', 'float', { aPosition: vec2 })
    .push(rects)
  
  let i = 0
  const count = () => i = i + 12
  gl
    .subData('aTexCoord', 'vec2', vertexCount)
    .push(rect11)
    // .push(rect12, count())
    // .push(rect13, count())
    // .push(rect21, count())
    // .push(rect22, count())
    // .push(rect23, count())
    // .push(rect31, count())
    // .push(rect32, count())
    // .push(rect33, count())

    .build()
    //.push(rect4, 60)
  

  gl.createTexture('uSampler', img, { minMag: 'nearest' })
  
  gl.enableDepth()
  gl.enableScissor()
  gl.viewport(vwSize)
  gl.scissor(vwSize)
  gl.clear(0x0)
  gl.drawArrays('triangles', vertexCount)

 

  
  const bitmap = gl.toBitmap()
  gl.dispose()
  const c = document.createElement('canvas')
  c.setAttribute('name', 'c2')
  c.getContext('bitmaprenderer')?.transferFromImageBitmap(bitmap)

  
  const gl2 = new GL(vwSize, true)
  gl2.createProgram(ver, frag, 'assemble-and-use')
  gl2.viewport(vwSize)

   const vertexCount2 = gl2
    .vbo('static', 'float', { aPosition: vec2 })
    .push(rects)

  gl2
    .subData('aTexCoord', 'vec2', vertexCount)
    .push(rect11)
    .build()

  gl2.createTexture('uSampler', img, { minMag: 'nearest' })
  
  gl2.enableDepth()
  gl2.enableScissor()
  gl2.viewport(vwSize)
  gl2.scissor(vwSize)
  gl2.clear(0x0)
  gl2.drawArrays('triangles', vertexCount2)

  debugger
  const bitmap2 = gl2.toBitmap() //Export
  const c2 = document.createElement('canvas')
  c2.setAttribute('name', 'c2')
  c2.getContext('bitmaprenderer')?.transferFromImageBitmap(bitmap2) //Import

  
  
  return { canvas: c2 }
}