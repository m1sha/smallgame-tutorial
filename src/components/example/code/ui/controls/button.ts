import { IControl } from "./control";
import { ControlType } from "./control-type";
import { Toolbar } from "./toolbar";

export class Button implements IControl {
  readonly type: ControlType = 'button'
  parent: Toolbar | null = null
  private _selected: boolean = false
  get selected() { return this._selected }
  set selected (value: boolean) { 
    if (this.parent) {
      this.parent.controls.forEach(p => {
        if (p instanceof Button) p._selected = false
      })
    }
    this._selected = value
  }
  
  constructor (public caption: string, public callback: (sender: Button) => void, public options?: any) {
    this._selected = options && options.selected
  }
}