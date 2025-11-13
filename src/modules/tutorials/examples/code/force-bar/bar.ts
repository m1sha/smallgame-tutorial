import { TSize, Sprite, Surface, Sketch, Rect } from "smallgame"

export class Bar extends Sprite {
  private barBg: Surface
  force = 0
  constructor (size: TSize) {
    super()

    this.image = new Surface(200, 800)
    this.rect = this.image.rect

    this.barBg = new Sketch()
        .rect({ fill: '#1f2722ff' }, new Rect(0, 0, 200, 800))
        .toSurface()
      
      
  }

  update(): void {
    this.image.blit(this.barBg, this.barBg.rect)
    
    const barFg = this.getBarForce(this.force);
    this.image.blit(barFg, barFg.rect)
  }

  private getBarForce = (value: number) => new Sketch()
        .rect({ fill: '#0e803aff' }, new Rect(0, 800 - value, 200, value))
        .toSurface()
}