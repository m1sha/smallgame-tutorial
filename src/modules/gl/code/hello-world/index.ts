import { Game, SurfaceGL, Time } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'
import { displayFps } from '../../../../utils/display-fps'

createGLScript('Hello World', async ({ container, fps }) => {
  const w = 800
  const h = 800
  const glSurface = new SurfaceGL(w, h)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  ctx.clear()
  ctx.drawArrays()
  
  const { screen } = Game.create(w, h, container)
  screen.fill('#f8f8f8')
  screen.blit(glSurface, glSurface.rect)
  displayFps(fps, Time.fps)
})