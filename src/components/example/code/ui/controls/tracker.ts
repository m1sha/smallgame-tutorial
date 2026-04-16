import { RefObj } from "../ref-obj";
import { ControlType } from "./control-type";

export class Tracker {
  readonly type: ControlType = 'tracker'
  hidden: boolean = false
  constructor (public caption: string, public min: number, public max: number, public step: number, public callback: (val: number) => void, public defaultValue?: number | RefObj<number>, public options?: any) {

  }
}