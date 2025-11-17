import { ControlType } from "./control-type"

export class UploadFile {
  readonly type: ControlType = 'upload'
  constructor (public caption: string, public callback: (file: File) => void, public options?: any) {

  }
}