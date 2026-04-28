import { ref, toRaw } from "vue";
import { CollectionOptions } from "./collection-options"

export abstract class EntityCollectionBase<TEntity> {
  protected objs = ref<TEntity[]>([])
  readonly options: CollectionOptions = new CollectionOptions()

  add (obj: TEntity) {
    this.objs.value.push(obj as any)
    return this.objs.value[this.objs.value.length - 1]
  }

  get items (): Readonly<TEntity[]> {
    return this.objs.value as Readonly<TEntity[]>
  }
}