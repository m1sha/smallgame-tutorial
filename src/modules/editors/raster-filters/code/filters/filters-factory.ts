import { EraseColorFilter } from './erase-color-filter/filter'
import { DepletePaletteFilter, DepletePaletteFilterSetting } from './deplete-palette-filter'
import { Filter } from './filter'
import { App } from '../app'
import { EraseColorFilterSetting } from './erase-color-filter'

export function createFilters (app: App): Filter[] {
  return [
    new DepletePaletteFilter(app),
    new EraseColorFilter(app)
  ]
}

export type AllFiltersSettings = DepletePaletteFilterSetting | EraseColorFilterSetting

export function createDefaultFiltersSettings (): AllFiltersSettings[] {
  return [
    {
      type: 'DepletePaletteFilter',
      value: 256
    },
    {
      type: 'EraseColorFilter',
      value: 1,
      color: [255, 255, 255, 0]
    }
  ]
}