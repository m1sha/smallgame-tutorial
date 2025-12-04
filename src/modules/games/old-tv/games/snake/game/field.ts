import { removeItem } from '../../../utils'
import { Fruit } from './fruit'
import { Poison } from './poison'

type FieldSize = { rows: number, cols: number }

export class Field {
  readonly size: FieldSize
  fruits: Fruit[] = []
  poisons: Poison[] = []
  onFruitEaten: ((row: number, col: number) => void) | null = null

  constructor (rows: number, cols: number) {
    this.size = { rows, cols }
  }

  out (row: number, col: number) {
    return row < 0 || col < 0 || row >= this.size.rows || col >= this.size.cols
  }

  hasFruit (row: number, col: number) {
    return this.fruits.some(p => p.row === row && p.col === col)
  }

  hasPoison (row: number, col: number) {
    return this.poisons.some(p => p.row === row && p.col === col)
  }

  markFruitAsEaten (row: number, col: number) {
    removeItem(this.fruits, p => p.row === row && p.col === col)
    if (this.onFruitEaten) this.onFruitEaten(row, col)
  }
}