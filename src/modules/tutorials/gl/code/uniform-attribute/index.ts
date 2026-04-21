import { Color, gl_normalize, MemSurface, Rect, setSize, Sketch, SurfaceGL, type TPoint } from 'smallgame'

import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { EntityListBuilder, Icons, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Viewer } from '../../../../shared'
import { displayFps } from '../../../../../utils/display-fps'

export default async ({ container, containerSize, width, height, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const glSurface = new SurfaceGL(width, height, { useOffscreen: true })
  const ctx = glSurface.context
  ctx.createProgram(vertex, fragmnet, 'assemble-and-use')
  const tempSurface = new MemSurface(glSurface)

  const colors = [
    '#612233', '#282261', '#22612c', '#5f5f5f',
    '#750d6d', '#1e2692', '#d4879c', '#463000',
    '#f5f0f1', '#b0e03e', '#cff154', '#019e89',
    '#b511d6', '#b80937', '#03a152', '#010050',
  ]
  const color = ctx.uniform('u_FragColor', 'vec3')
  color.value = Color.from(colors[0]).toArray('rgb') as any

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

  const ui = builders.ui()
  ui
    .info(Icons.computerMouse + ' Use LMB to set a point on the screen')
    .button('Reset', () => { while(points.pop()); })

  const entities = new EntityListBuilder()
  const entityGrid = entities.addGrid<string>(color => ({
    icon: Sketch.new().rect({ fill: color }, Rect.size(24, 24)).toSurface().toDataURL(),
    title: color
  }))
  colors.forEach(color => entityGrid.add(color))
  entityGrid.iconSize = setSize(24, 24)
  entityGrid.selected = colors[0]
  entityGrid.columnCount = 6
  entityGrid.onSelect = value => {
    color.value = Color.from(value).toArray('rgb') as any
  }
  

  return {
    ui: ui.build(),
    entities: entities.build(),
    dispose() {
      viewer.remove()
    }
  }
}
