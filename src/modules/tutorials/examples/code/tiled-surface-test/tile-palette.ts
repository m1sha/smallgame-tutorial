import { MemSurface, Point, Rect, Size, Sketch, Surface } from "smallgame"
import { DragPanels, DragPanel } from "../../../core"
import { SelectedData, TilesCursor } from "./tiles-cursor"
import { Array2D } from "../../../../../utils"


export class TilePalette {
  readonly panels: DragPanels
  private panel: DragPanel
  private surface: MemSurface
  private zoom = 1.9
  private startedIndex = -1
  private selecedRange = { start: -1, end: -1 }
  readonly cols: number
  readonly rows: number

  onTilesSelected: ((cursor: TilesCursor) => void) | null = null

  constructor (private img: Surface, private tileSize: Size, selfSize: Size, containerSize: Size) {
    this.surface = new MemSurface(img.rect.size)
    this.panels = new DragPanels(containerSize)
    this.panel = this.panels.add('Palette', new Rect(containerSize.width - (selfSize.width + 50), 50, selfSize.width, selfSize.height))
    this.panel.contentAlignment = 'top-left'
    this.panel.content = this.surface
    const { width: cols, height: rows } = this.img.rect.scalesize(1 / this.tileSize.width).size
    this.cols = cols
    this.rows = rows

    this.render()

    this.panels.onContentClick = (_, pos) => {
      const o = this.toLocalPos(pos)
      this.startedIndex = this.posToIndex(o)
      this.selecedRange = { start: this.startedIndex, end: -1}

      this.panel.needRemake = 'full'
      this.render()
    }

    this.panels.inputDelegate = (panel, ev) => {
      if (panel !== this.panel) return
      

      if (ev.type === 'MOUSEMOVE') {
        if (!panel.contentRect.containsPoint(ev.pos)) return

        if (this.startedIndex > -1 && ev.lbc) {
          const o = this.toLocalPos(ev.pos)
          const endIndex = this.posToIndex(o)
          if (this.startedIndex === endIndex) return
          this.selecedRange = { start: this.startedIndex, end: endIndex }
          this.render()
        }
      }

      if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
        if (!panel.contentRect.containsPoint(ev.pos)) return
        
        const sur = this.getSelectedSurface()
        const data = this.getSelectedData()
        this.onTilesSelected?.(new TilesCursor(this.selecedRange.start, this.selecedRange.end, sur, data))
        this.startedIndex = -1
      }
    }
  }

  draw (surface: Surface) {
    this.panels.draw(surface)
  }

  private render () {
    this.surface.clear()
    this.surface.blit(this.img, this.img.rect)
    this.drawGrid()
    this.surface.rect.set(this.img.rect.scalesize(this.zoom).moveSelf(8, 8))
  }

  private drawGrid () {
    const [si, sj, ei, ej] = this.sortSelection()
    const sketch = new Sketch()
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const rect = Rect.size(this.tileSize).moveSelf(new Point(j, i).scaleSelf(this.tileSize.toPoint()))
        sketch.rect({ stroke: '#4b4b4b' }, rect)
        
        if (this.selecedRange.end > -1) {
          if (i >= si && i <= ei &&  j >= sj  && j <= ej ) {
            sketch.rect({ fill: '#29dd747c' }, rect)
          }
        } else {
          if (si === i && sj == j) {
            sketch.rect({ fill: '#29dd747c' }, rect)
          }
        }
      }
    }
    sketch.draw(this.surface)
  }

  private posToIndex (pos: Point) {
    const dx = 0 | (pos.x / this.tileSize.width)
    const dy = 0 | (pos.y / this.tileSize.height)
    const cols = 0 | (this.img.rect.width /  this.tileSize.width)
    return dy * cols + dx
  }

  private indexToIJ (index: number, width: number) {
    const i = 0 | index / width
    const j = 0 | index % width
    return [i, j]
  }

  private toLocalPos (pos: Point) {
    return pos.shift(this.panel.contentRect.topLeft.neg()).shift(-8).scaleSelf(1 / this.zoom)
  }

  private sortSelection () {
    const [si, sj] = this.indexToIJ(this.startedIndex, this.cols)
    if (this.selecedRange.end < 0) {
      return [si, sj, si, sj]  
    }
    const [ei, ej] = this.indexToIJ(this.selecedRange.end, this.cols)
    const _si = Math.min(si, ei)
    const _ei = Math.max(si, ei)
    const _sj = Math.min(sj, ej)
    const _ej = Math.max(sj, ej)
    return [_si, _sj, _ei, _ej]
  }

  private getSelectedSurface () {
    if (this.selecedRange.end < 0) {
      const [si, sj] = this.indexToIJ(this.startedIndex, this.cols)
      const rect = Rect.size(this.tileSize).moveSelf(new Point(sj, si).scaleSelf(this.tileSize.toPoint()))
      return this.img.clip(rect)
    }
    
    const [si, sj, ei, ej] = this.sortSelection()
    const { width, height } = this.tileSize.scale(ej - sj + 1, ei - si + 1)
    const { x, y } = new Point(sj, si).scaleSelf(this.tileSize.toPoint())
    const rect = new Rect(x, y, width, height)
    
    if (si < 0 || sj < 0 || ei < 0 || ej < 0) return Surface.default
    return this.img.clip(rect)
  }

  private getSelectedData (): SelectedData {
    if (this.selecedRange.end < 0) {
      return {
        data: [this.startedIndex],
        rows: 1,
        cols: 1
      }
    }

    const [si, sj, ei, ej] = this.sortSelection()
    const cols = ej - sj
    const rows = ei - si
    const data: number[] = []

    for (let i = si; i < ei + 1; i++)
      for (let j = sj; j < ej + 1; j++)
        data.push(Array2D.toIndex(i, j, this.cols))
    
    return {
      cols,
      rows,
      data
    }
  }
}
