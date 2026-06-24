import { Point, Rect } from "smallgame";
import { Platform } from "./platform";

export class PlatformsCollision {
  constructor (readonly bottom?: Platform, readonly right?: Platform,readonly left?: Platform, readonly top?: Platform) {

  }

  isBottomCollided (y:number) {
    return this.bottom ? y > this.bottom.rect.y : false
  }

  isRightCollided (x: number) {
    return this.right ? x > this.right.rect.x : false
  }

  isLeftCollided (x: number) {
    return this.left ? x < this.left.rect.absWidth : false
  }

  isTopCollided (point: Point) {
    return this.top ? point.y < this.top.rect.absHeight : false
  }
}

export class Platforms {
  items: Platform[] = []

  getPlatforms (rect: Rect) {
    this.items.forEach(p => p.insect = 'none')
    const items = this.__get(rect)
    return items
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
      const ry0 = r.y
      const ry1 = r.absHeight
      const isBellow = (r.x < x0 && x0 < r.absWidth) || (r.x < x1 && x1 < r.absWidth)
      if (isBellow) {
        bottoms.push(this.items[i])
        continue
      }
      const isLeft =  r.absWidth < x0
      const isRight = x1 < r.x

      if (isRight || isLeft) {
        const _in =  (y0 >= ry0 && y0 <= ry1) || (y1 >= ry0 && y1 <= ry1)
        const _out = (ry0 > y0 && ry0 < y1) || (ry1 > y0 && ry1 < y1)
        if (_in || _out) {
          if (isRight && !right) {
            right = this.items[i]
            right.insect = 'right'
          }
          if (isLeft) {
            if (left && left.rect.absWidth > this.items[i].rect.absWidth) continue
            if (left) left.insect = 'none'
            left = this.items[i]
            left.insect = 'left'
          }
        }
      }
    }

    bottoms.sort((a, b) => a.rect.y - b.rect.y)
    let bottom: Platform | null = null
    let top: Platform | null = null
    for (let i = 0; i < bottoms.length; i++) {
      const item = bottoms[i]
      if (item.rect.y > rect.absHeight) {
        item.insect = 'bottom'
        bottom = item
        top = bottoms[i - 1] ?? null
        if (top) top.insect = 'top'
        break
      }
    }
    return new PlatformsCollision(
      bottom,
      right,
      left,
      top
    )
  }
}