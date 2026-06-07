
import { ControlType } from "./control-type"
import { UIControl } from "./ui-control"
import { UIContariner } from "./container"

export class Group extends UIContariner  {
  readonly type: ControlType = 'group'
  openned: boolean = false

  constructor (public name: string, ...controls: UIControl[]) {
    super()
    this.controls.push(...controls)
  }

  open () {
    this.openned = true
    return this
  }
}