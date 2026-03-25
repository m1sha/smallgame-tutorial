import { Game, GL, Time } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'

export default async ({ container, containerSize, fps }: ScriptSettings): Promise<ScriptModule> => {
  const gl = new GL(containerSize, true)
  const glSurface = gl.toSurface()
  using _ = gl.createProgram(vertex, fragmnet, 'assemble-and-use')
  gl.clear(0x0)
  gl.drawArrays()
  
  const { screen } = Game.create(containerSize.width, containerSize.height, container)
  screen.fill('#194432')
  screen.blit(glSurface, glSurface.rect)
  displayFps(fps, Time.fps)
 
  return {}
}