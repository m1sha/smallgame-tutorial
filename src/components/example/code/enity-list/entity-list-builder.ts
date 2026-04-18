import { IEnityList } from "./enity-list"
import { GridEntityListCollection, IEntityCollection, IGridCellEntity, IListItemEntity, ListEntityCollection } from "./collections"

export class EntityListBuilder {
  private items: IEntityCollection[] = []

  addList<TEntity>(map: (obj: TEntity) => IListItemEntity) {
    const collection = new ListEntityCollection<TEntity>(map)
    this.items.push(collection)
    return collection
  }

  addGrid<TEntity> (map: (obj: TEntity) => IGridCellEntity) {
    const collection = new GridEntityListCollection<TEntity>(map)
    this.items.push(collection)
    return collection
  }

  build (): IEnityList {
    return {
      items: this.items
    }
  }
}