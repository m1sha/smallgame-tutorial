import { TOption } from "../../parameters"
import { Button } from "./button"
import { Color } from "./color"
import { IControl } from "./control"
import { ControlType } from "./control-type"
import { Group } from "./group"
import { Select } from "./select"
import { Tracker } from "./tracker"
import { UploadFile } from "./upload-file"

export class Toolbar  implements IControl {
  readonly type: ControlType = 'toolbar'
  hidden: boolean = false
  controls: IControl[]
  
  constructor (...controls: IControl[]) {
    this.controls = controls
    controls.forEach(p=> {
      if (p instanceof Button) p.parent = this
    })
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
      const btn = new Button(name, callback, options)
      btn.parent = this
      this.controls.push(btn)
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
}