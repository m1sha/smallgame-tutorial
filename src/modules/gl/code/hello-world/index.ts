import { Game, GlSurface, Time } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'
import { displayFps } from '../../../../utils/display-fps'

createGLScript('Hello World', async ({ container, fps }) => {
  const w = 800
  const h = 800
  const glSurface = new GlSurface(w, h)
  const ctx = glSurface.context
  glSurface.createDefaultProgram(vertex, fragmnet)

  ctx.clear()
  ctx.drawArrays()
  
  const { screen } = Game.create(w, h, container)
  screen.fill('#f8f8f8')
  screen.blit(glSurface, glSurface.rect)
  displayFps(fps, Time.fps)
})