import { Game, loadImage, SurfaceGL, Time } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'
import { displayFps } from '../../../../utils/display-fps'

createGLScript('Hello World', async ({ container, fps }) => {
  const w = 800
  const h = 800
  // const glSurface = new SurfaceGL(w, h)
  // const ctx = glSurface.context
  // ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  // ctx.clear(0x0)
  // ctx.drawArrays()

  const img = await loadImage('tv.png')
  
  const { screen } = Game.create(w, h, container)
  
  screen.fill('#ff0000')
  //screen.blit(glSurface, glSurface.rect)
  displayFps(fps, Time.fps)


  // const glSurface2 = new SurfaceGL(w, h)
  // const ctx2 = glSurface2.context
  // ctx2.createProgram(vertex, fragmnet, 'assemble-and-use')

  // ctx2.clear(0x0)
  // ctx2.drawArrays()
  // screen.blit(glSurface2, glSurface2.rect.shift(200, 0))


  debugger
  const glSurface3 = new SurfaceGL(w, h)
  glSurface3.create()
  glSurface3.blit(img, img.rect)
  
  screen.blit(glSurface3, glSurface3.rect)
  // screen.draw.fillStyle = '#4499aa'
  // screen.draw.fillRect(0, 0, 200, 100)
  
})