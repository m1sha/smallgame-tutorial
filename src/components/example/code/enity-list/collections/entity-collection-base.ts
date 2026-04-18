import { ref } from "vue";

export abstract class EntityCollectionBase<TEntity> {
  protected objs = ref<TEntity[]>([])

   add (obj: TEntity) {
    this.objs.value.push(obj as any)
    return this.objs.value[this.objs.value.length - 1]
  }
}