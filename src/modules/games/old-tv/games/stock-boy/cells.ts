import { setPoint, TPoint, TRect } from "smallgame"
import { Array2D } from "smallgame/src/utils"

type Cell = { id: string, colorIndex: number }
const emptyCell = () => ( { id: '', colorIndex: -1 })
const boyCell = () => [{ id: 'H', colorIndex: -1 }, { id: 'L', colorIndex: -1 }]

type CollisionCellsCallback = (action: string, id: string) => void

export class Cells {
  private items: Array2D<Cell>
  private cursor: { row: number, col: number } = { row: 6, col: 6 }

  callback: CollisionCellsCallback | null = null

  constructor (private rows: number, private cols: number) {
    this.items = new Array2D<Cell>(rows, cols, emptyCell())
    if (rows > 0 && cols > 0)
      this.trySetCursor(this.cursor.row, this.cursor.col)
  }

  update () {

  }

  setBox (row: number, col: number, id: string, colorIndex: number) {
    if (this.isGround(row)) return false

    const next = this.items.get(row + 1, col)

    if (next.id !== "" && next.id !== id) return false

    this.items.set(row + 1, col, { id, colorIndex })
    if (row > -1) {
      if (this.items.get(row, col).id === id) {
        this.items.set(row, col, emptyCell())
      }
    }

    return true
  }

  getCursorPosition (boxSize: number, fieldRect: TRect): { point: TPoint, isGround: boolean } {
    const { col, row } = this.cursor
    const { x, y } = fieldRect
    return {
     point: setPoint(x+ boxSize * col, y + boxSize * (row ) - boxSize),
     isGround: this.isGround(row)
    }
  }

  moveCursorRight () {
    const { row, col } = this.cursor
    return this.trySetCursor(row, col + 1)
  }

  moveCursorLeft () {
    const { row, col } = this.cursor
    return this.trySetCursor(row, col - 1)
  }

  moveCursorUp () {
    const { row, col } = this.cursor
    return this.trySetCursor(row -1, col)
  }

  private trySetCursor (row: number, col: number) {
    const { row: currRow, col: currCol } = this.cursor
    const isDown = row - currRow > 0
    const isUp = row - currRow < 0
    const isRight = col - currCol > 0
    const isLeft = col - currCol < 0

    if (isDown) {

    }

    if (isUp) {

    }

    if (isRight) {
      console.log('Right:', col)
      if (col > this.cols - 1) return false
      if (this.items.get(row, currCol +1).id && currCol  > this.cols - 2)  return false
      
      const nextId = this.items.get(row, col).id
      const afterNext = this.items.get(row, col +1)
      
      if (nextId && afterNext && afterNext.id === '') {
        if (this.callback) this.callback('move-right', nextId)
        const oldItem = this.items.get(row, col)
        this.items.set(row, col, emptyCell())
        this.items.set(row, col +1, oldItem)
        this.setCursor(row, col)
        return true // box move
      }

      if (nextId && afterNext && afterNext.id !== '') {
        return false
      }
    }

    if (isLeft) {
      console.log('Left:', col)
      if (col < 0) return false
      if (this.items.get(row, currCol -1).id && currCol < 2)  return false

      const nextId = this.items.get(row, currCol -1).id
      const afterNext = this.items.get(row, currCol -2)
      
      if (nextId && afterNext && afterNext.id === '') {
        const oldItem = this.items.get(row, col)
        this.items.set(row, col, emptyCell())
        this.items.set(row, col -1, oldItem)
        this.setCursor(row, col)
        if (this.callback) this.callback('move-left', nextId)
        return true // box move
      }

      if (nextId && afterNext && afterNext.id !== '') {
        return false
      }
    }
    
    if (this.isGround(row)) {
     
      const current = this.items.get(row, col)
      if (current.id === "") {
        this.setCursor(row, col)
      }
      return true
    }

    const bottom = this.items.get(row + 1, col)
    if (bottom.id !== "" && bottom.id !== 'L') return false

    this.setCursor(row, col)

    return true
  }

  private setCursor (row: number, col: number) {
    const { row: currRow, col: currCol } = this.cursor
    this.items.set(currRow - 1, currCol, emptyCell())
    this.items.set(currRow, currCol, emptyCell())

    const [h, l] = boyCell()
    this.items.set(row - 1, col, h)
    this.items.set(row, col, l)
    this.cursor = { row, col }
  }

  

  private isGround (row: number) {
    return row === this.rows -1
  }


  private isLastDownLineFull () {
    const list: string[] = []
    for (let i = 0; i < this.cols; i++) {
      const cell = this.items.get(this.rows - 1, i)
      list.push(cell.id)
    }

    if (list.some(p => p == "")) return
    //this.addTask(new RemoveBoxesTask(list))

    //for (const id of list) {
    //  const box = this.boxes.sprites.find(p => p.id === id)!
    //  this.boxExplosions.createExplosion(box.rect)
    //  this.boxes.remove(box)
    //}

    for (let i = 0; i < this.cols; i++) {
      this.items.set(this.rows - 1, i, emptyCell())
    }
  }

  // private isThreeInRowH() {
  //   let i = this.rows
  //   while (--i >= 0) {
  //     for (let j = 0; j < this.cols - 2; j++) {
  //       const item = this.items.get(i, j)
  //       const item1 = this.items.get(i, j + 1)
  //       const item2 = this.items.get(i, j + 2)

  //       if (item.colorIndex === item1.colorIndex && item1.colorIndex === item2.colorIndex) {
  //         this.items.set(i, j, emptyCell())
  //         this.items.set(i, j + 1, emptyCell())
  //         this.items.set(i, j + 2, emptyCell())

  //        // ;[item.id, item1.id, item2.id].forEach(id => {
  //        //   this.boxes.remove(this.boxes.sprites.find(p => p.id === id)!)  
  //        // })
          
  //       }
  //     }
  //   }
  // }

  // private isThreeInRowV() {
  //   let i = sizes.rows
  //   while (--i >= 0) {
  //     for (let j = 0; j < sizes.cols - 2; j++) {
  //       const item = this.cells.get(i, j)
  //       const item1 = this.cells.get(i, j + 1)
  //       const item2 = this.cells.get(i, j + 2)

  //       if (item.colorIndex === item1.colorIndex && item1.colorIndex === item2.colorIndex) {
  //         this.cells.set(i, j, emptyCell())
  //         this.cells.set(i, j + 1, emptyCell())
  //         this.cells.set(i, j + 2, emptyCell())

  //         this.boxes.remove(this.boxes.sprites.find(p => [item.id, item1.id, item2.id].includes(p.id))!)
  //       }
  //     }
  //   }
  // }

  toString () {
    let str = ''
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const item = this.items.get(i, j)
        str += (item.id === '' ? '-' : (item.colorIndex > -1 ? item.colorIndex + '': item.id))
      }
      str += '\n'
    }
    console.log(str)
  }
}