import { IControl } from "./control"
import { ControlType } from "./control-type"

export class InfoPanel implements IControl {
  type: ControlType = 'info-panel'
  hidden: boolean = false
  constructor (public text: string, public title: string) {

  }
}