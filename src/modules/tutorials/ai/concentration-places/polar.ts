import { TPoint } from "smallgame"

export type TPolarPoint = {
  r: number
  theta: number
}

export class PolarPoint {
  constructor (public r: number = 0, public theta: number = 0, public c: TPoint) {

  }

  get point () {
    return polarToScreen(this, this.c)
  }

  static from (p: TPoint, c: TPoint) {
    const { r, theta } =  screenToPolar(p, c)
    return new PolarPoint(r, theta, c)
  }
}

function polarToScreen (p: TPolarPoint, c: TPoint): TPoint {
  return {
    x: c.x + p.r * Math.cos(p.theta),
    y: c.y + p.r * Math.sin(p.theta)
  }
}

function screenToPolar (p: TPoint, c: TPoint): TPolarPoint {
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return {
    r: Math.sqrt(dx * dx + dy * dy),
    theta: Math.atan2(dy, dx)
  }
}