import { GMath, loadImage, Rect, Sprite, Surface, Time } from "smallgame";

export class Asteroid extends Sprite {
  private surface: Surface | null = null

  speed: number = 0
  angularSpeed: number = 0

  constructor (public num: number) {
    super()
  }

  private sign = 1

  async create (): Promise<void> {
    
    this.surface = await loadImage('space-fighter/Asteroids/Asteroid_'+ this.num +'.png')
    const size = this.surface.rect.diagonal
    this.image = new Surface(size, size)
    this.rect = this.image.rect

    this.surface.rect.center = this.rect.center

    if (Math.random() > 0.75) this.sign *= -1
  }

  current = 0

  protected update (): void {
    if (!this.surface) return

    this.current += this.angularSpeed * Time.deltaTime * this.sign
    this.image.clear()
    this.image.blit(this.surface, this.surface.rect, { angle: this.current  , pivote: 'center-center' })

    this.rect.y += this.speed
  }
}