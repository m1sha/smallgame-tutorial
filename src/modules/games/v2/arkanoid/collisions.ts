import { GMath } from "smallgame"
import { Ball } from "./ball"
import { Brick } from "./brick"
import { World } from "./world"
import { Carrent } from "./carrent"


export class Collider  {
  ballCollidesWorld (ball: Ball, world: World): 'None' | 'Collided' | 'GameOver' {
    const right = ball.position.x + ball.radius >= world.size.width
    const left = ball.position.x - ball.radius <= 0
    const bottom = ball.position.y + ball.radius >= world.size.height + ball.radius* ball.radius
    const top = ball.position.y - ball.radius <= 0
    
    if (left || right) 
      ball.velocity.x = -ball.velocity.x
    
    if (bottom || top)
      ball.velocity.y = -ball.velocity.y
    
    if (top || left || right) return 'Collided'
    if (bottom) return 'GameOver'
    return 'None'
  }

  ballCollidesCarret (ball: Ball, carrent: Carrent) {
    const bx0 = ball.position.x - ball.radius
    const bx1 = ball.position.x + ball.radius
    const cx0 = carrent.position.x
    const cx1 = carrent.position.x + carrent.size.width

    if (ball.position.y + ball.radius < carrent.position.y) return false
    
    const collided = (cx0 <= bx0 && bx0 <= cx1) || (cx0 <= bx1 && bx1 <= cx1)
    if (collided) {
      ball.velocity.y = -ball.velocity.y
    }
    return collided
  }

  ballCollidesBricks (ball: Ball, block: Brick[]) {
    if (!block.length) return false
    for (let i = block.length - 1; i >= 0; i--) {
      if (!block[i].alive) continue
     const r = handleBallBlockCollision(ball,  block[i])
      if (r) { 
        block[i].alive = false
        return true 
      }
    }

    return false
  }
}

export function handleBallBlockCollision(ball: Ball, block: Brick): boolean {
  const closestX = GMath.clamp(ball.position.x, block.x, block.x + block.width)
  const closestY = GMath.clamp(ball.position.y, block.y, block.y + block.height)
  const dx = ball.position.x - closestX
  const dy = ball.position.y - closestY
  const distanceSquared = dx * dx + dy * dy

  if (distanceSquared > ball.radius * ball.radius) {
    return false
  }

  const blockCenterX = block.x + block.width / 2
  const blockCenterY = block.y + block.height / 2
  const cdx = ball.position.x - blockCenterX
  const cdy = ball.position.y - blockCenterY

  const combinedHalfWidth = block.width / 2 + ball.radius
  const combinedHalfHeight = block.height / 2 + ball.radius
  const overlapX = combinedHalfWidth - Math.abs(cdx)
  const overlapY = combinedHalfHeight - Math.abs(cdy)

  if (overlapX <= overlapY) {
    ball.velocity.x = -ball.velocity.x
    ball.position.x += cdx > 0 ? overlapX : -overlapX
  } else {
    ball.velocity.y = -ball.velocity.y
    ball.position.y += cdy > 0 ? overlapY : -overlapY
  }

  return true
}

export function findClosestCollision(ball: Ball, blocks: Brick[], checkCollision: (ball: Ball, block: Brick) => boolean): Brick | null {
  let closestBlock: Brick | null = null
  let closestDistSq = Infinity

  for (const block of blocks) {
    if (!block.alive) continue
    if (!checkCollision(ball, block)) continue

    const blockCenterX = block.x + block.width / 2
    const blockCenterY = block.y + block.height / 2
    const dx = ball.position.x - blockCenterX
    const dy = ball.position.y - blockCenterY
    const distSq = dx * dx + dy * dy

    if (distSq < closestDistSq) {
      closestDistSq = distSq
      closestBlock = block
    }
  }

  return closestBlock
}