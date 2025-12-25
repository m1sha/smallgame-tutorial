import { float, Game, gameloop, GL, MouseButton, Point, Rect, Time, TPoint, TSize, vec2 } from 'smallgame'
import vertex from './shaders/vert'
import fragment from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'
import { UIBuilder } from '../../../../../components/example/code/ui'
import { removeItem } from 'smallgame/src/utils'

type TDot = {
  point: Point
  color: number
}

class GeometryBuilder {
  points: TDot[] = []

  add (point: Point, color: number) {
    this.points.push({ point, color })
  }

  get (point: TPoint) {
    return this.points.filter(p => Rect.fromCenter(point, 32, 32).containsPoint(p.point))
  }

  delete (points: TDot[]) {
    points.forEach(dot => removeItem(this.points, p => p === dot))
  }

  build (size: TSize) {
    return {
      geometry: this.points.flatMap(p => p.point.math(size).arr()), 
      colors: this.points.map(p => p.color)
    }
  }
}

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const ctx = new GL({ width, height })
  const prog = ctx.createProgram(vertex, fragment, 'assemble-and-use')
  ctx.uniform('uPointSize', 'float').value = 32
  const builder = new GeometryBuilder() 
  builder.add(new Point(16, 80), .1)
  builder.add(new Point(300, 500), .21)
  builder.add(new Point(600, 400), .25)
  builder.add(new Point(800, 200), .30)
  builder.add(new Point(400, 400), .31)
  builder.add(new Point(800, 800), .41)
  const { geometry, colors } = builder.build({ width, height })
  const vao = ctx.vao('dynamic', 'float', { aPosition: vec2, aColor: float }, geometry, colors)
  const draw = () =>
    vao.use(() => {
      ctx.clear(0x0)
      ctx.drawArrays('points', vao.vertexCount)
    })

  draw()
  
  const glSurface = ctx.toSurface()
  const { game, screen } = Game.create(width, height, container)
  gameloop(() => {
    for (const ev of game.event.get()) {
      if (ev.type === 'MOUSEDOWN') {
        
        if (ev.button === MouseButton.LEFT) {
          builder.add(Point.from(ev.pos), Math.random() + 0.1)
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