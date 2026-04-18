import { setSize, TSize } from "smallgame"
import { EntityCollectionTypes } from "./collection-types"
import { EntityCollectionBase } from "./entity-collection-base"

export interface IGridCellEntity  {
  icon: string
  title?: string
}

export interface IGridEntityCollection {
  objs: any[]
  selected: any
  map: (obj: any) => IGridCellEntity
  onSelect: ((value: any) => void) | null
  iconSize: TSize
  columnCount: number
  selectable: boolean
}

export class GridEntityListCollection<TEntity> extends EntityCollectionBase<TEntity> {
  readonly type: EntityCollectionTypes = 'grid'
  readonly map: (obj: TEntity) => IGridCellEntity

  constructor (map: (obj: TEntity) => IGridCellEntity) {
    super()
    this.map = map
  }

  columnCount: number = 4
  iconSize: TSize = setSize(32, 32)
  selected: TEntity | null = null
  onSelect: ((value: TEntity) => void) | null = null

  selectable: boolean = true
}