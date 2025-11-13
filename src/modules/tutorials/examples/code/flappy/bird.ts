import { setPoint, Sketch, Sprite, Surface, TSize } from "smallgame"

export class Bird extends Sprite {
  constructor (private fieldSize: TSize) {
    super()

    this.image = new Surface(40, 40)

    this.rect = this.image.rect

    const s = new Sketch().circle({ fill: '#678899' }, setPoint(20, 20), 18).toSurface()
    this.image.blit(s, s.rect)
  }

  private a = 1

  update () {
    this.a = 1
    if (this.rect.y + 40 > this.fieldSize.height) {
      this.rect.y = this.fieldSize.height - 39
      return
    }

    this.rect.y += 5  
  }

  raise () {
    if (this.rect.y < 40) return

    this.a+= 0.1
    this.rect.y -= this.a
  }

}