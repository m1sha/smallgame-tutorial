import { Rect } from "smallgame";

export class Platform {
  insect: 'none' | 'bottom' | 'left' | 'right' = 'none'
  constructor (readonly rect: Rect) {

  }
}