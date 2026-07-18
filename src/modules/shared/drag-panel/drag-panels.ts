import { GameEvent, Keys, Rect, Size, Surface } from "smallgame";
import { IInputDelegate } from "../viewer/input-delegate";
import { DragPanel, DragPanelOptions } from "./drag-panel";
import { removeItem } from "smallgame/src/utils";
import { PanelRenderer } from "./panel-renderer";

export class DragPanels implements IInputDelegate {
  private panels: DragPanel[] = []
  private renderer: PanelRenderer
  selected: DragPanel | null = null
  onSelect: ((panel: DragPanel) => void) | null = null
  needRedraw = true

  constructor (viewportSize: Size) {
    this.renderer = new PanelRenderer(this.panels, this, viewportSize)
  }

  add (caption: string, rect: Rect | Size, options?: DragPanelOptions) {
    const panel = new DragPanel(caption, rect, options)
    this.panels.push(panel)
  
    return panel
  }
  
  input (ev: GameEvent, owner: { cursor: string }) {
    for (let i = this.panels.length - 1; i >= 0; i--) {
      const panel = this.panels[i]
          const br = panel.fullRect.bottomRight
      
          if (ev.type === 'MOUSEDOWN') {
            panel.active = panel.headerRect.containsPoint(ev.pos)
            this.selected = panel.fullRect.containsPoint(ev.pos) ? panel : null
            
            
            if (br.inRadius(ev.pos, 10) && panel.resizable) {
              panel.canDoResizing = true
            }

            if (this.selected) {
              this.needRedraw = true
            }

            if (panel.active || this.selected) {
              this.bringToTop(panel)
              
              break
            }
          }
      
          if (ev.type === 'MOUSEMOVE') {

            const hittest =  br.inRadius(ev.pos, 10)  && panel.resizable
            owner.cursor = hittest ? 'se-resize' :'default'
      
            if (ev.lbc && panel.active) {
              panel.move(ev.shift)
              this.setUpdatePanels(panel)
            }
      
            if (ev.lbc && panel.canDoResizing) {
              panel.resize(panel.size.expand(ev.shift))
              this.setUpdatePanels(panel)
            }

            if (hittest) break
          }
      
      if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
        panel.active = false
        panel.canDoResizing = false
      }
    }
  }

  keyPressed (keys: Keys) {
    
  }

  draw (frame: Surface) {
    this.renderer.render()
    frame.blit(this.renderer.surface, this.renderer.surface.rect)
  }

  byName (name: string) {
    return this.panels.find(p => p.caption === name)
  }

  private bringToTop (panel: DragPanel) {
    removeItem(this.panels, x => x === panel)
    this.panels.push(panel)
  }

  private setUpdatePanels (panel: DragPanel) {
    this.panels.forEach(p => {
      if (p === panel) return
      if (!panel.fullRect.outline(-8).overlaps(p.fullRect.outline(-8))) return
      p.needRemake = 'full'
    })
  }

  
}