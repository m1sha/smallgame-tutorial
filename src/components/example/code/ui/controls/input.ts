import { IControl } from "./control";
import { ControlType } from "./control-type";

export class Input implements IControl {
  constructor (public caption: string, public callback: (value: string) => void, public defaultValue: string) {}
  type: ControlType = 'input'
  hidden: boolean = false
}