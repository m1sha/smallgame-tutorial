import { Point, Rect } from "smallgame"

export class Platform {
  constructor (readonly rect: Rect) {

  }
}

export class Platforms {
  items: Platform[] = []
  
  clear () {
    this.items = []
  }
  
  addPlatform (rect: Rect) {
    this.items.push(new Platform(rect))
  }

  sort () {
    this.items.sort((a, b) => a.rect.x - b.rect.x)
  }

  collidePlaforms (step: Point) {
    const platforms = this.getPlaforms(step)
    platforms.sort((a, b) => a.rect.y - b.rect.y)

    for (const platform of platforms) {
      if (step.y >= platform.rect.y  ) {
        return platform
      }
    }
    return null
  }

  private getPlaforms (point: Point) { 
    const platforms: Platform[] = []
    for (const orgin of this.items) {
      if (point.x >= orgin.rect.x && point.x <= orgin.rect.absWidth) {
        platforms.push(orgin)
      }
    }
    return platforms
  }
}