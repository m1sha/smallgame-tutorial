import { Contariner } from "./container"
import { IControl, Button } from "./controls"
import { IUI } from "./ui"

export class UIBuilder extends Contariner {
  
  build (): IUI {
    const { controls } = this
    return { controls }
  }

  filter (path: string): IControl[] {
    const item = path.split('.')
    for (const c of this.controls) {
      const typeName = item[0].split('|')
      if (c.type !== typeName[0]) continue

      const contr = c as any
      if (contr.name !== typeName[1]) continue

      for (const c1 of c.controls ?? []) {
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