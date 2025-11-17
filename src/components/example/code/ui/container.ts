import { Button, Group, IControl, Toolbar, Tracker, UploadFile } from "./controls"

export abstract class Contariner  {
  controls: IControl[] 

  constructor () {
    this.controls = []
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