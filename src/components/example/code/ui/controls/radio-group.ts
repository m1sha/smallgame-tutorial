import { ControlType } from "./control-type"
import { UIControl } from "./ui-control"

export class RadioGroup extends UIControl {
  readonly type: ControlType = 'radio-group'
  readonly callback: ((name: string) => void) | null = null

  constructor (public buttons: { name: string, title: string, icon?: string }[], public defaultValue: string, callback?: (name: string) => void) {
    super()
    this.callback = callback ?? null
  }
}