import { loadImage, Rect, Sketch, Sprite, Surface, Time, TSize } from "smallgame";

export class World extends Sprite {
  private img: Surface | null = null
  private img2: Surface | null = null
  private moveRect: Rect
  private moveRect2: Rect

  constructor (private size: TSize) {
    super()

    this.image = new Sketch().rect({ fill: '#000' }, Rect.size(size)).toSurface()
    this.moveRect = this.rect = this.image.rect
    this.moveRect2 = this.rect = this.image.rect
  }

  async create (): Promise<void> {
    this.img = new Surface(500, 500) //await loadImage('star-field.png')
    this.moveRect = this.img.rect.clone()
    
    this.img2 = new Surface(500, 500)// await loadImage('stars.png')
    this.moveRect2 = this.img2.rect.clone()

    this.moveRect.shiftSelf(0, -(this.moveRect.height - this.size.height))
    this.moveRect2.shiftSelf(0, -(this.moveRect2.height - this.size.height))

    this.image.blit(this.img, this.moveRect)
    this.image.blit(this.img2, this.moveRect2)
  }

  protected update(): void {
    if (!this.img || !this.img2) return

    this.moveRect.shiftSelf(0, 30 * Time.deltaTime * 0.7)

    if (this.moveRect.y > 0) {
      this.moveRect.shiftSelf(0, -(this.moveRect.height - this.size.height))
    }

    this.moveRect2.shiftSelf(0, 30 * Time.deltaTime)

    if (this.moveRect2.y > 0) {
      this.moveRect2.shiftSelf(0, -(this.moveRect2.height - this.size.height))
    }

    this.image.clear()
    this.image.blit(this.img, this.moveRect)
    this.image.blit(this.img2, this.moveRect2)
  }
}