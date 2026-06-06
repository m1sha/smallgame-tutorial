import { TOption } from "../option"
import { UIControl } from "./ui-control"
import { ControlType } from "./control-type"

export class Select extends UIControl {
  readonly type: ControlType = 'select'
  
  constructor (public caption: string, public items: string[] | TOption[], public callback: (value: string) => void, public defaultValue?: string, public options?: any) {
    super()
  }
}