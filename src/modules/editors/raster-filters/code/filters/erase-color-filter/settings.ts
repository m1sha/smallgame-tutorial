import { RGBA } from 'smallgame/src/utils/pixels'

export type EraseColorFilterSetting = {
  type: 'EraseColorFilter'
  value: number
  color: RGBA
}