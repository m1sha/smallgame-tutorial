import { TSize } from "smallgame"
import { DisplayObjectBase } from "../core"

export type DiplayImage = {
  id: string
  name: string
  size: TSize
}

export type DisplayImagesCombinerObject = DisplayObjectBase & {
  type: 'image-combiner-object'
  images: DiplayImage[]
}