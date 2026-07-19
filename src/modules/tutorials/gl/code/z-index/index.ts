import { Color, Game, gameloop, GL, killgameloop, Rect, Size, Time, vec3, vec4 } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'

class Rect3D extends Rect {
  z: number

  constructor (x: number, y: number, width: number, height: number, z: number) {
    super(x, y, width, height)
    this.z = z
  }

  gl (size: Size, tri: 'triangles' | 'triangle-strip') {
    const vertexies = super.gl(size, tri)
    const result: number[] = []
    for (let i = 0; i < vertexies.length; i++) {
      result.push(vertexies[i])
      if ((i + 1) % 2 === 0) {
        result.push(this.z) 
      }
    }
    return result
  }
}

class ColoredRect3D extends Rect3D {
  color: string

  constructor (x: number, y: number, width: number, height: number, z: number, color: string) {
    super(x, y, width, height, z)
    this.color = color
  }

  gl (size: Size, tri: 'triangles' | 'triangle-strip') { 
    const vertexies = super.gl(size, tri)
    const color = Color.from(this.color).toArray('rgba')
    debugger
    return this.insertColor(vertexies, color, 3)
  }

  private insertColor (vertexies: number[], color: number[], vertexPointCount: number) {
    const result: number[] = []
    for (let i = 0; i < vertexies.length; i++) {
      result.push(vertexies[i])
      if ((i + 1) % vertexPointCount === 0) {
        result.push(...color)
      }
    }
    return result
  }
}

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const ui = builders.ui()
  const gl = new GL(containerSize, true)
  const glSurface = gl.toSurface()
  const program = gl.createProgram(vertex, fragmnet, 'assemble-and-use')
  const center = containerSize.half().toPoint()
  const rect1 = new ColoredRect3D(center.x - 200, center.y - 250, 120.5, 500.5, -0.5, '#ac2b3a90').gl(containerSize, 'triangles')
  const rect2 = new ColoredRect3D(center.x - 250, center.y - 200, 300.5, 400.5, -0.11, '#11992290').gl(containerSize, 'triangles')
  const rect3 = new ColoredRect3D(center.x - 300, center.y - 50, 650, 200.5, -.10, '#1258c0a0').gl(containerSize, 'triangles')
  const rect4 = new ColoredRect3D(center.x - 350, center.y - 220, 450.5, 200.5, -.51, '#ce5f04b0').gl(containerSize, 'triangles')
  const rect5 = new ColoredRect3D(center.x - 250, center.y - 100, 450.5, 200.5, -.12, '#b816c7b0').gl(containerSize, 'triangles')
  const data = [
    ...rect1, 
    ...rect2, 
    ...rect3,
    ...rect4,
    ...rect5
  ]
  const count = gl
    .vbo('dynamic', 'float', { vPos: vec3, vColors: vec4 })
    .push(data)
  
  gl.blendFunc('SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA')
  gl.enableBlend()
  gl.enableDepth()
  const render = () => { 
    gl.ctx.clearDepth(1.0)
    gl.clear(0x0)
    gl.drawArrays('triangles', count)
  }
  render()
  
  const { screen } = Game.create(containerSize.width, containerSize.height, container)
  
  const gameloopId = gameloop(() => {
    screen.blit(glSurface, glSurface.rect)
    displayFps(fps, Time.fps)
  })

  ui.switch('Enabled Depth', val => { 
    if (!val) {
      gl.disableDepth()
    } else {
      gl.enableDepth()
    }
    render()
  }, true)
  ui.switch('Enabled Blend', val => { 
    if (!val) {
      gl.disableBlend()
    } else {
      gl.enableBlend()
    }
    render()
  }, true)

  ui.info(/*html*/`
    If the 'Enabled Depth' switch is on, rectangles are sorted along the Z-axis; otherwise, they are sorted in the order of definition.
    <empty-line></empty-line>
    <f-panel>
      <f-panel vert no-gap>
        <f-text>Definition</f-text>
        <f-list>
          <li><colored-box color="#ac2b3a" /></li>
          <li><colored-box color="#119922" /></li>
          <li><colored-box color="#1258c0" /></li>
          <li><colored-box color="#ce5f04" /></li>
          <li><colored-box color="#b816c7" /></li>
        </f-list>
      </f-panel>
      <f-panel vert no-gap>
        <f-text>Sorted</f-text>
        <f-list>
          <li><colored-box color="#1258c0" /></li>
          <li><colored-box color="#119922" /></li>
          <li><colored-box color="#b816c7" /></li>
          <li><colored-box color="#ac2b3a" /></li>
          <li><colored-box color="#ce5f04" /></li>
        </f-list>
      </f-panel>
    </f-panel>
  `)
 
  return { 
    dispose () { 
      killgameloop(gameloopId)
      program.remove() 
    }
  }
}




