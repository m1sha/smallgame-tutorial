import { setPoint, TPoint } from "smallgame"

export interface IViewport {
  cursor: TPoint
  offset: TPoint
  zoom: number
  setCursor (cursor: TPoint) 
}

export class Viewport implements IViewport {
  cursor: TPoint
  offset: TPoint
  zoom: number

  constructor () {
    this.cursor = setPoint(0, 0),
    this.offset = setPoint(0, 0),
    this.zoom = 1
  }

  setCursor (cursor: TPoint) {
    this.cursor.x = cursor.x
    this.cursor.y = cursor.y
  }

  home () {
    this.zoom = 1
    this.offset.x = 0 
    this.offset.y = 0 
  }

  fit () {

  }

  zoomIn () {
    this.zoom -= 0.25
  }

  zoomOut () {
    this.zoom += 0.25
  }
}

