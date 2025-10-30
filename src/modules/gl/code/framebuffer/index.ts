import { GL, Size, vec2, vec3 } from "smallgame"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { displayFps } from "../../../../utils/display-fps"

import ver from "./shaders/ver"
import frag from "./shaders/frag"
import tex_ver from "./shaders/tex_ver"
import tex_frag from "./shaders/tex_frag"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const size = new Size(width, height)
  const gl = new GL(size, true)
  
  gl.blendFunc('SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA')

  using prog = gl.createProgram(ver, frag, 'assemble-and-use')
  const trianglesVAO = gl.vao('static', 'float', { pos: vec2, aColor: vec3 }, [
     0.5,  0.5,  0.00,    0.32,  0.93,
     0.0,  0.5,  0.00,    0.32,  0.63,
     0.5,  0.0,  0.00,    0.32,  0.63,

     0.0,  0.0,  0.40,    0.02,  0.03,
     0.2,  0.5,  0.40,    0.02,  0.03,
     0.5,  0.2,  0.40,    0.02,  0.03,

     0.1,  0.1,  0.04,    0.82,  0.03,
    -0.2, -0.5,  0.04,    0.52,  0.03,
    -0.5, -0.2,  0.04,    0.52,  0.03,
  ])

  using prog2 = gl.createProgram(tex_ver, tex_frag, 'assemble-and-use')
  const rectVAO = gl.vao('static', 'float', { pos: vec2, aTexCoord: vec2 }, [
    -1,   1,    0, 1,
    -1,  -1,    0, 0,
     1,   1,    1, 1,
     1,  -1,    1, 0,
  ])

  const texure = gl.createEmptyTexture(new Size(width, height))
  const fbo = gl.fbo(texure)
 
  prog.use(() => {
    trianglesVAO.use(() => {
      gl.useDepth(() => {
        fbo.use(() => {
          gl.clear(0x414141FF) 
          gl.drawArrays('triangles', trianglesVAO.vertexCount)
        })
      })
    })
  })
  
  prog2.use(() => {
    rectVAO.use(() => {
      texure.use(() => {
        gl.useBlend(() => {
          gl.drawArrays('triangle-strip', rectVAO.vertexCount)
        })
      })
    })
  })


  const canvas = document.createElement('canvas')
  canvas.width = size.width
  canvas.height = size.height
  canvas.getContext('bitmaprenderer')?.transferFromImageBitmap(gl.toBitmap())
  container.append(canvas)
  displayFps(fps)
  

  canvas.style.border = '1px solid white'

  return {}
}