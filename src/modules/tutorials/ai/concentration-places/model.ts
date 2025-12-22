import { Point, rad, Random, Rect, setSize, Size, Surface, TSize } from "smallgame"
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
      const sat = 0 | Math.random()*40 + 20
      const colorF = `hsl(${hue}, 4%, ${sat}%)`
      const colorS = `hsl(${hue}, 0%, ${sat}%)`
      const botColor = `hsl(${hue}, 5%, ${sat}%)`
      const concentrationPoint = new ConcentrationPoint(colorF, colorS, botColor, new Size(this.screenSize).scaleSelf(0.5).toPoint())
      //const sc = new Point(this.screenSize.width / 2 + Math.random() * 500 - 500, this.screenSize.height / 2 + Math.random() * 500 - 500)
    
      //const pp = new PolarPoint(150, Math.PI / 6, sc)
      //concentrationPoint.setPosition(pp)

      this.concentrationPoints.push(concentrationPoint)
    }

    this.createConcentrationPoints()

    for (let j = 0; j < this.settings.concentrationPoints; j++) {
      const { position, botColor } = this.concentrationPoints[j]

      this.createBots(botColor, position)
    }
    
  }

  update () {
    this.surface.clear()
    this.bots.draw(this.surface)
    //this.concentrationPoints.forEach(p => p.draw(this.surface))
  }

  private createConcentrationPoints () {
    const rect = Rect.size(this.surface.rect).scaleSelf(0.5, 0.3)
    rect.x = this.surface.rect.width / 4
    rect.y = this.surface.rect.height / 3
    Random.uniformRandomScatter(rect, this.concentrationPoints)
  }

  private createBots (colorF2: string, goal: PolarPoint) {
    for (let i = 0; i < this.settings.avgBotsPerPoint; i++) {
        const r = Math.random() * 450 + 150
        const ppb = new PolarPoint(r, rad(Math.random() * 360),  goal.point)
        const bot = new Bot(colorF2)
        bot.setStartPosition(ppb) 
        bot.setGoalPosition(goal) 
        this.bots.add(bot)
    }
  }
}