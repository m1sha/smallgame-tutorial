import { Sprite } from "smallgame"
import { uid } from "../utils/uid"

export class BaseObject extends Sprite {
  readonly id = uid()
}