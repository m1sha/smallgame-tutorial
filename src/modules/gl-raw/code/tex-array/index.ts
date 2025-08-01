import { GL, loadImage, setSize, vec2 } from "smallgame"
import ver from "./shaders/ver"
import frag from "./shaders/frag"
import { UVAtlas } from "./atlas"
import { Grid } from "./grid"

export default async function (): Promise<GL> {
  const vwSize = setSize(48,  64)
  const img = await loadImage('terrain.png')
  const uv = new UVAtlas(img, setSize(16, 16))
  const gl = new GL(vwSize)
  const program = gl.createProgram(ver, frag, 'assemble-and-use')
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

  const vertexCount = program
    .vbo('static', 'float', { aPosition: vec2 })
    .push(rects)
  
  let i = 0
  const count = () => i = i + 12
  program
    .subData('aTexCoord', 'vec2', vertexCount)
    .push(rect11)
    .push(rect12, count())
    .push(rect13, count())
    .push(rect21, count())
    .push(rect22, count())
    .push(rect23, count())
    .push(rect31, count())
    .push(rect32, count())
    .push(rect33, count())

    .build()
    //.push(rect4, 60)
  

  program.createTexture('uSampler', img, { minMag: 'nearest' })
  program.clear()
  program.drawArrays('triangles', vertexCount)
  
  return gl
}