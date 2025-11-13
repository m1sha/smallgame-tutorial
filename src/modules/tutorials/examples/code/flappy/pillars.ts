import { Group, TSize } from "smallgame";
import { Pillar } from "./pillar";
import { setDebounce } from "smallgame/src/time";

export class Pillars extends Group<Pillar> {
  private gen: () => void
  constructor (private fieldSize: TSize) {
    super()

    this.gen = setDebounce(() => this.generator(), 2500)
    this.generator ()
  }

  private generator () {
    const p = new Pillar(this.fieldSize)
    this.add(p)
  }

  protected update(): void {
    this.gen()
  }
}