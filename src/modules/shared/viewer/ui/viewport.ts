import { setPoint, TPoint } from "smallgame"

export interface IViewport {
  cursor: TPoint
  offset: TPoint
  zoom: number
}

export function initViewport (): IViewport {
  return {
    cursor: setPoint(0, 0),
    offset: setPoint(0, 0),
    zoom: 1
  }
}