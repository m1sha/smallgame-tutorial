import { Sprite, Surface, loadImage, Point, Time } from 'smallgame'

const background = [
  '/parallax/v2/11_background.png',
  '/parallax/v2/10_distant_clouds.png',
  '/parallax/v2/09_distant_clouds1.png',
  '/parallax/v2/08_clouds.png',
  '/parallax/v2/07_huge_clouds.png',
  '/parallax/v2/06_hill2.png',
  '/parallax/v2/05_hill1.png',
  '/parallax/v2/04_bushes.png',
  '/parallax/v2/03_distant_trees.png',
  '/parallax/v2/02_trees and bushes.png',
  '/parallax/v2/01_ground.png'
]

export class ParallaxBackground extends Sprite {
  #surfaces: Surface[] = []
  #dList: number[] = [0.2,0.1,0.2,0.5,0.4,0.4,0.5,0.6,0.7,0.9,1]
  #startPoint = Point.zero
  #direct = 1
  #width: number

  constructor (SCREEN_WIDTH: number) {
    super()
    this.#width = SCREEN_WIDTH
  }

  async create () {
    this.image = new Surface(1200, 800)
    this.rect = this.image.rect
    
    for (const img of background) {
     const surface = await loadImage(img)
     surface.resize(1200, 800)
     this.#surfaces.push(surface)
    }
  }

  protected update(): void {
    this.#startPoint.x += 500 * this.getDirect() * Time.deltaTime
    this.#surfaces.forEach((surface, index) => {
      const nextPoint = this.#startPoint.scaleX(this.#dList[index])
      this.image!.blit(surface, nextPoint)
    })
  }
  
  private getDirect () {
    return this.#direct = this.#startPoint.x < -(this.#width / 2) ? 1 : this.#startPoint.x >= 0 ? -1: this.#direct
  } 

}