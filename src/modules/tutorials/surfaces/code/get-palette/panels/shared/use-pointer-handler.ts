import { Point } from "smallgame"

export function usePointerHandler () {
  let _callback: ((actionName: string, arg: any ) => void) | null = null
  const getPoint = (ev: PointerEvent | MouseEvent) => new Point(ev.offsetX, ev.offsetY)
  const prevPos = Point.zero
  let down: boolean = false
  return {
    onAction: (callback: (actionName: string, arg: any) => void) => {
      _callback = callback
    },
    pointerdown: (ev: PointerEvent) => {
      prevPos.moveSelf(getPoint(ev))
      down = true
      const pos = getPoint(ev)
      _callback?.('start-move', { pos })
    }, 
    pointermove: (ev: PointerEvent) => {
      const pos = getPoint(ev)
      const shift = pos.shift(prevPos.neg())
      prevPos.moveSelf(pos)
      _callback?.('moving', { down, shift, pos })
    }, 
    pointerup: (_: PointerEvent) => {
      prevPos.moveSelf(0, 0)
      down = false
      _callback?.('end-move', { })
    },
    wheel: (ev: WheelEvent) => {
      const pos = getPoint(ev)
      _callback?.('zoom', { delta: ev.deltaY, pos })
    }
  }
}