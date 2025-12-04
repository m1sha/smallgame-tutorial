import { displayFps } from '../utils/display-fps'
import { Game, loadImage, gameloop, Rect } from 'smallgame'
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
  constructor (
    private setting: GameStationSettings,
    public width: number, 
    public height: number
  ) {
   
    this.gameRect = Rect.fromRatio(9 / 16, height * 0.9, 'height')
    this.gameRect.center = Rect.size(width, height).center

    
    

    if (DEFAULTGAMEINDEX > -1) {
      const factory = gameList.setGame(DEFAULTGAMEINDEX)
      this.currentScene = factory(this.gameRect.width, this.gameRect.height, DEFAULTGAMEINDEX)
    } else {
      this.currentScene =  new GameMenu(this.gameRect.width, this.gameRect.height, gameList.names)
    }

    this.effectPipeline = createEffectPipeline(this.gameRect.width, this.gameRect.height)
  }

  async create () {
    const { width, height, setting, bgColor, currentScene, effectPipeline } = this
    const { game, screen } = Game.create(width, height, setting.container)
    
    

    await currentScene.create()
    currentScene.onAction = (name, data) => this.callbackHandler(name, data)

    gameloop(() => {
      let surface = this.currentScene.nextFrame(game.event, game.key)

      if (setting.useShaders)
        surface = effectPipeline.build(surface)
     
      //if (setting.showTV)
        screen.fill('#242525ff')
      // else
      //   screen.clear()

      screen.blit(surface, this.gameRect)
      
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