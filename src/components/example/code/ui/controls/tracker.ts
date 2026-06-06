import { RefObj } from "../ref-obj";
import { ControlType } from "./control-type";
import { UIControl } from "./ui-control";

export class Tracker extends UIControl {
  readonly type: ControlType = 'tracker'
  
  constructor (public caption: string, public min: number, public max: number, public step: number, public callback: (val: number) => void, public defaultValue?: number | RefObj<number>, public options?: any) {
    super()
  }
}