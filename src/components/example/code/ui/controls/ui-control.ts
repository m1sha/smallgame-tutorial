import { computed, ComputedRef, ref } from "vue"
import { RefObj } from "../ref-obj"

export class UIControl {
  private visible: RefObj<boolean>
  private onVisible: () => boolean | null
  protected hidden:  ComputedRef<boolean>

  constructor () {
    this.visible = ref(true)
    this.hidden = computed(() => {
      if (this.onVisible) return this.onVisible()
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
    this.onVisible = callback
    return this
  }
}