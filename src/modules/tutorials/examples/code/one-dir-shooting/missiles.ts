import { Group, loadImage, Point, Surface } from "smallgame"
import { Missile } from "./missile"

export class Missiles extends Group<Missile> {
  private img1: Surface | null = null
  private img2: Surface | null = null

  type = 1
  speed = 1.1
  missilePerShoot = 1
  
  async create () {
    this.img1 = await loadImage('space-fighter/Missiles/Missile_1.png')
    this.img2 = await loadImage('space-fighter/Missiles/Missile_3.png')
  }

  private get img () {
    if (this.type === 1) return this.img1
    return this.img2
  }

  addMissile(point: Point) {
    if (!this.img) return 

    if (this.missilePerShoot === 1 || this.missilePerShoot === 3) {
      const missile0 = new Missile(point, this.img.clone(), this.speed)
      this.add(missile0)
    }

    if (this.missilePerShoot === 2 || this.missilePerShoot === 3) {
      const missile1 = new Missile(point.shiftX(-15), this.img.clone(), this.speed)
      const missile2 = new Missile(point.shiftX(15), this.img.clone(), this.speed)
      this.add(missile1)
      this.add(missile2)
    }
  }
}