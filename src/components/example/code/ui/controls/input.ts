import { UIControl } from "./ui-control"
import { ControlType } from "./control-type";
import { RefObj } from "../ref-obj";

export class Input extends UIControl {
  constructor (public caption: string, public callback: (value: string) => void, public defaultValue: string | RefObj<string>) { super() }
  type: ControlType = 'input'
  
}