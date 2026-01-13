import { TSize } from "smallgame"

export type DiplayImage = {
  id: string
  name: string
  size: TSize
}

export type DisplayImagesCombinerObject = {
  type: 'image-combiner-object'
  id: string
  name: string
  images: DiplayImage[]
}