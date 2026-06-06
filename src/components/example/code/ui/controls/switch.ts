import { UIControl } from "./ui-control"
import { ControlType } from "./control-type"

export class Switch extends UIControl {
  constructor (public caption: string, public callback: (value: boolean) => void, public defaultValue: boolean) {
    super()
  }
  type: ControlType = 'switch'
}