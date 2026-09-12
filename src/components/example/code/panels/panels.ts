import { TPoint } from "smallgame"
import { Component, reactive } from "vue"
import { Panel } from "./panel"

export class PanelManager {
  items: Panel[] = []

  addPanel (panel: Panel) {
    this.items.push(panel)
  }

  createPanel (title: string, component: Component, callback?: (self: Panel, actionName: string, args?: any) => void, data?: any, position?: TPoint): Panel {
    const panel = new Panel(title, component, position ?? { x: 0, y: 0 })
    panel.action = (actionName: string, args?: any) => callback?.(panel, actionName, args)
    panel.data = data
    this.items.push(panel)
    return panel
  }

  get all () { return this.items }
}