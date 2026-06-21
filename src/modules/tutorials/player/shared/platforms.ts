import { Rect } from "smallgame";
import { Platform } from "./platform";

export class Platforms {
  items: Platform[] = []

  getPlatforms (rect: Rect) {
    this.items.forEach(p => p.insect = 'none')
    const items = this.__get(rect)
    const result: Platform[] = []
    for (const item of items.bottoms) {
      if (item.rect.y > rect.absHeight) {
        item.insect = 'bottom'
        result.push(item)
        break
      }
    }
    if (items.right)  {
      items.right.insect = 'right'
      result.push(items.right)
    }
    if (items.left)  {
      items.left.insect = 'left'
      result.push(items.left)
    }
    return result
  }

  add (rects: Rect[]) {
    for (const rect of rects) {
      this.items.push(new Platform(rect))
    }
  }

  private __get (rect: Rect) {
    const x0 = rect.x
    const x1 = rect.absWidth
    const y0 = rect.y
    const y1 = rect.absHeight
    this.items.sort((a, b) => a.rect.x - b.rect.x)

    const bottoms: Platform[] = []
    let right: Platform | null= null
    let left: Platform | null= null
    
    for (let i = 0; i < this.items.length; i++) {
      const r = this.items[i].rect
      const isBellow = (r.x < x0 && x0 < r.absWidth) || (r.x < x1 && x1 < r.absWidth)
      if (isBellow) {
        bottoms.push(this.items[i])
        continue
      }
      const isLeft =  r.absWidth < x0
      const isRight = x1 < r.x

      if (isRight) {
        
        const down =  (y1 <= r.absHeight) || ( y0 >= r.y)
        if ( down) {
          if (!right) right = this.items[i]
        }
      }

      if (isLeft) {
        if (r.y < y1 && y1 <= r.absHeight) left = this.items[i]
      }
    }
    return {
      bottoms: bottoms.sort((a, b) => a.rect.y - b.rect.y),
      right,
      left
    }
  }
}