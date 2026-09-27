import { AnyModal } from "./modal-types"

export class Modals {
  private resolve: ((result: string) => void) | null = null

  constructor (private component: any) {

  }

  close (result: string) {
    this.resolve?.(result)
  }

  prompt (message: string, title: string, defaultValue: string) {
    return this.execModal({ type: 'prompt', message, title, defaultValue })
  }

  choose (message: string, title: string, options: string[], defaultValue: string) {
    return this.execModal({ type: 'multichoose', message, title, defaultValue, options })
  }

  private execModal (def: AnyModal) {
    return new Promise<string>(resolve => {
      this.component.value?.open(def)
      this.resolve = resolve
    })
  }
}