export type Item = { id: string, name: string }
export class Selector {
  callback: ((id: string) => void) | null = null
  items: Item[] = []

  clear () {
    while(this.items.pop());
  }

  setCurrentId (id: string) {
    this.callback?.(id)
  }

  add (id: string, name: string) {
    this.items.push({ id, name })
    return this
  }
}