import { UIControl } from "./ui-control"
import { ControlType } from "./control-type";

export class Input extends UIControl {
  constructor (public caption: string, public callback: (value: string) => void, public defaultValue: string) { super() }
  type: ControlType = 'input'
  
}