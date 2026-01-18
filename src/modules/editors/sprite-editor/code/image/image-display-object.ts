import { TSize } from "smallgame"
import { DisplayObjectBase } from "../core"

export type ImageDisplayObject = DisplayObjectBase & {
  type: 'image-object'
  size: TSize
}