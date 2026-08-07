import { TOption } from "../option"
import { UIControl } from "./ui-control"
import { ControlType } from "./control-type"
import { Surface } from "smallgame"

export class SelectImage extends UIControl {
  readonly type: ControlType = 'select-image'
  
  constructor (public caption: string, public items: { id: string, name?: string, surface: Surface }[], public callback: (id: string) => void, public defaultId?: string) {
    super()
  }
}