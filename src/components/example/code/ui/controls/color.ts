import { IControl } from "./control"
import { ControlType } from "./control-type"

export class Color implements IControl {
  readonly type: ControlType = 'color'

  constructor (public caption: string, public callback: (color: string) => void, public defaultColor?: string) {

  }
}