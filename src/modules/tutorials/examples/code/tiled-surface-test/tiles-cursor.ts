import { Surface } from "smallgame";

export class TilesCursor {
  constructor (readonly start: number, readonly end: number, readonly surface: Surface) {}

  dup () {
    return new TilesCursor(this.start, this.end, this.surface.dup())
  }
}