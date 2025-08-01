import { Game, gameloop, GlSurface, Primitive2D, Time, vec2 } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { createGLScript } from '../script'
import { displayFps } from '../../../../utils/display-fps'

createGLScript('Shaders Effect 3', async ({ container, fps, width, height }) => {
  const glSurface = new GlSurface(width, height)
  const ctx = glSurface.context
  const program = glSurface.createDefaultProgram(vertex, fragmnet)
  
  const vertexCount = program
    .vbo('static', 'float', { aPosition: vec2 })
    .push(Primitive2D.rect())
  
  const time = program.uniform('iTime', 'float')
  program.uniform('iResolution', 'vec2').value = [width * 1.0, height * 1.0]
  const iMouse = program.uniform('iMouse', 'vec4')

  const { game, screen } = Game.create(width, height, container)

  let d = 0
  gameloop(() => {
    ctx.clear()
    ctx.drawArrays('triangle-strip', vertexCount)
    
    screen.fill('#222')
    screen.blit(glSurface, glSurface.rect)
    time.value = d
    
    displayFps(fps, Time.fps)

    for (const event of game.event.get()) {
      if (event.type === 'MOUSEMOVE') {
        iMouse.value = [event.pos.x * 1.0, event.pos.y * 1.0, 0.0, 0.0]
      }
    }

    d += Time.deltaTime
  })
})
