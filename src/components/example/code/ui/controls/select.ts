import { TOption } from "../../parameters"
import { IControl } from "./control"
import { ControlType } from "./control-type"

export class Select implements IControl {
  readonly type: ControlType = 'select'
  hidden: boolean = false
  constructor (public caption: string, public items: string[] | TOption[], public callback: (value: string) => void, public defaultValue?: string, public options?: any) {

  }
}