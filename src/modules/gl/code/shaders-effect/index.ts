import { Game, gameloop, GlSurface, Primitive2D, Time, vec2 } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'
import { displayFps } from '../../../../utils/display-fps'

createGLScript('Shaders Effect', async ({ container, fps }) => {
  const w = 800
  const h = 800
  const glSurface = new GlSurface(w, h)
  const ctx = glSurface.context
  const program = glSurface.createDefaultProgram(vertex, fragmnet)
  
  const time = program.uniform('time', 'float')
  const vertexCount = program
    .vbo('static', 'float', { aPosition: vec2 })
    .push(Primitive2D.rect())
  
  

  const { screen } = Game.create(w, h, container)
  
  gameloop(() => {
    ctx.clear()
    ctx.drawArrays('triangle-strip', vertexCount)
    
    screen.fill('#e9e9e9')
    screen.blit(glSurface, glSurface.rect)
    time.value = Time.time
    
    displayFps(fps, Time.fps)
  })
})
