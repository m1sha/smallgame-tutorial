import { float, Game, GL, loadImage, MemSurface, Primitive2D, TexCoord, Time, vec2 } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'
import { Viewer } from '../../../../shared'

export default async ({ container, containerSize, fps }: ScriptSettings): Promise<ScriptModule> => {
  const gl = new GL(containerSize, true)
  const glSurface = gl.toSurface()
  using program = gl.createProgram(vertex, fragmnet, 'assemble-and-use')
  
  const imgs = await loadImages()
  const texArr = gl.createTextureArray('uSampler', imgs, { wrapS: 'repeat', wrapT: 'repeat', minMag: 'linear', mipmap: { level: 1 } })
  const uOffset = gl.uniform('uOffset', 'vec2')
  uOffset.value = [0, 0]
  //gl.createTexture('uSampler', imgs[0])

  const count = gl.vbo('static', 'float', { aPosition: vec2, aTexCoord: vec2 }).push(Primitive2D.rect(), TexCoord.rect())
  console.log(count)

  const pp = gl.pabo('aLayer', float, 'static')
  const ins = pp.div(1)
  .push([0, 1, 2, 3, 4, 5, 6])

    gl.pabo('aCoof', float, 'static')
    .div(1)
    .push([0.9, 0.85, 0.8,0.78, 0.77, 0.75, 0.7])
  
  let x = 0
  const viewer = new Viewer(containerSize, container)

  const temp = new MemSurface(containerSize)

 

  const draw = () => {
gl.clear(0x0)
      gl.drawArraysInstanced('triangle-strip', 0, count, ins)
      x += 0.005
      
      uOffset.value = [x, 0]
      temp.blit(glSurface, glSurface.rect)  
    
  }

  draw()
  viewer.onFixedUpdate = () => {
draw()
  
  }

  viewer.onFrameChanged = surface => {
   


    surface.clear()
    surface.blit(temp, temp.rect)
    //surface.blit(glSurface, glSurface.rect)
    displayFps(fps, Time.fps)
  }
  
 
  return {
    dispose () {
      program.remove()
      texArr.remove()
      viewer.remove()
    }
  }
}

const loadImages = async () => {
  const list = [
    '/platformer/parallax/v4/1.png',
    '/platformer/parallax/v4/2.png',
    '/platformer/parallax/v4/3.png',
    '/platformer/parallax/v4/4.png',
    '/platformer/parallax/v4/5.png',
    '/platformer/parallax/v4/6.png',
    '/platformer/parallax/v4/7.png'
  ]
    const rates = [1, 0.95, 0.9, 0.85, 0.8,  0.75, 0.7]
    const names = list
      .map(url => url.split('/').at(-1)?.replace('.png', '') ?? 'some-name')
    const images = await Promise.all(list.map(url => loadImage(url)))
  
     for (let i = 0; i < list.length; i++) {
       const name = names[i]
       const image = images[i]
       //image.zoomSelf(.0125)
     }

    return images
  }