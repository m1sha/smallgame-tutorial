import { Sketch, Surface } from "smallgame"
import { Enemies } from "../crazy-pilot/enemy"
import { Pilot } from "../crazy-pilot/pilot"

export class Renderer {
  constructor (private pilot: Pilot, private enemies: Enemies) {

  }

  render (surface: Surface) {
    this.drawPilot(surface)
    this.drawEnemies(surface)
  }

  drawPilot (surface: Surface) {
    new Sketch()
      .circle({ fill: '#811' }, this.pilot.position, this.pilot.radius)
      .draw(surface)
  }

  drawEnemies (surface: Surface) {
    const sketch = new Sketch()
    for (const enemy of this.enemies.items) {
      sketch.circle({ fill: enemy.color }, enemy.position, enemy.radius)
    }
    sketch.draw(surface)
  }
}