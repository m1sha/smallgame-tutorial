import { Point, Rect, Size, SurfaceBase } from "smallgame"


export type DragPanelOptions = { 
  useSmooth?: boolean 
  resizable?: boolean
  viewportRect?: Rect
}

export class DragPanel {
  headerHeight = 28
  borderColor = '#282828'
  headerBgColor = '#282828'
  headerTextColor = '#aaa'
  contentBgColor =  '#353535'
  pos: Point
  private prePos: Point
  private preSize: Size
  size: Size
  active: boolean = false
  resizable: boolean = false
  canDoResizing: boolean = false
  private contentSurface: SurfaceBase | null = null
  useSmooth: boolean
  
  needRemake: 'none' | 'full' | 'content' | 'header' = 'full'
  
  
  constructor (readonly caption: string, size: Size | Rect, options?: DragPanelOptions) {
    this.size = size instanceof Rect ? size.size : size
    this.pos = size instanceof Rect ? size.topLeft : Point.zero
    this.prePos = this.pos.dup()
    this.preSize = this.size.dup()
    this.resizable = options ? options.resizable : false
    this.useSmooth = options ? options.useSmooth : true
  }

  contentAlignment: 'top-left' | 'fit' = 'fit'

  get content () {
    return this.contentSurface
  }

  set content (value: SurfaceBase | null) {
    this.contentSurface = value
    if (this.needRemake !== 'full') this.needRemake = 'content'
  }

  move (shift: Point) {
    this.prePos = this.pos.dup()
    this.pos.shiftSelf(shift)
    this.needRemake = 'full'
  }

  resize (size: Size) {
    if (size.width < 200 || size.height < 200) return 
    this.preSize = this.size
    this.size = size
    this.needRemake = 'full'
  }

  get oldfullRect () {
    return new Rect(this.prePos.x, this.prePos.y, this.preSize.width, this.preSize.height)
  }

  get fullRect () {
    return new Rect(this.pos.x, this.pos.y, this.size.width, this.size.height)
  }

  get contentRect () {
    return new Rect(this.pos.x + 4, this.pos.y +this.headerHeight, this.size.width - 8, this.size.height - this.headerHeight-6) 
  }

  get headerRect () {
    return new Rect(this.pos.x + 4, this.pos.y, this.size.width-8, this.headerHeight - 2)
  }
}