import { Game, SurfaceGL, Time } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { displayFps } from '../../../../utils/display-fps'

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const glSurface = new SurfaceGL(width, height)
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')

  ctx.clear(0x0)
  ctx.drawArrays()

  
  const { screen } = Game.create(width, height, container)
  
  screen.fill('#ff0000')
  screen.blit(glSurface, glSurface.rect)
  displayFps(fps, Time.fps)
 
  return {}
}