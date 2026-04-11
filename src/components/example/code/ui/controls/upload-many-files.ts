import { ControlType } from "./control-type"

export class UploadManyFiles {
  readonly type: ControlType = 'upload-many'
  hidden: boolean = false
  constructor (public caption: string, public callback: (files: File[]) => void, public options?: any) {

  }
}