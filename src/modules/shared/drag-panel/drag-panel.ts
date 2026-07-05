import { GameEvent, Keys, MemSurface, Point, Rect, Size, Sketch, Surface, SurfaceBase } from "smallgame"
import { IInputDelegate } from "../viewer/input-delegate"

export type DragPanelOptions = { 
  useSmooth?: boolean 
  resizable?: boolean
  viewportRect?: Rect
}

export class DragPanel implements IInputDelegate {
  private headerHeight = 28
  private borderColor = '#222'
  private headerBgColor = '#272727'
  private headerTextColor = '#999'
  private contentBgColor =  '#2e2e2e'
  private surface: Surface
  private pos: Point
  private size: Size
  private active: boolean = false
  private resizable: boolean = false
  private canDoResizing: boolean = false
  private contentSurface: SurfaceBase | null = null
  private useSmooth: boolean
  onSelect: ((panel: DragPanel) => void) | null = null
  
  constructor (readonly caption: string, size: Size | Rect, options?: DragPanelOptions) {
    
    this.size = size instanceof Rect ? size.size : size
    this.pos = size instanceof Rect ? size.topLeft : Point.zero
    this.resizable = options ? options.resizable : false
    this.useSmooth = options ? options.useSmooth : true
    
   this.drawWindow()
  }

  get content () {
    return this.contentSurface
  }

  set content (value: SurfaceBase | null) {
    this.contentSurface = value
    if (this.contentSurface)
    this.blit(this.contentSurface)
  }

  input (ev: GameEvent, owner: { cursor: string }) {
    owner.cursor = 'default'
    const rect = this.surface.rect
    const br = rect.bottomRight

    if (ev.type === 'MOUSEDOWN') {
      if (br.inRadius(ev.pos, 10) && this.resizable) {
        this.canDoResizing = true
        this.onSelect?.(this)
      }

      this.active = this.headerRect.shift(rect).containsPoint(ev.pos)
      if (this.active) this.onSelect?.(this)
    }

    if (ev.type === 'MOUSEMOVE') {
      if (br.inRadius(ev.pos, 10)  && this.resizable) {
        owner.cursor = 'se-resize'
      }

      if (ev.lbc && this.active) {
        rect.shiftSelf(ev.shift)
      }

      if (ev.lbc && this.canDoResizing) {
        this.resize(this.size.expand(ev.shift))
      }
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.active = false
      this.canDoResizing = false
    }
  }

  keyPressed (_: Keys) {}

  draw (surface: Surface) {
    surface.blit(this.surface, this.surface.rect)
  }

  resize (size: Size) {
    if (size.width < 200 || size.height < 200) return
    this.size = size
    this.drawWindow()
    this.blit(this.content)
  }

  private blit (surface: SurfaceBase) {
    const rect = Rect.scaleToFit(surface, this.contentRect.outline(0, 0, 8, 2))
    rect.center = this.surface.rect.center.shift(-2, -2)
    Sketch.new().rect({ fill: this.contentBgColor }, this.contentRect).draw(this.surface)
    this.surface.blit(surface, rect)
    const br = this.size.toPoint().shiftSelf(-2, -2)
    Sketch.new()
      .polygon({ fill: this.resizable ? this.borderColor : 'transparent' }, [br.shiftX(-16), br, br.shiftY(-16), br.shiftX(-16)])
      .draw(this.surface)
  }

  private drawWindow () {
    this.surface = new MemSurface(this.size, { useSmooth: this.useSmooth })
    this.surface.rect.moveSelf(this.pos)
    const br = this.size.toPoint().shiftSelf(-2, -2)
    Sketch.new()
      .roundedrect({ fill: this.borderColor }, this.fullRect, 4)
      .rect({ fill: this.headerBgColor }, this.headerRect)
      .rect({ fill: this.contentBgColor }, this.contentRect)
      .polygon({ fill: this.resizable ? this.borderColor : 'transparent' }, [br.shiftX(-16), br, br.shiftY(-16), br.shiftX(-16)])
      .text({ color: this.headerTextColor, fontSize: '16px' }, this.caption, new Point(8, 4))
      .draw(this.surface)
  }

  private get fullRect () {
    return new Rect(0, 0, this.size.width, this.size.height)
  }

  private get contentRect () {
    return new Rect(4, this.headerHeight, this.size.width - 8, this.size.height - this.headerHeight-6) 
  }

  private get headerRect () {
    return new Rect(4, 0, this.size.width-8, this.headerHeight - 2)
  }
}