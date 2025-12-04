import { SurfaceBase } from "smallgame"
import { Effect } from "./effect"

export class EffectPipeline {
  constructor (private effects: Effect[]) {
    
  }

  build (s: SurfaceBase): SurfaceBase {
    if (!this.effects.length) throw new Error('')

    if (this.effects.length === 1) {
      this.effects[0].applyEffect(s)
      return this.effects[0].surface
    }

    this.effects[0].applyEffect(s)
    let surface = this.effects[0].surface

    for (let i = 1; i < this.effects.length; i++) {
      this.effects[i].applyEffect(surface)
      surface = this.effects[i].surface
    }

    return surface
  }
}