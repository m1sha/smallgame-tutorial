import { UIControl } from "./ui-control"
import { ControlType } from "./control-type"
import { RefObj } from "../ref-obj"

export class Switch extends UIControl {
  constructor (public caption: string, public callback: (value: boolean) => void, public defaultValue: boolean | RefObj<boolean>) {
    super()
  }
  type: ControlType = 'switch'
}