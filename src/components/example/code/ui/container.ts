import { reactive } from "vue"

import { Button, ControlMap, Group, IControl, Panel, Switch, Toolbar, Tracker, UploadFile, UploadManyFiles } from "./controls"
import { Color } from "./controls/color"
import { InfoPanel } from "./controls/info-panel"
import { Select } from "./controls/select"
import { Input } from "./controls/input"
import { RefObj } from "./ref-obj"
import { UIControl } from "./controls/ui-control"
import { TOption } from "./option"

export abstract class Contariner  {
  controls: UIControl[]

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
    const control = new Panel()
    settings(control)
    this.controls.push(control)
    return control
  }
  
  group (name: string, settings?: (group: Group) => void) {
    const control = new Group(name)
    settings?.(control)
    this.controls.push(control)
    return control
  }

  tracker (name: string, min: number, max: number, step: number,  callback: ((val: number) => void) | undefined, defaultValue?: number | RefObj<number>, options?: any) {
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

  uploadMany (caption: string, callback: (files: File[]) => void, options?: any) {
    this.controls.push(new UploadManyFiles(caption, callback, options))
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