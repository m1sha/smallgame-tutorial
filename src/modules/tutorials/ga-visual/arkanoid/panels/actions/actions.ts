import { Point } from "smallgame";
import { Panel } from "../../../../../../components/example/code/panels";
import ActionPanelComponent from "./components/action-panel.vue";
import { ActionsData } from "./actions-data.ts";
import { createReactiveData } from "../../../../../../components/example/index.ts";

export class ActionsPanel extends Panel<ActionsData> {
  onAction: ((action: number) => void) | null = null
  constructor () {
    super('Actions', ActionPanelComponent, new Point(600, 50))

    this.action = (actionName) => {
      let a = 0
      if (actionName === 'left') a = 1
      if (actionName === 'right') a = 2
      this.onAction?.(a)
    }

    this.data = createReactiveData({ parameters: { mode: 'step' }})
  }
}