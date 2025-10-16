import { Surface } from "smallgame"
import { BaseObject } from "../../objects"

export abstract class Drawable<T extends BaseObject> {
  abstract normal (surface: Surface, object: T):void
  abstract hover (surface: Surface, object: T):void
  abstract selected (surface: Surface, object: T):void
}