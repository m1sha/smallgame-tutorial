import { GameEvents, Key, Rect, Sketch, Surface, TTextStyle, Text } from "smallgame"

export type MenuItemSelectedCallback = (index: number ) => void

export type MenuSettings = { x: number, y: number, width: number, height: number }

export class BaseMenu {
  private index: number = 0
  private surface: Surface
  onSelect: MenuItemSelectedCallback | null = null
  private cursor: Surface
  
  constructor (private items: string[], private settings: MenuSettings) {
    this.surface = new Surface(settings.width, settings.height)
    
    const sketch = new Sketch()
    sketch.rect({ fill: '#aaa' }, new Rect(this.settings.x - 20, this.settings.y, 18, 18))
    this.cursor = sketch.toSurface()
  }

  create () {
    const fontStyle: TTextStyle = { color: '#fefefe', fontSize: '24px', outlineColor: '#666', outlineWidth: 3, paintOrder: 'stroke' }
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      const text = new Text(item, fontStyle)
      text.pos = { x: this.settings.x, y: this.settings.y + i * 30 }
      text.draw(this.surface)
    }
    
  }

  draw (surface: Surface) {
    surface.blit(this.surface, this.surface.rect)
    const rect = this.cursor.rect.clone()
    rect.shiftSelf(0, this.index * 30)
    surface.blit(this.cursor, rect)
  }

  input (events: GameEvents) {
    for (const event of events.get()) {
      if (event.type === 'KEYDOWN') {
        if (event.key === Key.DOWN) {
          this.index ++
          if (this.index > this.items.length - 1) this.index = 0
        }
        if (event.key === Key.UP) {
          this.index --
          if (this.index < 0) this.index = this.items.length - 1
        }
        if ([Key.SPACE, Key.RETURN].includes(event.key)) {
          if (this.onSelect) this.onSelect(this.index)
        }
      }
    }
  }
}