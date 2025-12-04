export interface GameSetting {

  /** Columns count */
  cols: number

  /** Rows count */
  rows: number

  ///** Cell size (in pixels) */
  //cellSize: number

  /** Minimum of the food amount */
  foodMinAmount?: number

  /** Maximum of the food amount */
  foodMaxAmount?: number

  /** Interval of the recreation food on field (in seconds) */
  foodRecreationInterval?: number

  /** Allow generate cells with the poison */
  allowGeneratePoison?: boolean

  /** Minimum of the poison amount */
  poisonMinAmount?: number

  /** Maximum of the poison amount */
  poisonMaxAmount?: number

  /** Allow generate walls on the field */
  allowGenerateWalls?: boolean

  /** The snake movement speed (in pixels per second) */
  snakeSpeed?: number

}