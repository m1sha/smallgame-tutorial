import { Group, TPoint } from "smallgame"
import { BoxExplosion } from "./box-explosion";

export class BoxExplosions extends Group<BoxExplosion> {
  async createExplosion (pos: TPoint) {
    const exp = new BoxExplosion(pos)
    await exp.create()
    this.add(exp)
  }

  protected update(): void {
    const sprs = this.sprites.filter(p => p.canDelete)
    for (const s of sprs)
      this.remove(s)
  }
}