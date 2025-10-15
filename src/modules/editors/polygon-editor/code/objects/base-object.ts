import { Entity, Sprite, type TPoint } from "smallgame"
import { uid } from "../utils/uid"

export abstract class BaseObject extends Sprite {
  readonly id = uid()
  abstract readonly type: 'polygon' | 'image'
  abstract hittest (pos: TPoint): boolean
  selectedPoint: TPoint | null = null
}