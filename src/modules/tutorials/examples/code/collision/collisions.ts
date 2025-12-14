import { TRect } from "smallgame";

const Collisions = {
  collisionSides: (rectA: TRect, rectB: TRect): 'none' | 'top' | 'bottom' | 'left' | 'right' => {
    const ax1 = rectA.x, ay1 = rectA.y, ax2 = rectA.x + rectA.width, ay2 = rectA.y + rectA.height
    const bx1 = rectB.x, by1 = rectB.y, bx2 = rectB.x + rectB.width, by2 = rectB.y + rectB.height
  
    if (ax2 <= bx1 || ax1 >= bx2 || ay2 <= by1 || ay1 >= by2) return 'none'
  
    const dx1 = ax2 - bx1
    const dx2 = bx2 - ax1
    const dy1 = ay2 - by1
    const dy2 = by2 - ay1
  
    const minDx = Math.min(dx1, dx2)
    const minDy = Math.min(dy1, dy2)
  
    if (minDx < minDy) {
      return dx1 < dx2 ? 'left' : 'right'  // Rel A Side
    } else {
      return dy1 < dy2 ? 'top' : 'bottom'
    }
  }

}

export { Collisions }