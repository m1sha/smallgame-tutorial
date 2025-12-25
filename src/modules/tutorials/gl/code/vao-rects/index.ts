import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import vertex from './shaders/vert'
import fragment from './shaders/frag'
import { float, Game, gameloop, GL, MouseButton, Rect, Time, TPoint, TSize, vec2 } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { removeItem } from "smallgame/src/utils"
import { UIBuilder } from "../../../../../components/example/code/ui"

type Shape = {
  rect: Rect
  color: number
}

class GeometryBuilder {
  shapes: Shape[] = []

  add (rect: Rect, color: number) {
    this.shapes.push({ rect, color })
  }

  get (point: TPoint) {
    return this.shapes.filter(p => p.rect.containsPoint(point))
  }
  
  delete (shapes: Shape[]) {
    shapes.forEach(dot => removeItem(this.shapes, p => p === dot))
  }

  build (size: TSize) {
    return {
      geometry: this.shapes.flatMap(p => p.rect.gl(size, 'triangles')), 
      colors: this.shapes.flatMap(p => [p.color, p.color + 0.1, p.color + 0.1, p.color, p.color + 0.1, p.color + 0.1])
    }
  }
}

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const ctx = new GL({ width, height })
  const prog = ctx.createProgram(vertex, fragment, 'assemble-and-use')
  const builder = new GeometryBuilder() 
  builder.add(new Rect(100, 100, 50, 50), Math.random())
  builder.add(new Rect(300, 400, 50, 50), Math.random())
  builder.add(new Rect(400, 200, 50, 50), Math.random())
  builder.add(new Rect(700, 300, 50, 50), Math.random())
  const { geometry, colors } = builder.build({ width, height })
  const vao = ctx.vao('dynamic', 'float', { aPosition: vec2, aColor: float }, geometry, colors)
    const draw = () =>
      vao.use(() => {
        ctx.clear(0x0)
        ctx.drawArrays('triangles', vao.vertexCount)
      })
  
  draw()

  const glSurface = ctx.toSurface()
  const { game, screen } = Game.create(width, height, container)
  gameloop(() => {
    for (const ev of game.event.get()) {
      if (ev.type === 'MOUSEDOWN') {
        if (ev.button === MouseButton.LEFT) {
          builder.add(Rect.fromCenter(ev.pos, 50, 50), Math.random() + 0.1)
        }
        
        if (ev.button === MouseButton.RIGHT) {
          builder.delete(builder.get(ev.pos))
        }
                
        const { geometry, colors } = builder.build({ width, height })
        vao.update(geometry, colors)
        draw()
      }
    }

    screen.fill('#2a1157ff')
    screen.blit(glSurface, glSurface.rect)
    displayFps(fps, Time.fps)
  })
  const ui = new UIBuilder()
  ui.info('1. LBC on the screen to create a point.<br><br>2. RBC on the point to delete it')
  screen.disableContextMenu()
  return {
    ui: ui.build(),
    dispose () {
      prog.remove()
      vao.remove()
    }
  }
}