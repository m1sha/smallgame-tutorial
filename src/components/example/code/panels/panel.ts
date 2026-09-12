import { TPoint } from "smallgame"
import { Component, ref } from "vue"
import { uuidv4 } from "../../../../utils"
import { createReactiveData } from "../create-reactive-data"

export interface IPanel {
  id: string
  title: string
  position: TPoint
  component: Component
  data?: any
  action?: (actionName: string, args?: any) => void
  info: { visible: boolean, title: string }
}

export class Panel<DataType>  {
  protected info = createReactiveData({ visible: true, title: '' })
  id: string
  protected data?: DataType
  protected action?: (actionName: string, args?: any) => void
  constructor (title: string, protected component: Component, public position: TPoint) {
    this.id = uuidv4()
    this.info.title = title
  }

  get title () {
    return this.info.title
  }

  set title (value: string) {
    this.info.title = value
  }

  hide () {
    this.info.visible = false
  }

  show () {
    this.info.visible = true
  }
 
}