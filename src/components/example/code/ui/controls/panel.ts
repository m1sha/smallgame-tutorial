
import { TOption } from "../../parameters"
import { Button } from "./button"
import { Color } from "./color"
import { IControl } from "./control"
import { ControlType } from "./control-type"
import { Group } from "./group"
import { Input } from "./input"
import { Select } from "./select"
import { Switch } from "./switch"
import { Toolbar } from "./toolbar"
import { Tracker } from "./tracker"
import { UploadFile } from "./upload-file"

export class Panel implements IControl {
  readonly type: ControlType = 'panel'
  controls: IControl[] = []
  hidden: boolean = false
  constructor (...controls: IControl[]) {
    this.controls.push(...controls)
  }

  hide () {
    this.hidden = true
    return this
  }

  show () {
    this.hidden = false
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
  }

  input (caption: string, callback: (value: string) => void, defaultValue?: string) {
    this.controls.push(new Input(caption, callback, defaultValue ?? ''))
    return this
  }
}