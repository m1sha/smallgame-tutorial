import { ref } from "vue"
import { EntityCollectionTypes } from "./collection-types"
import { EntityCollectionBase } from "./entity-collection-base"

export interface IListItemEntity {
  icon?: string
  caption: string
}

export interface IListEntityCollection {
  objs: any[]
  map: (obj: any) => IListItemEntity
}

export class ListEntityCollection<TEntity> extends EntityCollectionBase<TEntity> {
  readonly type: EntityCollectionTypes = 'list'
  readonly map: (obj: TEntity) => IListItemEntity

  constructor (map: (obj: TEntity) => IListItemEntity) {
    super()
    this.map = map
  }
}