import { ControlType } from "./control-type"
import { UIControl } from "./ui-control"

export class Color extends UIControl {
  readonly type: ControlType = 'color'

  constructor (public caption: string, public callback: (color: string) => void, public defaultColor?: string) {
    super()
  }
}