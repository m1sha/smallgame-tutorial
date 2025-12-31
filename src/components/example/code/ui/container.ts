import { reactive } from "vue"
import { TOption } from "../parameters"
import { Button, Group, IControl, Panel, Switch, Toolbar, Tracker, UploadFile } from "./controls"
import { Color } from "./controls/color"
import { InfoPanel } from "./controls/info-panel"
import { Select } from "./controls/select"

export abstract class Contariner  {
  controls: IControl[]

  constructor () {
    this.controls = reactive([])
  }

  toolbar (settings: (group: Toolbar) => void) {
    const control = new Toolbar()
    settings(control)
    this.controls.push(control)
    return control
  }

  panel (settings: (group: Panel) => void) {
    const control = reactive(new Panel())
    settings(control)
    this.controls.push(control)
    return control
  }
  
  group (name: string, settings: (group: Group) => void) {
    const control = reactive(new Group(name))
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

  info (text: string, title?: string) {
    this.controls.push(new InfoPanel(text, title ?? ''))
  }

  switch (caption: string, callback: (value: boolean) => void, defaultValue?: boolean) {
    this.controls.push(new Switch(caption, callback, defaultValue ?? false))
  }
}