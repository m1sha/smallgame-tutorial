import { Point, Size } from "smallgame"
import { Array2D } from "smallgame/src/utils"

export type ArkanoidGameDefinition = {
  bricksMap: Array2D<number>
  bricksStartPos: Point
  bricksOffset: Point
  brickSize: Size
  
  ballPos: Point
  ballVelocity: Point
  ballRadius: number
  ballSpeed: number
  
  carrentPos: Point
  carrentVelocity: Point
  carrentSize: Size
  carrentSpeed: number
  
  worldSize: Size

  getDt: () => number
}


export function createArkanoidGameDefinition (worldSize: Size, getDt: () => number, options?: Exclude<ArkanoidGameDefinition, 'worldSize' | 'getDt'>): ArkanoidGameDefinition {
  const gapX = worldSize.width / 100
  const gapY = worldSize.height / 100
  const ds = Math.hypot(worldSize.width, worldSize.height) / 1000

  const carrentSize = new Size(worldSize.width / 12, worldSize.height / 40)
  const carrentPos = new Point((worldSize.width - carrentSize.width) / 2, worldSize.height - worldSize.height / 30 - gapY)

  const ballRadius = worldSize.height / 100
  const ballPos = new Point((worldSize.width - ballRadius) / 2, carrentPos.y - ballRadius * ballRadius)

  return {
    worldSize,
    
    ballPos: ballPos,
    ballRadius: ballRadius,
    ballVelocity: new Point(-1, 1),
    ballSpeed: 1 * ds,

    brickSize: new Size(worldSize.width / 14, worldSize.height / 22),
    bricksStartPos: new Point(gapX * 4, gapY * 7),
    bricksOffset: new Point(gapX * 0.5, gapY),
    bricksMap: new Array2D<number>(8, 12, 1),

    carrentPos: carrentPos,
    carrentSize: carrentSize,
    carrentVelocity: new Point(-1, 0),
    carrentSpeed: 5 * ds,

    getDt: () => getDt()
  }
}