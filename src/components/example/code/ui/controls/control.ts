import { ControlType } from "./control-type"

export interface IControl {
  readonly type: ControlType
  controls?: IControl[]
  hidden: boolean
}