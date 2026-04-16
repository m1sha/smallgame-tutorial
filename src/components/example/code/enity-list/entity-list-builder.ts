import { ref } from "vue"
import { IEnity, IEnityClass, IEnityList } from "./enity-list"

export class EntityListBuilder {
  private items: IEnity[] = []
  private enityClasses: IEnityClass[] = []

  addClass<T> (name: string, displayFormat: (value: T) => string) {
    this.enityClasses.push({ name, displayFormat })
    return this
  }

  //add<T> (className: string, obj: T) {
  //  this.items.push({ className, obj })
  //  return this
  //}

  new<T> (className: string) {
    const obj = ref<T>()
    this.items.push({ className, obj })
    return obj
  }

  onRemoveEnity: ((obj: any) => void) | null

  build (): IEnityList {
    return {
      items: this.items,
      enityClasses: this.enityClasses,
      onRemoveEnity: (value) => {
        this.onRemoveEnity?.(value.obj)
      }
    }
  }
}