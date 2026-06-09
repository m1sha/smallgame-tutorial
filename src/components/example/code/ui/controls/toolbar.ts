import { TOption } from "../option"
import { Button } from "./button"
import { Color } from "./color"
import { UIControl } from "./ui-control"
import { ControlType } from "./control-type"
import { Group } from "./group"
import { Select } from "./select"
import { Tracker } from "./tracker"
import { UploadFile } from "./upload-file"

export class Toolbar  extends UIControl {
  readonly type: ControlType = 'toolbar'
  controls: UIControl[]
  
  constructor (...controls: UIControl[]) {
    super()
    this.controls = controls
    controls.forEach(p=> {
      if (p instanceof Button) p.parent = this
    })
  }

  getControlByType <T>(type: new (...args: any[]) => T): T[] {
    return this.controls.filter(p => p instanceof type) as T[]
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