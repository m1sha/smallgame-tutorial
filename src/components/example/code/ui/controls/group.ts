
import { ControlType } from "./control-type"
import { UIControl } from "./ui-control"
import { UIContariner } from "./container"
import { ref } from "vue"

export class Group extends UIContariner  {
  readonly type: ControlType = 'group'
  openned = ref(false)

  constructor (public name: string, ...controls: UIControl[]) {
    super()
    this.controls.push(...controls)
  }

  /** @deprecated use expand method */
  open () {
    this.openned.value = true
    return this
  }

  expand () {
    this.openned.value = true
    return this
  }

  collapse () {
    this.openned.value = true
    return this
  }
}