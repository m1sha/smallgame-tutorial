import { gameloop, GL, loadImage, Primitive2D, Size, Surface, TexCoord, vec2 } from "smallgame"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { displayFps } from "../../../../utils/display-fps"

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'

export default async ({ container, fps }: ScriptSettings): Promise<ScriptModule> => {
  const gl = new GL(new Size(800, 800))
  container.append(gl.canvas as HTMLCanvasElement)

  let img = await loadImage('terrain.png')
  let img2 = await loadImage('terrain.png')

 
  
  const { width, height } = img.pixels

  

  const n = 1000
  const val2 = c1(img2, n) 
  const val1 = s1(img, n) 
  

  console.log( val1< val2 ? 'flipSelf faster' : 'flipImageDataVertically faster')
  console.log('flipSelf: ', val1)
  console.log('flipImageDataVertically: ', val2)

  const data = img.pixels.imageData.data

  gl.createProgram(vertex, fragmnet, 'assemble-and-use')

  

  const vao = gl
    .vao('static', 'float', { a_Position: vec2, a_TexCoord: vec2 }, Primitive2D.rect(), TexCoord.rect())
    

  const pbo = gl.pbo()
  pbo.setData(data)

  //const tex = gl.createEmptyTexture(new Size(800, 800), 'sampler')

  //gl.createTexture('u_sampler2D', img)

  gl.uniform('u_sampler2D', 'int').value = 0
  const texture = gl.ctx.createTexture();
  gl.ctx.bindTexture(gl.ctx.TEXTURE_2D, texture);
  gl.ctx.texImage2D(gl.ctx.TEXTURE_2D, 0, gl.ctx.RGBA, width, height, 0, gl.ctx.RGBA, gl.ctx.UNSIGNED_BYTE, null);
  gl.ctx.texParameteri(gl.ctx.TEXTURE_2D, gl.ctx.TEXTURE_MIN_FILTER, gl.ctx.LINEAR);
  
  gl.ctx.bindTexture(gl.ctx.TEXTURE_2D, null);

  
  
  pbo.bind()
  gl.ctx.bindTexture(gl.ctx.TEXTURE_2D, texture);
  gl.ctx.texImage2D(gl.ctx.TEXTURE_2D, 0, gl.ctx.RGBA, width, height, 0, gl.ctx.RGBA, gl.ctx.UNSIGNED_BYTE, 0)
  gl.ctx.bindTexture(gl.ctx.TEXTURE_2D, null);
  pbo.unbind()

  gl.ctx.bindTexture(gl.ctx.TEXTURE_2D, texture);


  

  gameloop(() => {
gl.clear(0x0)
  vao.bind()
  gl.drawArrays('triangle-strip', vao.vertexCount)
  vao.unbind()

  displayFps(fps)
  })
  
  //gl.ctx.bindTexture(gl.ctx.TEXTURE_2D, null);

  

 return {} 
}

function flipImageDataVertically(imageData: ImageData) {
  const rowSize = imageData.width * 4;
  const temp = new Uint8ClampedArray(rowSize);
  const data = imageData.data;
  
  for (let y = 0; y < imageData.height / 2; y++) {
    const topOffset = y * rowSize;
    const bottomOffset = (imageData.height - y - 1) * rowSize;
    
    temp.set(data.subarray(topOffset, topOffset + rowSize));
    data.copyWithin(topOffset, bottomOffset, bottomOffset + rowSize);
    data.set(temp, bottomOffset);
  }
}

function s1 (img: Surface, n: number) {
 const s1 = performance.now()
  for (let i = 0; i < n; i++) {
    img.flipSelf('y')
  }
  const s2 = performance.now() - s1
  return s2
}

function c1 (img: Surface, n: number) {
  const c1 = performance.now()
  for (let i = 0; i < n; i++) {
    flipImageDataVertically(img.pixels.imageData)
  }
  const c2 = performance.now() - c1
  return c2
}
