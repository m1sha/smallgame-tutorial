import { UIControl } from "./ui-control"
import { ControlType } from "./control-type"

export class InfoPanel extends UIControl {
  type: ControlType = 'info-panel'
  
  constructor (public text: string, public title: string) {
    super()
  }
}