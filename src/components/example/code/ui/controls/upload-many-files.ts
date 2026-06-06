import { ControlType } from "./control-type"
import { UIControl } from "./ui-control"

export class UploadManyFiles extends UIControl {
  readonly type: ControlType = 'upload-many'
  constructor (public caption: string, public callback: (files: File[]) => void, public options?: any) {
    super()
  }
}