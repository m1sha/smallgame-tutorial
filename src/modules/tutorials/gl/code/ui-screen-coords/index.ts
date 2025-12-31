import {  Game, gameloop, GL, loadImage, Point, Primitive2D, Rect, Size, SurfaceGL, Time, TSize, vec2 } from 'smallgame'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { displayFps } from '../../../../../utils/display-fps'

type Tile = {
  position: Point
  texCoords: Point
}

class GeometryBuilder {
  tiles: Tile[] = []

  addTile (position: Point, texCoords: Point) {
    this.tiles.push({ position, texCoords })
  }

  build (size: TSize, textSize: TSize) {
    return {
      geometry: this.tiles.flatMap(p => p.position.math(size).arr()), 
      texCoords: this.tiles.flatMap(p => p.texCoords.uv(textSize).arr())
    }
  }
}

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const size = new Size(width, height)
  const gl = new GL(size, true)
  const prog = gl.createProgram(vertex, fragmnet, 'assemble-and-use')
  const texImage = await loadImage('platformer/Terrain_(16x16).png')
  const texture = gl.createTexture('uSampler', texImage, { minMag: 'nearest' })
  
  const builder = new GeometryBuilder()
  builder.addTile(new Point(200, 200), new Point(0, 0))
  builder.addTile(new Point(200 + 64, 200), new Point(0, 0))
  builder.addTile(new Point(200 + 64 + 64, 200), new Point(0, 0))
  builder.addTile(new Point(200 + 64 + 64 + 64, 200), new Point(0, 0))
  builder.addTile(new Point(200, 200 - 64), new Point(0, 0))
  
  builder.addTile(new Point(200, 200 - 64 - 64), new Point(0, 0))
  // builder.addTile(new Point(200, 200 - 64 - 64 - 64), new Point(16, 16))
  // builder.addTile(new Point(200, 200 - 64), new Point(0, 16))
 
  
  const { geometry, texCoords } = builder.build(size, texImage)

  console.log(geometry)
  console.log(texCoords)
  
  const vao = gl.vao('static', 'float', { a_Position: vec2, a_TexCoord: vec2 }, geometry, texCoords)
  const draw = () =>
    vao.use(() => {
      gl.clear(0x0)
      gl.drawArrays('points', vao.vertexCount)
    })
  draw()
  const glSurface = gl.toSurface()
  const { game, screen } = Game.create(width, height, container)

  gameloop(() => {
    for (const ev of game.event.get()) {
      if (ev.type === 'MOUSEDOWN') {
        builder.addTile(Point.from(ev.pos), new Point(0, 16))
        const { geometry, texCoords } = builder.build(size, texImage)
        vao.update(geometry, texCoords)
        draw()
      }
    }
    screen.fill('#313131ff')
    screen.blit(glSurface, glSurface.rect)
    displayFps(fps, Time.fps)
  })
 
  return {
    dispose() {
      prog.remove()
      vao.remove()
      texture.remove()
    },
  }
}