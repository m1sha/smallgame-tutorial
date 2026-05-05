import { GMath } from "smallgame"

export class Magnifier {
  private step = 0
  private _value: number = 1

  constructor (private min: number = 0.1, private max: number = 8) {

  }

  byDelta (delta: number) {
    this.step -= Math.sign(delta)
    console.log('step', this.step)
    GMath.clamp(this.step, 0, 9)
    let zoom = GMath.logZoom(this.step, 4, 1, 2)
    zoom = GMath.clamp(zoom, this.min, this.max)
    this._value = zoom
  }

  get zoom () { return this._value }

  reset () {
    this.step = 0
    this._value = 1    
  }
}