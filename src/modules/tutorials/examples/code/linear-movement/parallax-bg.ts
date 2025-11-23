import { TSize, Parallax, Rect, Screen, loadImage } from "smallgame"
import { backgroundImageListV4 } from "../parallax/img-list"

export class ParallaxBG {
  parallax: Parallax
  constructor (size: TSize) {
    this.parallax = new Parallax(Rect.size(size))
  }

  async create () {
const loadImages = async (list: string[]) => {
    const rates = [0.02, 0.1, 0.2, 0.5, 0.9,    0.1, 0.2,0.3,0.9]
    const names = list
      .map(url => url.split('/').at(-1)?.replace('.png', '') ?? 'some-name')
    const images = await Promise.all(list.map(url => loadImage(url)))
  
    for (let i = 0; i < list.length - 1; i++) {
      const name = names[i]
      const image = images[i]
      image.zoomSelf(3)
      this.parallax.addLayer(name, image, rates[i])
    }
  }

  await loadImages(backgroundImageListV4)
  }

  setPos (x: number) {
    this.parallax.pos.x = -x
  }

  draw (screen: Screen) {
this.parallax.draw(screen as any)
  }
}