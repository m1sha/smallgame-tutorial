import { MemSurface, Rect, setSize, Surface, TSize } from "smallgame"
import { DrawableObject } from "../core/drawable-object"
import { DisplayImagesCombinerObject } from "./images-combiner-display-object"
import { Viewport } from "../viewport"

export class ImageCombineObject extends DrawableObject {
  grid: { cols: number, rows: number } = { cols: 0, rows: 0 }
  
  constructor (private imgs: { name: string, surface: Surface }[], viewportSize: TSize, viewport: Viewport) {
    super(viewport)
    let w = 0
    let h = 0
    let maxH = 0
    for (const img of imgs) {
      img.surface.rect.x = w
      img.surface.rect.y = h
      maxH = Math.max(maxH, img.surface.rect.height)
      if (w + img.surface.rect.width >= 1024) {
        w = 0
        h += maxH
        maxH = 0
      } else {
        w += img.surface.rect.width
      }
    }

    this.surface = new MemSurface(setSize(1024, h))
    imgs.forEach(i => this.surface.blit(i.surface, i.surface.rect))
    this.rect = this.surface.rect
    this.rect.absCenter = Rect.size(viewportSize).center
  }

  draw (screen: Surface) {
    screen.blit(this.surface, this.surface.rect)
  }

  update (): void {
    
  }

  toDisplay(): DisplayImagesCombinerObject {
    return {
      hidden: false,
      type: 'image-combiner-object',
      id: this.id,
      name: 'Images Combiner',
      images: this.imgs.map(p => ({ id: p.name, name: p.name, size: p.surface.rect.size }))
    }
  }

  async download () {
    const s = new Surface(this.surface.width, this.surface.height)
    s.blit(this.surface, s.rect)
    const blob = await s.save()
    const a = document.createElement('a')
    const url = URL.createObjectURL(blob)
    a.href = url
    a.target = '_blank'
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
}