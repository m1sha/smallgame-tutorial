import { displayFps } from '../utils/display-fps'
import { Game, loadImage, gameloop, Rect, Screen } from 'smallgame'
import { EffectPipeline } from './effects/base/effect-pipeline'
import { GameStationSettings } from './game-station-settings'
import { createEffectPipeline } from './effects'
import { IScene } from '../games/scene'
import { GameCover, GameOver, GameMenu } from '../games/ui'
import gameList from './games/game-list'

/** @define */ const DEFAULTGAMEINDEX = -1

export class GameStation {
  private bgColor = "#333"
  private currentScene: IScene
  private gameRect: Rect
  private effectPipeline: EffectPipeline

  constructor (private setting: GameStationSettings) {
    this.gameRect = Rect.fromRatio(9 / 16, setting.containerSize.height * 0.9, 'height')
    this.gameRect.center = Rect.size(setting.containerSize.width, setting.containerSize.height).center

    if (DEFAULTGAMEINDEX > -1) {
      const factory = gameList.setGame(DEFAULTGAMEINDEX)
      this.currentScene = factory(this.gameRect.width, this.gameRect.height, DEFAULTGAMEINDEX)
    } else {
      this.currentScene =  new GameMenu(this.gameRect.width, this.gameRect.height, gameList.names)
    }

    this.effectPipeline = createEffectPipeline(this.gameRect.width, this.gameRect.height)
  }

  async create () {
    const { setting, bgColor, currentScene, effectPipeline } = this
    const screen = new Screen('transform', setting.containerSize.width, setting.containerSize.height)
    screen.attachContrainer(setting.container)
    const bus = screen.createEventBusController()

    await currentScene.create()
    currentScene.onAction = (name, data) => this.callbackHandler(name, data)

    let prevSurface = this.currentScene.nextFrame(bus.event, bus.key)

    gameloop(() => {
      let surface = this.currentScene.nextFrame(bus.event, bus.key)

      if (setting.useShaders)
        surface = effectPipeline.build(surface, prevSurface)
     
      //if (setting.showTV)
        screen.fill('#242525ff')
      // else
      //   screen.clear()

      screen.blit(surface, this.gameRect)

      prevSurface = surface
      
      // if (setting.showTV)
      //   screen.blit(tvLayout, tvLayout.rect)
      displayFps(setting.fps)
    })
  }

  private async callbackHandler (name: string, data: any) {
    if (name === 'select-game') {
      const bg = gameList.getCoverBg(data.index)
      this.currentScene = new GameCover(this.gameRect.width, this.gameRect.height, bg, data.index)
    }

    if (name === 'start') { 
      const factory = gameList.setGame(data.index)
      this.currentScene = factory(this.gameRect.width, this.gameRect.height, data.index)
    }

    if (name === 'exit') {
      this.currentScene =  new GameMenu(this.gameRect.width, this.gameRect.height, gameList.names)
    }

    if (name === 'gameover') {
      const bg = gameList.getGameoverBg(data.index)
      this.currentScene = new GameOver(this.gameRect.width, this.gameRect.height, bg, data.index)
    }

    this.currentScene.create()
    this.currentScene.onAction = (name, data) => this.callbackHandler(name, data)
  }
}