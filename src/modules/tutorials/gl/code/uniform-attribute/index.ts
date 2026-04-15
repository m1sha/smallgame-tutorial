import { gl_normalize, MemSurface, SurfaceGL, type TPoint } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { Icons, UIBuilder, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Viewer } from '../../../../shared'
import { displayFps } from '../../../../../utils/display-fps'

export default async ({ container, containerSize, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const glSurface = new SurfaceGL(width, height, { useOffscreen: true })
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')
  const tempSurface = new MemSurface(glSurface)

  const color = ctx.uniform('u_FragColor', 'vec2')
  color.value = [0.1, 0.9]

  const aPosition = ctx.attribute('aPosition', 'vec3')
  const points: TPoint[] = []

  const viewer = new Viewer(containerSize, container)
  viewer.onInput = event => {
   if ((event.type === 'MOUSEMOVE' || event.type === 'MOUSEDOWN') && event.lbc) {
    points.push(gl_normalize( event.pos, width, height))
   }
  }
  viewer.onFixedUpdate = () => {
    ctx.clear(0x0)
    for (const point of points) {
      aPosition.value = [point.x, point.y, 0.0]
      ctx.drawArrays()
    }
    
    tempSurface.clear()
    tempSurface.blit(glSurface, glSurface.rect)
  }
  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(tempSurface, tempSurface.rect)
    displayFps(fps)
  }

  const ui = new UIBuilder()
  ui
    .info(Icons.computerMouse + ' Use LMB to set a point on the screen')
    .button('Reset', () => { while(points.pop()); })

  return {
    ui: ui.build(),
    dispose() {
      viewer.remove()
    }
  }
}
