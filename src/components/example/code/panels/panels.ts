import { TPoint } from "smallgame"
import { Component, reactive } from "vue"
import { Panel } from "./panel"

export class PanelManager {
  items: Panel<any>[] = []

  use <T extends Panel<any>>(type: (new (...args: any[]) => T)) {
    const panel = new type()
    this.addPanel(panel)
    return panel
  }

  addPanel (panel: Panel<any>) {
    this.items.push(panel)
  }

  createPanel (title: string, component: Component, callback?: (self: Panel<any>, actionName: string, args?: any) => void, data?: any, position?: TPoint): Panel<any> {
    const panel = new Panel<any>(title, component, position ?? { x: 0, y: 0 }) as any
    panel.action = (actionName: string, args?: any) => callback?.(panel, actionName, args)
    panel.data = data
    this.items.push(panel)
    return panel
  }

  get all () { return this.items }
}