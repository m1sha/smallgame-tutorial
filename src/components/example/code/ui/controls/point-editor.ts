import { TPoint } from "smallgame"
import { UIControl } from "./ui-control"
import { RefObj } from "../ref-obj"
import { ControlType } from "./control-type"

export class PointEditor extends UIControl {
  constructor (public caption: string, public defaultValue: TPoint | RefObj<TPoint>, public callback?: (value: string) => void, options?: any) { super() }
  type: ControlType = 'point'
  
}