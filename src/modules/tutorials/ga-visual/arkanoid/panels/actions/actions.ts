import { Point } from "smallgame";
import { Panel } from "../../../../../../components/example/code/panels";
import ActionPanelComponent from "./components/action-panel.vue";
import { ActionsData } from "./actions-data.ts";
import { createReactiveData } from "../../../../../../components/example/index.ts";

export class ActionsPanel extends Panel<ActionsData> {
  onAction: ((actionName: string, args?: any) => void) | null = null
  constructor () {
    super('Game', ActionPanelComponent, new Point(400, 50))

    this.action = (actionName, arg) => {
      this.onAction?.(actionName, arg)
    }

    this.data = createReactiveData({ parameters: { mode: 'step', frames: 0, score: 0 }})
  }

  get mode () {
    return this.data!.parameters.mode
  }

  get frameCount () {
    return this.data!.parameters.frames
  }

  set frameCount (value: number) {
    this.data!.parameters.frames = value
  }

  get score () {
    return this.data!.parameters.score
  }

  set score (value: number) {
    this.data!.parameters.score = value
  }
}