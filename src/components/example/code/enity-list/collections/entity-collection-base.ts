import { ref, toRaw } from "vue";
import { CollectionOptions } from "./collection-options"

export abstract class EntityCollectionBase<TEntity> {
  protected objs = ref<TEntity[]>([])
  protected selectedObjs = ref<TEntity[]>([])
  readonly options: CollectionOptions = new CollectionOptions()

  clear () {
    while(this.objs.value.pop());
  }

  add (obj: TEntity) {
    this.objs.value.push(obj as any)
    return this.objs.value[this.objs.value.length - 1]
  }

  select (objs: TEntity[]) {
    this.selectedObjs.value = [...objs]
  }

  get items (): Readonly<TEntity[]> {
    return this.objs.value as Readonly<TEntity[]>
  }
}