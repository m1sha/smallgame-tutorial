import { Group, TSize } from "smallgame"
import { Asteroid } from "./asteroid"
import { setDebounce } from "smallgame/src/time"
import { AsteroidSettings } from "./asteroid-setting"

export class Asteroids extends Group<Asteroid> {
  private triggers: (() => void)[] = []
  constructor (private screenSize: TSize, asteroidsSettings: AsteroidSettings[]) {
    super()

    asteroidsSettings.forEach((settings, index) => this.triggers.push( setDebounce(() => this.generate(settings, index + 1), settings.genTime)))

   

    
  }

  async generate ({ speed, angularSpeed, maxCount }: AsteroidSettings, num: number) {
    if (this.sprites.filter(s => s.num === num).length >= maxCount) return
    const ast = new Asteroid(num)
    await ast.create()
    ast.rect.y = -100
    ast.rect.x = Math.random() * 600 + 600

    ast.speed = speed
    ast.angularSpeed = angularSpeed
    ast.current = 0 | Math.random() * 360

    this.add(ast)
  }

  protected update(): void {
    this.triggers.forEach(p => p())

    for (const s of this.sprites)
      if (s.rect.y > this.screenSize.height)
        this.remove(s)
  }

  removeAll () {
    for (const s of this.sprites) {
      this.remove(s)
    }
  }
}