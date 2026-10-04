import { TPoint } from "smallgame"
import { Component, ref } from "vue"
import { uuidv4 } from "../../../../utils"
import { createReactiveData } from "../create-reactive-data"

export type ActionCallback = (actionName: string, args?: any) => void

export interface IPanel<T> {
  id: string
  title: string
  position: TPoint
  component: Component
  data?: T
  action?: ActionCallback
  execute: ActionCallback
  info: { visible: boolean, title: string }
}

export class Panel<DataType>  {
  protected info = createReactiveData({ visible: true, title: '' })
  id: string
  protected data?: DataType
  protected action?: ActionCallback
  private callback: ActionCallback | null = null
  constructor (title: string, readonly component: Component, public position: TPoint) {
    this.id = uuidv4()
    this.info.title = title

    this.execute('init')
  }

  addCallback (callback: ActionCallback) {
    this.callback = callback
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

  protected async execute (actionName: string, args?: any) {
    await this.action?.(actionName, args)
    await this.callback?.(actionName, args)
  }
 
}