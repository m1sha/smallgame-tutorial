import { MemSurface, Point, Rect, Size, Sketch, Surface } from "smallgame"
import { DragPanel } from "./drag-panel"

export class PanelRenderer {
  readonly surface: MemSurface
  private readonly screen: MemSurface
  private readonly activeSurface: MemSurface

  constructor (private panels: DragPanel[], private sender: { selected: DragPanel | null, needRedraw: boolean, setRedrawed: () => void }, viewportSize: Size) {
    this.surface = new MemSurface(viewportSize)
    this.activeSurface = new MemSurface(viewportSize)
    this.screen = new MemSurface(viewportSize)
  }

  render () {
    if (this.sender.needRedraw) {
    this.screen.clear()
    for (const panel of this.panels) {
      if (this.sender.selected === panel) {
        continue
      }
      
      this.drawPanel(panel, this.screen)
      panel.needRemake = 'none'
    }
    this.sender.setRedrawed()
   }

    const selected = this.sender.selected
    if (selected) {
      this.activeSurface.clear()
      this.drawPanel(selected, this.activeSurface)
      selected.needRemake = 'none'
    }

    this.surface.clear()
    this.surface.blit(this.screen, this.screen.rect)
    this.surface.blit(this.activeSurface, this.activeSurface.rect)
  }

  private drawPanel (panel: DragPanel, surface: Surface) {
    this.drawWindow(panel, surface)
    this.blit(panel, surface)
  }

  private drawWindow (panel: DragPanel, surface: Surface) {
    const br = panel.fullRect.bottomRight.shift(-2, -2)
    Sketch.new()
      .roundedrect({ fill: panel.borderColor }, panel.fullRect, 4)
      .rect({ fill: panel.active ? '#2b2b2b' : panel.headerBgColor }, panel.headerRect)
      .rect({ fill: panel.contentBgColor }, panel.contentRect)
      .polygon({ fill: panel.resizable ? panel.borderColor : 'transparent' }, [br.shiftX(-16), br, br.shiftY(-16), br.shiftX(-16)])
      .text({ color: panel.headerTextColor, fontSize: '14px' }, panel.caption, panel.headerRect.shift(8, 4))
      .draw(surface)
    
  }

  private blit (panel: DragPanel, surface: Surface) {
    const rect = Rect.scaleToFit(panel.content, panel.contentRect.outline(2, 0, 8, 2))
    rect.absCenter = panel.contentRect.absCenter
    Sketch.new().rect({ fill: panel.contentBgColor }, panel.contentRect).draw(surface)
    surface.blit(panel.content, panel.contentAlignment === 'fit' ? rect : panel.content.rect.shift(panel.contentRect))
    const br = panel.fullRect.bottomRight.shift(-2, -2)
    Sketch.new()
      .polygon({ fill: panel.resizable ? panel.borderColor : 'transparent' }, [br.shiftX(-16), br, br.shiftY(-16), br.shiftX(-16)])
      .draw(surface)
  }


}