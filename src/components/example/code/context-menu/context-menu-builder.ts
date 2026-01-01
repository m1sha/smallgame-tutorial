import { reactive, ref } from "vue"
import { IContextMenu, IContextMenuItem } from "./context-menu"
import { setPoint, TPoint } from "smallgame"

export class ContextMenuBuilder {
  private show = ref(false)
  private pos = ref(setPoint(0, 0))
  private items = reactive<IContextMenuItem[]>([])

  open (pos: TPoint) {
    this.show.value = true
    this.pos.value.x = pos.x
    this.pos.value.y = pos.y
  }

  close () {
    this.show.value = false
  }

  addItem (caption: string, callback: () => void, options?: { icon?: string }) {
    this.items.push({ caption, callback, icon: options?.icon })
  }

  build (): IContextMenu {
    return {
      show: this.show as any as boolean,
      pos: this.pos as any as TPoint,
      items: this.items,
      close: () => this.close()
    }
  }
}