import { GameEvents } from "smallgame"
import { Keys } from "smallgame/src/keys/keys"
import { AppState } from "./app-state"


export class AppEventController {
  handlering (events: GameEvents, _: Keys, appState: AppState) {

    const tool = appState.currentTool
    
    for (const event of events.get()) {

      if (event.type === 'MOUSEDOWN') {
        tool.mousedown(event)
      }

      if (event.type === 'MOUSEMOVE') {
        tool.mousemove(event)
      }

      if (event.type === 'MOUSEUP') {
        tool.mouseup(event)
      }

      if (event.type === 'MOUSELEAVE') {
        tool.mouseleave(event)
      }

      if (event.type === 'MOUSEENTER') {
        tool.mouseenter(event)
      }

    }
  }
}