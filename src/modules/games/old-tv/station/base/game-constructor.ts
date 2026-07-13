import { EventController, Size } from "smallgame"
import { GameApp } from "./game-base"

export class GameConstructor {
  constructor (public name: string, private type: typeof GameApp) {}
  create (eventBus: EventController, screenResolution: Size): GameApp { 
    return Reflect.construct(this.type, [eventBus, screenResolution])
  }
}