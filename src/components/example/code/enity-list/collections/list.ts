import { ref } from "vue"
import { EntityCollectionTypes } from "./collection-types"
import { EntityCollectionBase } from "./entity-collection-base"
import { CollectionOptions } from "./collection-options"

export interface IListItemEntity {
  icon?: string
  caption: string
}

export interface IListEntityCollection {
  objs: any[]
  selectedObjs: any[]
  map: (obj: any) => IListItemEntity
  options: CollectionOptions

  onSelect?: (obj: any) => void
  onDelete?: (obj: any) => void
}

export class ListEntityCollection<TEntity> extends EntityCollectionBase<TEntity> {
  readonly type: EntityCollectionTypes = 'list'
  readonly map: (obj: TEntity) => IListItemEntity

  constructor (map: (obj: TEntity) => IListItemEntity) {
    super()
    this.map = map
  }

  onSelect: ((obj: TEntity) => void) | null = null
  onDelete: ((obj: TEntity) => void) | null = null
}