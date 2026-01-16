import { TRect, TSize } from "smallgame"

export type Batch = { name: string, start: number, count: number, rate: number }

export type DisplaySpriteSheetObject = {
  type: 'sprite-sheet-object'
  id: string
  name: string
  rect: TRect
  tileSize: TSize
  cols: number
  rows: number
  batches: Batch[]
  batch: Batch

  playingBatchIndex: number
}