
import { Button } from "./button"
import { IControl } from "./control"
import { ControlType } from "./control-type"
import { Toolbar } from "./toolbar"
import { Tracker } from "./tracker"
import { UploadFile } from "./upload-file"

export class Group implements IControl {
  readonly type: ControlType = 'group'
  controls: IControl[] = []
  openned: boolean = false
  constructor (public name: string, ...controls: IControl[]) {
    
    this.controls.push(...controls)
  }

  open () {
    this.openned = true
    return this
  }


 toolbar (settings: (group: Toolbar) => void) {
    const control = new Toolbar()
    settings(control)
    this.controls.push(control)
    return control
  }
  
  group (name: string, settings: (group: Group) => void) {
    const control = new Group(name)
    settings(control)
    this.controls.push(control)
    return control
  }

  tracker (name: string, min: number, max: number, step: number,  callback: (val: number) => void, defaultValue?: number, options?: any) {
    this.controls.push(new Tracker(name, min, max, step, callback, defaultValue, options))
    return this
  }

  button (name: string, callback: (sender: Button) => void, options?: any) {
    this.controls.push(new Button(name, callback, options))
    return this
  }

  upload (caption: string, callback: (file: File) => void, options?: any) {
      this.controls.push(new UploadFile(caption, callback, options))
      return this
    }

}