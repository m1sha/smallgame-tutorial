import { MemSurface, Point, Rect, Size, Sketch, Surface } from "smallgame"
import { DragPanels, DragPanel } from "../../../core"

export class TilePalette {
  readonly panels: DragPanels
  private panel: DragPanel
  private surface: MemSurface
  private zoom = 1.9

  private startedIndex = -1
  private selecedRange = { start: -1, end: -1 }

  onTilesSelected: ((start: number, end: number) => void) | null = null

  constructor (private img: Surface, private tileSize: Size, selfSize: Size, containerSize: Size) {
    this.surface = new MemSurface(img.rect.size)
    this.panels = new DragPanels(containerSize)
    this.panel = this.panels.add('Palette', new Rect(containerSize.width - (selfSize.width + 50), 50, selfSize.width, selfSize.height))
    this.panel.contentAlignment = 'top-left'
    this.panel.content = this.surface

    this.render()

    this.panels.onContentClick = (_, pos) => {
      const o = this.toLocalPos(pos)
      console.log(`${o.x} ${o.y}`)
      this.startedIndex = this.posToIndex(o)
      this.selecedRange = { start: this.startedIndex, end: -1}

      this.panel.needRemake = 'full'
      this.render()
    }
    this.panels.inputDelegate = (panel, ev) => {
      if (panel !== this.panel) return

      if (ev.type === 'MOUSEMOVE') {
        if (this.startedIndex > -1 && ev.lbc) {
          const o = this.toLocalPos(ev.pos)
          const endIndex = this.posToIndex(o)
          this.selecedRange = { start: Math.min(this.startedIndex, endIndex), end: Math.max(this.startedIndex, endIndex) }
          this.render()

          console.log(`${this.startedIndex} ${endIndex}`)
        }
      }

      if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
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
    
    const fieldsize = this.img.rect.scalesize(1/this.tileSize.width).size

    const si = 0 | this.startedIndex / fieldsize.width
    const sj = 0 | this.startedIndex % fieldsize.width
    const ei = 0 | this.selecedRange.end / fieldsize.width
    const ej = 0 | this.selecedRange.end % fieldsize.width
    
    const _si = Math.min(si, ei)
    const _ei = Math.max(si, ei)
    const _sj = Math.min(sj, ej)
    const _ej = Math.max(sj, ej)

    const sketch = new Sketch()
    for (let i = 0; i < fieldsize.height; i++) {
      for (let j = 0; j < fieldsize.width; j++) {
        sketch.rect({ stroke: '#4b4b4b' }, Rect.size(this.tileSize).moveSelf(new Point(j, i).scaleSelf(this.tileSize.toPoint())))

        
        if (si === i && sj == j) {
          sketch.rect({ fill: '#00923d7c' }, Rect.size(this.tileSize).moveSelf(new Point(j, i).scaleSelf(this.tileSize.toPoint())))
        }

        if (i >= _si && i <= _ei &&  j >= _sj  && j <= _ej ) {
          sketch.rect({ fill: '#1bbd5f7c' }, Rect.size(this.tileSize).moveSelf(new Point(j, i).scaleSelf(this.tileSize.toPoint())))
        }
      }
    }
    sketch.draw(this.surface)

    this.surface.rect.set(this.img.rect.scalesize(this.zoom).moveSelf(8, 8))
  }

  private posToIndex (pos: Point) {
    const dx = 0 | (pos.x / this.tileSize.width)
    const dy = 0 | (pos.y / this.tileSize.height)
    const cols = 0 | (this.img.rect.width /  this.tileSize.width)
    return dy * cols + dx
  }

  private toLocalPos (pos: Point) {
    return pos.shift(this.panel.contentRect.topLeft.neg()).shift(-8).scaleSelf(1 / this.zoom)
  }
}
