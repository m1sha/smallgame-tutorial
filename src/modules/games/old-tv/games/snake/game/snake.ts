import { Field } from './field'

export type SnakeDirection = 'up' | 'left' | 'right' | 'down'
export type SnakeMovement = 'keep-moving' | 'turn-left' | 'turn-right'
export type SnakeCell = { row: number, col: number }

export class Snake {
  private field: Field
  private _alive: boolean = false
  direction: SnakeDirection = 'up'
  cells: SnakeCell[] = []
  onStep: ((row: number, col: number)=> void) | null = null
  onGrow: ((size: number) => void) | null = null
  onDead: (() => void) | null = null

  constructor (field: Field) {
    this.field = field
  }

  get alive(): boolean {
    return this._alive
  }

  revive (row: number, col: number) {
    this._alive = true
    this.direction = 'up'
    this.init(row, col)
  }

  move (act: SnakeMovement) {
    if (!this._alive) return

    if (act === 'turn-left') this.ccw()
    if (act === 'turn-right') this.cw()

    let prev: SnakeCell = { ...this.cells[0] }
    for (let i = 1; i < this.cells.length; i++) {
      const curr = { ...this.cells[i] }
      this.cells[i] = prev
      prev = { ...curr }
    }

    const head = this.cells[0]
    switch (this.direction) {
      case 'up': head.row--; break
      case 'left': head.col--; break
      case 'right': head.col++; break
      case 'down': head.row++; break
    }

    this.doStep(this.cells[0].row, this.cells[0].col)
  }

  grow () {
    let { row, col } = this.cells[this.cells.length - 1]
    switch (this.direction) {
      case 'up': row++; break
      case 'down': row--; break
      case 'left': col++; break
      case 'right': col--; break
    }
    this.cells.push({ row, col });
    if (this.onGrow) this.onGrow(this.cells.length - 4)
  }

  private intersectsItself (row: number, col: number) {
    return this.cells.some((v, i) => (i > 0 ? v.col === col && v.row === row : false))
  }

  private doStep (row: number, col: number) {
    if (this.field.hasFruit(row, col)) {
      this.field.markFruitAsEaten(row, col)
      this.grow()
    }

    if (this.intersectsItself(row, col)) {
      this._alive = false
      if (this.onDead) this.onDead()
      return
    }

    if (this.field.out(row, col)) {
      this._alive = false
      if (this.onDead) this.onDead()
      return
    }

    if (this.onStep) this.onStep(this.cells[0].row, this.cells[0].col)
  }

  private cw () {
    switch (this.direction) {
      case 'up': this.direction = 'right'; break
      case 'right': this.direction = 'down'; break
      case 'down': this.direction = 'left'; break
      case 'left': this.direction = 'up'; break
    }
  }

  private ccw () {
    switch (this.direction) {
      case 'up': this.direction = 'left'; break
      case 'left': this.direction = 'down'; break
      case 'down': this.direction = 'right'; break
      case 'right': this.direction = 'up'; break
    }
  }

  private init (row: number, col: number) {
    this.cells = []
    this.cells.push({ row, col })
    this.cells.push({ row: row + 1, col })
    this.cells.push({ row: row + 2, col })
    this.cells.push({ row: row + 3, col })
  }
}