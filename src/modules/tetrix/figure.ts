export class Figure { 
  data: number[]
  cols: number
  rows: number 

  constructor (data: number[], cols: number, rows: number) {
    this.rows = rows
    this.cols = cols
    this.data = data
  }

  getCell(row: number, col: number) {
    return this.data[row * this.cols + col]
  }
}
