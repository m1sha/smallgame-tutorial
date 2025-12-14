import { Random, Rect, Sketch, Surface, TSize } from "smallgame";
import { Asteroid } from "./asteroid";
import { SeparateGrid } from "./speratate-grid";

export class Asteroids {
  private separateGrid: SeparateGrid<Asteroid>
  items: Asteroid[] = []
  private fieldSurface: Surface

  constructor (private fieldSize: TSize) {
    this.separateGrid = new SeparateGrid(fieldSize, 8, 16)
    this.fieldSurface = new Sketch().rects({ stroke: '#2A2A2A' }, Rect.size(fieldSize.width / 16, fieldSize.height / 8), 16, 8).toSurface()
  }

  add (count: number) {

    for (let i =0; i< count; i++)
      this.items.push(new Asteroid(this.fieldSize))

    Random.uniformRandomScatter(this.fieldSize, this.items)
  }

  draw (surface: Surface) {
    surface.blit(this.fieldSurface, this.fieldSurface.rect)
    this.items.forEach(asteroid => asteroid.draw(surface))
  }

  calcCollision() {
    this.separateGrid.update(this.items)
    for (const asteroid of this.items) {
      const neighbors = this.separateGrid.getNeighbors(asteroid)
      let d = false
      for (const neighbor of neighbors) {
        if (neighbor === asteroid) continue

        if (!neighbor.rect.overlaps(asteroid.rect)) continue
        neighbor.vel.x *= -1
        neighbor.vel.y *= -1
        neighbor.vel.y -= 1
        d = true
      }
      if (d) asteroid.vel.negSelf()
    }
  }
}