import { IControl } from "./control";
import { ControlType } from "./control-type";

export class Switch implements IControl {
  constructor (public caption: string, public callback: (value: boolean) => void, public defaultValue: boolean) {

  }
  type: ControlType = 'switch'
  hidden: boolean = false
}