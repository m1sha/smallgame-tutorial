import { Random, Rect, Sketch, Surface, TSize } from "smallgame";
import { Asteroid } from "./asteroid";
import { SeparateGrid } from "./speratate-grid";

export class Asteroids {
  private separateGrid: SeparateGrid<Asteroid>
  items: Asteroid[] = []
  private fieldSurface: Surface

  constructor (private fieldSize: TSize) {
    const rows = 4
    const cols = 8
    this.separateGrid = new SeparateGrid(fieldSize, rows, cols)
    this.fieldSurface = new Sketch().rects({ stroke: '#2A2A2A' }, Rect.size(fieldSize.width / cols, fieldSize.height / rows), cols, rows).toSurface()
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

        if (!neighbor.rect.overlaps(asteroid.rect)) {
          asteroid.collidedWith.delete(neighbor)
          neighbor.collidedWith.delete(asteroid)
          continue
        }

        if ( neighbor.collidedWith.has(asteroid)) continue

        neighbor.vel.x *= -1
        neighbor.vel.y *= -1
        

        asteroid.collidedWith.add(neighbor)
        neighbor.collidedWith.add(asteroid)
        d = true
      }
      if (d) asteroid.vel.negSelf()
    }
  }
}