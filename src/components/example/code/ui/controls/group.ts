
import { TOption } from "../../parameters"
import { Button } from "./button"
import { Color } from "./color"
import { IControl } from "./control"
import { ControlType } from "./control-type"
import { Input } from "./input"
import { Panel } from "./panel"
import { Select } from "./select"
import { Switch } from "./switch"
import { Toolbar } from "./toolbar"
import { Tracker } from "./tracker"
import { UploadFile } from "./upload-file"

export class Group implements IControl {
  readonly type: ControlType = 'group'
  controls: IControl[] = []
  openned: boolean = false
  hidden: boolean = false
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

  panel (settings: (group: Panel) => void) {
    const control = new Panel()
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

    color (caption: string,  callback: (color: string) => void, defaultColor?: string) {
        this.controls.push(new Color(caption, callback, defaultColor))
        return this
      }

      select (caption: string, items: string[] | TOption[], callback: (value: string) => void, defaultValue?: string | undefined, options?: any) {
        this.controls.push(new Select(caption, items, callback, defaultValue, options))
        return this
      }

  switch (caption: string, callback: (value: boolean) => void, defaultValue?: boolean) {
    this.controls.push(new Switch(caption, callback, defaultValue ?? false))
    return this
  }

  input (caption: string, callback: (value: string) => void, defaultValue?: string) {
    this.controls.push(new Input(caption, callback, defaultValue ?? ''))
    return this
  }
}