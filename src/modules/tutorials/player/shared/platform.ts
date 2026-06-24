import { Rect } from "smallgame";

export class Platform {
  insect: 'none' | 'bottom' | 'top' | 'left' | 'right' = 'none'
  constructor (readonly rect: Rect) {

  }
}