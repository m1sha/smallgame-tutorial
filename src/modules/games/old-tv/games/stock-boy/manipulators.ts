import { Group } from "smallgame"
import { Manipulator } from "./manipulator"
import { Box } from "./box"
import { Delay } from "smallgame/src/utils"

export class Manipulators extends Group<Manipulator> {
  private lastColumnIndex = -1
  private createDelay: Delay = new Delay(300)
  private dischargeDelay: Delay = new Delay(500)
  onDischarge: ((box: Box, index: number) => void) | null = null
  maxManipulators = 1
  
  constructor (private width: number, private height: number) {
    super()
  }

  async create () { }

  async update () {
    this.deleteDischarged()

    if (this.createDelay.ready) {
      this.createManipulators()
    }
  }

  private deleteDischarged () {
    while(true) {
      const sprite = this.sprites.find(p => p.discharge && p.canDelete)
      if (!sprite) break
      this.remove(sprite)
     }
  }

  private async createManipulators () {
    if (this.sprites.length >= this.maxManipulators) return
    const manipulator = await Manipulator.create(this.width, this.height)
    this.add(manipulator)
    manipulator.onDischarge = (box, index, done) => {
      if (!this.dischargeDelay.ready && this.lastColumnIndex === index) {
        return
      }

      this.lastColumnIndex = index
      done()
      this.onDischarge?.(box, index)
    } 
  }
}