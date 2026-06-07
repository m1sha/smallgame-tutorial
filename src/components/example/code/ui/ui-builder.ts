import { ref } from "vue"
import { IControl, Button, UIContariner } from "./controls"
import { IUI } from "./ui"
import { RefObj } from "./ref-obj"

export class UIBuilder extends UIContariner {

  var<T> (value: T) {
    return ref<T>(value) as RefObj<T>
  }
  
  build (): IUI {
    const { controls } = this
    return { controls: controls as any as IControl[] }
  }

  filter (path: string): IControl[] {
    const item = path.split('.')
    for (const c of this.controls) {
      const control = c as any as IControl
      const typeName = item[0].split('|')
      if (control.type !== typeName[0]) continue

      const contr = c as any
      if (contr.name !== typeName[1]) continue

      for (const c1 of control.controls ?? []) {
        if (c1.type === item[1])
          return c1.controls ?? []
      }
    }

    return []
  }

  unselectGroup (path: string) {
    this.filter(path).forEach(p => { 
      if (p instanceof Button) { p.options!.selected = false }
    })
  }
}