import { TRect, TSize } from "smallgame"

export type Batch = { name: string, start: number, count: number }

export type SpriteSheetObject = {
  rect: TRect
  tileSize: TSize
  cols: number
  rows: number
  batches: Batch[]
  batch: Batch

  playingBatchIndex: number
}