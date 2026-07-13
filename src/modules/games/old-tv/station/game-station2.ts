import { GameStationSettings } from "./game-station-settings"
import { EventController, gameloop, killgameloop, MemSurface, Rect, Screen, Surface, SurfaceBase } from 'smallgame'

import gameStore from '../games/game-list'
import { GameApp } from "./base"
import { displayFps } from "../utils"
import { EffectPipeline } from "../old-tv/effects/base/effect-pipeline"
import { createEffectPipeline } from "../old-tv/effects"
import { IGameStationParameters } from "./parameters"

export class GameStation2 {
  private gameloopId: number = 0
  private game: GameApp | null = null
  private bus: EventController | null = null
  private screen: Screen
  private effectPipeline: EffectPipeline
  
  constructor (private setting: GameStationSettings, private parameters: IGameStationParameters) {
    this.effectPipeline = createEffectPipeline(setting.containerSize.width, setting.containerSize.height)
  }

  async changeGame (index: number) {
    this.game = gameStore[index].create(this.bus, this.screen.rect.size)
    await this.game.scene.create()
  }

  get currentGame () { return this.game  }

  async create () {
    const { container, containerSize } = this.setting
    this.screen = new Screen('transform', containerSize.width, containerSize.height)
    
    this.screen.attachContrainer(container)
    this.bus = this.screen.createEventBusController()
    
    const screen = this.screen
    let surface: SurfaceBase = new MemSurface(screen.rect.size)
    let prevSurface = surface
    
    this.gameloopId = gameloop(() => {
      if (this.game && this.game.loaded) {
        this.game.update()
        surface = this.drawFrame(this.screen.rect)
      }

      if (this.parameters.useShaders) {
        surface = this.effectPipeline.build(this.game.frame, prevSurface)
      }
      
      screen.blit(surface, surface.rect)
      prevSurface = surface
      displayFps(this.setting.fps)
    })
  }

  remove () {
    killgameloop(this.gameloopId)
  }

  private drawFrame (rect: Rect) {
    const surface = new MemSurface(rect.size)
    const frame = this.game.frame
    const previewRect = Rect.scaleToFit(frame.rect, surface.rect)
    previewRect.absCenter = surface.rect.absCenter
    surface.imageRendering = 'pixelated'
    surface.blit(frame, previewRect)
    return surface
  }
}