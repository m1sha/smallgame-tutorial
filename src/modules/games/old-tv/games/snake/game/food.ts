import { Fruit } from './fruit'
import { Field } from './field'

export class Food {
  private field: Field
  count = 8
  recreationInterval = 15000

  constructor (field: Field) {
    this.field = field
  }

  create () {
    this.field.fruits = []
      for (let i = 0; i < this.getCount(); i++) {
        const row = Math.floor(Math.random() * this.field.size.rows)
        const col = Math.floor(Math.random() * this.field.size.cols)
        const fruit = new Fruit(row, col)
        this.field.fruits.push(fruit)
      }
    setInterval(() => {
      this.field.fruits = []
      for (let i = 0; i < this.getCount(); i++) {
        const row = Math.floor(Math.random() * this.field.size.rows)
        const col = Math.floor(Math.random() * this.field.size.cols)
        const fruit = new Fruit(row, col)
        this.field.fruits.push(fruit)
      }
    }, this.recreationInterval)
  }

  private getCount () {
    return 0 | this.count * Math.random() + 1
  }
}