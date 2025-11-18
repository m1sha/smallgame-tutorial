import { loadImage, Sprite, Surface } from "smallgame"

export class Car extends Sprite {
  private img: Surface | null = null
  async create(): Promise<void> {
    this.image = await loadImage('car-side-view/car-body.png')
    this.rect = this.image.rect
    this.img = await loadImage('car-side-view/wheele.png')

    this.image.blit(this.img, this.img.rect.move(40, 58))
  }

  i = 0
  protected update(): void {
    if (!this.img) return

    this.image.blit(this.img, this.img.rect.move(40, 58), { angle: this.i, pivote: 'center-center', pivoteOwner: 'self' })
    this.image.blit(this.img, this.img.rect.move(290, 58), { angle: this.i, pivote: 'center-center', pivoteOwner: 'self' })

    //this.i += 1
  }
}