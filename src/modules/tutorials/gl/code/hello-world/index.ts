import { Game, GL, Size, SurfaceGL, Time } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const size = new Size(width, height)
  const gl = new GL(size, true)
  const glSurface = gl.toSurface()
  using _ = gl.createProgram(vertex, fragmnet, 'assemble-and-use')
  gl.clear(0x0)
  gl.drawArrays()
  
  const { screen } = Game.create(width, height, container)
  screen.fill('#1d2752ff')
  screen.blit(glSurface, glSurface.rect)
  displayFps(fps, Time.fps)
 
  return {}
}