import { EventController, Size } from "smallgame"
import { GameBase } from "./game-base"

export class GameConstructor {
  constructor (public name: string, private type: typeof GameBase) {}
  create (eventBus: EventController, screenResolution: Size): GameBase { 
    return Reflect.construct(this.type, [eventBus, screenResolution])
  }
}