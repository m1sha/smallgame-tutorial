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
  info: { visible: boolean }
}

export class Panel implements IPanel {
  info = createReactiveData({ visible: true })
  id: string
  data?: any
  action?: (actionName: string, args?: any) => void
  constructor (public title: string, public component: Component, public position: TPoint) {
    this.id = uuidv4()
  }

  hide () {
    this.info.visible = false
  }

  show () {
    this.info.visible = true
  }
 
}