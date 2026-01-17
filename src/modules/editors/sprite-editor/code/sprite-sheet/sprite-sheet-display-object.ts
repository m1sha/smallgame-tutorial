import { TRect, TSize } from "smallgame"
import { DisplayObjectBase } from "../core"

export type Batch = { name: string, start: number, count: number, rate: number }

export type DisplaySpriteSheetObject = DisplayObjectBase & {
  type: 'sprite-sheet-object'
  rect: TRect
  tileSize: TSize
  cols: number
  rows: number
  batches: Batch[]
  batch: Batch

  playingBatchIndex: number
}