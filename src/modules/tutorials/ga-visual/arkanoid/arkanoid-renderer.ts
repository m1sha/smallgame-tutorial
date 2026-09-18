import { MemSurface, Rect, Size, Sketch } from "smallgame"
import { Arkanoid } from "../../../games/v2"

export class ArkanoidRenderer {
  image: MemSurface
  bgSurface: MemSurface
  ballSurface: MemSurface
  carretSurface: MemSurface

  constructor (worldSize: Size) {
    this.image =  new  MemSurface(worldSize)
    this.bgSurface =  new  MemSurface(worldSize)
    this.ballSurface = new MemSurface(worldSize)
    this.carretSurface = new MemSurface(worldSize)
  }

  drawBgSurface (arkanoid: Arkanoid)  {
    const sketch = new Sketch()
    sketch.rect({ fill: '#2c2c2c '}, Rect.size(arkanoid.def.worldSize))
    for (const brick of arkanoid.brickMap.bricks) {
      if (!brick.alive) continue
      sketch.rect({ fill: '#423c37', stroke: '#777'}, Rect.size(brick.size).moveSelf(brick.position))
    }
    this.bgSurface.clear()
    sketch.draw(this.bgSurface)
  }

  drawBall (arkanoid: Arkanoid)  {
    const pos = arkanoid.ball.position
    const radius = arkanoid.ball.radius
    const sketch = new Sketch()
    sketch.circle({ fill: '#888' }, pos, radius)
    this.ballSurface.clear()
    sketch.draw(this.ballSurface)
  }

  drawCarret (arkanoid: Arkanoid)  {
    const pos = arkanoid.carrent.position
    const size = arkanoid.carrent.size
    const sketch = new Sketch()
    sketch.roundedrect({ fill: '#656565' }, Rect.size(size).moveSelf(pos), 8)
    this.carretSurface.clear()
    sketch.draw(this.carretSurface)
  }

  render (arkanoid: Arkanoid) {
    this.drawBgSurface(arkanoid)
    this.drawBall(arkanoid)
    this.drawCarret(arkanoid)

    this.image.blit(this.bgSurface, this.bgSurface.rect)
    this.image.blit(this.ballSurface, this.ballSurface.rect)
    this.image.blit(this.carretSurface, this.carretSurface.rect)
  }
  
}