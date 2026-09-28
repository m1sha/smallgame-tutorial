import { Point, Size } from "smallgame"
import { uid } from "../../../../editors/polygon-editor/code/utils/uid"
import { Pilot } from "./pilot"

export class Enemy {
  id = uid()
  constructor( 
    public position: Point,
    public velocity: Point,
    public speed: number,
    public radius: number,
    public color: string,
  ) {}
}

export function createEnemies (size: Size, count: number, pilot: Pilot, random: () => number): Enemies  {
  const result: Enemy[] = []
  const eR = size.width * .05
  for (let i =0; i< count; i++ ) {
    const posX = (random() * (size.width - eR * 4) + eR* 2)
    const posY = (random() * (size.height - eR* 4) + eR* 2)
    const velocityX = random() * 2 - 1
    const velocityY = random() * 2 - 1
    const min = 0.5
    result.push(new Enemy(
      new Point(posX, posY),
      new Point(velocityX, velocityY),
      min,
      eR,
      '#ddd'
    ))
  }
  return new Enemies(result, size, pilot)
}

export class Enemies {
  constructor (readonly items: Enemy[], private size: Size, private pilot: Pilot) {

  }

  enemiesMoving = (gameoverCallBack: () => void) => {
    for (const enemy of this.items) {
      const newPosition = enemy.position.shift(enemy.velocity.scale(enemy.speed))
      const enemyHalfRadius = enemy.radius / 2 + 4
      if (newPosition.x < enemyHalfRadius || newPosition.x > this.size.width - enemyHalfRadius) {
        enemy.velocity.x = -enemy.velocity.x
      } 
      if (newPosition.y < enemyHalfRadius || newPosition.y > this.size.height - enemyHalfRadius) {
        enemy.velocity.y = -enemy.velocity.y
      } 
      enemy.position.shiftSelf(enemy.velocity.scale(enemy.speed))
    }

    const checked = new Set<string>() 
    for (const enemyA of this.items) {
      for (const enemyB of this.items) {
        if (enemyA.id === enemyB.id) continue
        if (checked.has(enemyA.id) || checked.has(enemyB.id)) continue
        const hit = enemyA.position.distance(enemyB.position) < enemyA.radius + enemyB.radius
        if (!hit) continue
        
        enemyA.velocity.x = -enemyA.velocity.x
        enemyA.velocity.y = -enemyA.velocity.y
        enemyB.velocity.x = -enemyB.velocity.x
        enemyB.velocity.y = -enemyB.velocity.y
        checked.add(enemyA.id)
        checked.add(enemyB.id)
      }
    }

    
    for (const enemy of this.items) {
      const checked = enemy.position.distance(this.pilot.position) < this.pilot.radius + enemy.radius
      if (checked) {
        gameoverCallBack()
        break
      }
    }

  }

  increeseSpeed() {
    for (const enemy of this.items) {
      enemy.speed += 0.1
    }
  }
}

