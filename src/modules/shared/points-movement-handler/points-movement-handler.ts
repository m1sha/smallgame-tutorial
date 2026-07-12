import { GameEvent, Keys, Point } from "smallgame";
import { IInputDelegate } from "../viewer/input-delegate";

export type PointEntity = { point: Point }

export class PointsMovementHandler implements IInputDelegate {
  private selecteds: PointEntity[] = []
  readonly entities: PointEntity[]
  

  constructor (entities: PointEntity[] | Point[], public pointRadius = 15, onPointsMovingCallback?: (entities: PointEntity[]) => boolean | void) {
    this.entities = Array.isArray(entities) && entities[0] instanceof Point
      ? entities.map(point => ({ point: point }))
      : entities as PointEntity[]
    this.onPointsMoving = onPointsMovingCallback
  }

  onPointsMoving: ((entities: PointEntity[]) => boolean | void) | null = null

  input (ev: GameEvent, owner: { cursor: string }) {
    if (ev.type === 'MOUSEDOWN') {
      this.selecteds = []
      const entity = this.entities.find(p => p.point.inRadius(ev.pos, this.pointRadius))
      if (entity) this.selecteds.push(entity)
    }
    if (ev.type === 'MOUSEMOVE' && ev.lbc) {
      const skip = this.onPointsMoving?.(this.selecteds)
      if (skip === false) return
      this.selecteds.forEach((selected) => {
        selected.point.shiftSelf(ev.shift)
      })
    }
    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.selecteds = []
    }
  }

  keyPressed (keys: Keys) {

  }
}