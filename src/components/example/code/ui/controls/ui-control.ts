import { computed, ComputedRef, ref } from "vue"
import { RefObj } from "../ref-obj"

export class UIControl {
  private visible: RefObj<boolean>
  private onHidden: () => boolean | null
  private onShown: () => boolean | null
  protected hidden:  ComputedRef<boolean>

  constructor () {
    this.visible = ref(true)
    this.hidden = computed(() => {
      if (this.onHidden) return this.onHidden()
      if (this.onShown) return !this.onShown()
      return !this.visible.value
    })
  }

  show () {
    this.visible.value = true
    return this
  }

  hide () {
    this.visible.value = false
    return this
  }

  hiddenif (callback: (() => boolean) | null) {
    this.onHidden = callback
    return this
  }

  shownif (callback: (() => boolean) | null) {
    this.onShown = callback
    return this
  }
}