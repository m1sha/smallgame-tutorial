import { Sprite, Sketch, Rect, Point, setSize, GMath } from "smallgame"

export class Ball extends Sprite {
  size = setSize(100, 100)
  constructor () {
    super()

    const circleSketch = new Sketch()
    const rect = Rect.size(this.size)
    circleSketch.circle({ fill: '#2f553cff' }, rect.center, rect.width * 0.5)
    const surface = circleSketch.toSurface()
    this.image = surface
    this.rect = surface.rect
  }

  setPath (startPoint: Point, endPoint: Point, value: number) {
    this.rect.moveSelf(GMath.lerp(startPoint, endPoint, value), 'center-center')  
  }
}
