import { ControlType } from "./control-type";

export class Tracker {
  readonly type: ControlType = 'tracker'
  constructor (public caption: string, public min: number, public max: number, public step: number, public callback: (val: number) => void, public defaultValue?: number, public options?: any) {

  }
}