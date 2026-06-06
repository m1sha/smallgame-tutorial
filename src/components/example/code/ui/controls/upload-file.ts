import { ControlType } from "./control-type"
import { UIControl } from "./ui-control"
export class UploadFile extends UIControl {
  readonly type: ControlType = 'upload'
  
  constructor (public caption: string, public callback: (file: File) => void, public options?: any) {
    super()
  }
}