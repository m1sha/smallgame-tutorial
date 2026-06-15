import { UIControl } from "./ui-control"
import { ControlType } from "./control-type"
import { Toolbar } from "./toolbar"

export class Button extends UIControl {
  readonly type: ControlType = 'button'
  parent: Toolbar | null = null
  private _selected: boolean = false
  private _disabled: boolean = false
  readonly name: string = ''
  get selected() { return this._selected }
  set selected (value: boolean) { 
    if (this.parent) {
      this.parent.controls.forEach(p => {
        if (p instanceof Button) p._selected = false
      })
    }
    this._selected = value
  }

  get disabled () {
    return this.options && this.options.disabledif ? this.options.disabledif() : this._disabled
  }

  set disabled (value: boolean) {
    this._disabled = value
  }
  
  
  constructor (public caption: string, public callback: (sender: Button) => void, public options?: any) {
    super()
    this._selected = options && options.selected
    this.name = options && options.name
  }
}