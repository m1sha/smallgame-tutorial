import { Point, rad, setSize, Surface, TSize } from "smallgame"
import { Bots } from "./bots"
import { Bot } from "./bot"
import { ConcentrationPoint } from "./concentration-point"
import { ModelSettings } from "./model-settings"
import { PolarPoint } from "./polar"
import { SeparateGrid } from "./speratate-grid"

export class Model {
  private bots: Bots
  private concentrationPoints: ConcentrationPoint[]
  readonly surface: Surface
  readonly settings: ModelSettings

  t = 0

  constructor (private screenSize: TSize) {
    this.surface = new Surface(screenSize.width, screenSize.height)
    this.settings = new ModelSettings()

    this.concentrationPoints = []
    this.bots = new Bots(this, new SeparateGrid(setSize(screenSize.width * 2, screenSize.height), 20, 40))
  }

  create () {

    for (let j = 0; j < this.settings.concentrationPoints; j++) {
      const hue = 0 | Math.random()*360
      const colorF = `hsl(${hue}, 50%, 40%)`
      const colorS = `hsl(${hue}, 10%, 40%)`
      const colorF2 = `hsl(${hue}, 30%, 50%)`
      const concentrationPoint = new ConcentrationPoint(colorF, colorS)
      const sc = new Point(this.screenSize.width / 2 + Math.random() * 500 - 500, this.screenSize.height / 2 + Math.random() * 500 - 500)
    
      const pp = new PolarPoint(150, Math.PI / 6, sc)
      concentrationPoint.setPosition(pp)
    

      for (let i = 0; i < this.settings.avgBotsPerPoint; i++) {
        const r = Math.random() * 450 + 150
        const ppb = new PolarPoint(r, rad(Math.random() * 360),  pp.point)
        const bot = new Bot(colorF2)
        bot.setStartPosition(ppb) 
        bot.setGoalPosition(pp) 
        this.bots.add(bot)
      }

      this.concentrationPoints.push(concentrationPoint)
    }
  }

  update () {
    this.surface.clear()
    this.bots.draw(this.surface)
    this.concentrationPoints.forEach(p => p.draw(this.surface))
  }
}