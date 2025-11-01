import { Sprite, Point, TSize, Sketch } from "smallgame"

export class Path extends Sprite {
  private startPoint: Point
  private endPoint: Point
  constructor (startPoint: Point, endPoint: Point, private size: TSize) {
    super()

    this.startPoint = startPoint.clone() 
    this.endPoint = endPoint.clone() 

    this.image = this.createPathLine(startPoint, endPoint)
    this.rect = this.image.rect
  }

  setPath (startPoint: Point, endPoint: Point) {
    if (!this.startPoint.equals(startPoint) || !this.endPoint.equals(endPoint)) {
      this.image = this.createPathLine(startPoint, endPoint)
      this.rect = this.image.rect
    }

    this.startPoint = startPoint.clone() 
    this.endPoint = endPoint.clone() 
  }

  private createPathLine (startPoint: Point, endPoint: Point) {
    const lineSketch = new Sketch()
    lineSketch.arrow({ stroke: '#6e6e6eff', lineWidth: 4 }, startPoint, endPoint, { end: { arrowAngle: Math.PI / 6, arrowRadius: 30 }})
    const surface2 = lineSketch.toSurface(this.size.width, this.size.height)
    return surface2
  }
}