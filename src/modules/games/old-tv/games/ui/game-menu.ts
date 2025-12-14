import { GameEvents, Keys, Surface, Text, loadImage, Key, TTextStyle, SurfaceBase } from "smallgame"
import { CallbackAction, IScene } from "../scene"

export class GameMenu implements IScene {
  private screen: Surface
  private surface: Surface
  private select: Surface | null
  private index: number = 0
  private readonly menuY: number
  private readonly menuX: number
  private readonly menuItemH = 30
  
  onAction: CallbackAction | null = null
 
  constructor (private width: number, private height: number, private gameNames: string[]) {
    this.screen = new Surface(width, height)
    this.surface = new Surface(width, height)
    this.select = null
    this.menuX = width / 3
    this.menuY = height / 3
  }

  async create(): Promise<void> {
    const { width, height } = this
    const bg = await loadImage('old-tv/menu_bg.png')
    
    bg.resizeSelf(width, height)
    this.select = await loadImage('old-tv/menu_select.png')
    
    
    this.surface.blit(bg, bg.rect)

    const menuStyle: TTextStyle = { color: '#fdfdfd', outlineColor: '#333', outlineWidth: 4, paintOrder: 'stroke', fontSize: this.height / 18 +'px', fontName: 'courier', bold: '600' }
    const itemsStyle: TTextStyle = { color: '#fdfdfd', outlineColor: '#333', outlineWidth: 4, paintOrder: 'stroke', fontSize: this.height / 20 +'px', fontName: 'courier' }
    const menuTitle = new Text(`${this.gameNames.length} IN 1`,  menuStyle)
    menuTitle.pos = { x: this.menuX, y: this.menuY }
    menuTitle.draw(this.surface)
    
    
    for (let i = 0; i < this.gameNames.length; i++) {
      const name = this.gameNames[i]
      const y = this.menuY + this.menuItemH + (this.menuItemH * (i *  this.height / 500) + this.height / 20)
      const menuItem = new Text(name, itemsStyle)
      menuItem.pos = { x: this.menuX, y }
      menuItem.draw(this.surface)  
    }
  }

  nextFrame(events: GameEvents, _: Keys): SurfaceBase {
    for (const event of events.get()) {
      if (event.type === 'KEYDOWN') {
        if (event.key === Key.DOWN) {
          this.index ++
          if (this.index > this.gameNames.length - 1) this.index = 0
        }

        if (event.key === Key.UP) {
          this.index --
          if (this.index < 0) this.index = this.gameNames.length - 1
        }

        if ([Key.SPACE, Key.RETURN].includes(event.key)) {
          if (this.onAction) this.onAction('select-game', { index: this.index })
        }
      }
    }

    this.screen.blit(this.surface, this.surface.rect)

    if (this.select) {
      const y = this.menuY + this.menuItemH - 5  + (this.menuItemH * this.index * this.height / 500)  + this.height / 20
      this.screen.blit(this.select, this.select.rect.move(this.menuX - 115, y))  
    }

    return this.screen
  }
}