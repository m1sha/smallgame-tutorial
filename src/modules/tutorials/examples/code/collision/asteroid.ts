import { GMath, Point, Rect, Surface, Time, TSize } from "smallgame"
import { AssetStore } from "./asset-store"

export class Asteroid {
  sprite = AssetStore.asteroid
  rect: Rect
  vel: Point 
  constructor (private fieldSize: TSize) {
    this.rect = this.sprite.rect.clone()
    //this.rect.x = 0 | Math.random() * (fieldSize.width - this.rect.width)
    //this.rect.y = 0 | Math.random() * (fieldSize.height - this.rect.height)
    this.vel = new Point(Math.random() * 55 + 1, Math.random() * 97 + 1)
  }

  a = 0 //Math.random() * 360
  

  draw (surface: Surface) {
    this.rect.x += this.vel.x * Time.deltaTime
    this.rect.y += this.vel.y * Time.deltaTime

    //this.a += (10 * Time.deltaTime) % 360

    if (this.rect.x <= 0 || this.rect.absWidth >= this.fieldSize.width) this.vel.x *= -1
    if (this.rect.y <= 0 || this.rect.absHeight >= this.fieldSize.height) this.vel.y *= -1

    if (this.rect.x < 0) this.rect.x = 0
    if (this.rect.y < 0) this.rect.y = 0
    if (this.rect.absWidth >= this.fieldSize.width) this.rect.x = this.fieldSize.width - this.rect.width - 1
    if (this.rect.absHeight >= this.fieldSize.height) this.rect.y = this.fieldSize.height - this.rect.height - 1

    surface.blit(this.sprite.image, this.rect, { angle: this.a, pivote: 'center-center', pivoteOwner: 'self' })
  }
}
