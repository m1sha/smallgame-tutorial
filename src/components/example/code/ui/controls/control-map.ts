import { IControl } from "./control"

export class ControlMap {
  private map: Map<string, IControl> = new Map()

  set (name: string, control: IControl) {
    this.map.set(name, control)
  }

  get (name: string) {
    return this.map.get(name)
  }

  show (name: string) {
    this.hideAll()
    this.get(name)!.hidden = false
  }

  hideAll () {
    this.map.values().forEach(p => p.hidden = true)
  }
}