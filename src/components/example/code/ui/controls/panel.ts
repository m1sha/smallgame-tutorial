
import { UIControl } from "./ui-control"
import { ControlType } from "./control-type"
import { UIContariner } from "./container"

export class Panel extends UIContariner {
  readonly type: ControlType = 'panel'
  
  constructor (...controls: UIControl[]) {
    super()
    this.controls.push(...controls)
  }

}