import { float, Game, gameloop, GL, loadImage, MouseButton, Point, Rect, Time, TPoint, TSize, vec2 } from 'smallgame'
import vertex from './shaders/vert'
import fragment from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'
import { UIBuilder } from '../../../../../components/example/code/ui'
import { removeItem } from 'smallgame/src/utils'

type TDot = {
  point: Point
  color: Point
}

class GeometryBuilder {
  points: TDot[] = []

  add (point: Point, color: Point) {
    this.points.push({ point, color })
  }

  get (point: TPoint) {
    return this.points.filter(p => Rect.fromCenter(point, 32, 32).containsPoint(p.point))
  }

  delete (points: TDot[]) {
    points.forEach(dot => removeItem(this.points, p => p === dot))
  }

  build (size: TSize, imgsize: TSize) {
    return {
      geometry: this.points.flatMap(p => p.point.math(size).arr()), 
      colors: this.points.flatMap(p => p.color.uv(imgsize).arr())
    }
  }
}

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const ctx = new GL({ width, height })
  const prog = ctx.createProgram(vertex, fragment, 'assemble-and-use')
  const texImage = await loadImage('platformer/Terrain_(16x16).png')
  const texture = ctx.createTexture('uSampler', texImage, { minMag: 'nearest' })
  const size = 128
  ctx.uniform('uPointSize', 'float').value = size
  const builder = new GeometryBuilder() 

  
  
  builder.add(new Point(300, 500 - size- size), new Point(0, 32))
  builder.add(new Point(300, 500 - size), new Point(0, 16))
  builder.add(new Point(300, 500), new Point(0, 0))
  builder.add(new Point(300 + size, 500), new Point(16, 0))
  //builder.add(new Point(300 + size + size, 500), new Point(32, 0))
  //builder.add(new Point(300 + size + size + size, 500), new Point(48, 0))
  //builder.add(new Point(300 + size + size + size + size, 500), new Point(64, 0))
  //builder.add(new Point(300 + size + size + size + size + size, 500), new Point(80, 0))
  //builder.add(new Point(300 + size + size + size + size + size + size, 500), new Point(96, 0))
  //builder.add(new Point(300 + size + size + size + size + size + size + size, 500), new Point(112, 0))

  const indexies: number[] = [1, 1, 1,1]
  
  
  const { geometry, colors } = builder.build({ width, height }, texImage)
  const vao = ctx.vao('dynamic', 'float', { aPosition: vec2, aTexCoord: vec2, aColor: float }, geometry, colors, indexies)
  debugger
  const draw = () =>
    vao.use(() => {
      ctx.clear(0x0)
      ctx.drawArrays('points', vao.vertexCount - 0)
    })

  draw()
  
  const glSurface = ctx.toSurface()
  const { game, screen } = Game.create(width, height, container)
  gameloop(() => {
    for (const ev of game.event.get()) {
      if (ev.type === 'MOUSEDOWN') {
        
        if (ev.button === MouseButton.LEFT) {
          builder.add(Point.from(ev.pos), new Point(0, 0))
          indexies.push(1)
        }

        if (ev.button === MouseButton.RIGHT) {
          builder.delete(builder.get(ev.pos))
          indexies.pop()
        }
        
        const { geometry, colors } = builder.build({ width, height }, texImage)
        vao.update(geometry, colors, indexies)
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
      texture.remove()
    }
  }
}