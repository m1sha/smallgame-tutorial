import { AnimatedSprite, loadImage, Point, Rect, Size, SpriteSheet, Surface } from "smallgame"

export class Flag {
  private sprite: AnimatedSprite | null = null
  private rect: Rect = Rect.zero

  async load () {
    const img = await loadImage('flags/flag-green.png')
    const size = new Size(img.rect.width / 5, img.rect.height)
    const ss = new SpriteSheet(img, size, 4)
    this.sprite = new AnimatedSprite(ss)
    this.rect = Rect.size(size)
  }

  setPos (point: Point) {
    this.rect.moveSelf(point, 'top-center').shiftSelf(0, 6)
  }

  draw (surface: Surface) {
    this.sprite.update()
    surface.blit(this.sprite.image, this.rect)
  }
}