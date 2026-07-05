import { GameEvent, Keys, Rect, Size, Surface } from "smallgame";
import { IInputDelegate } from "../viewer/input-delegate";
import { DragPanel, DragPanelOptions } from "./drag-panel";
import { removeItem } from "smallgame/src/utils";

export class DragPanels implements IInputDelegate {
  private panels: DragPanel[] = []

  add (caption: string, rect: Rect | Size, options?: DragPanelOptions) {
    const panel = new DragPanel(caption, rect, options)
    this.panels.push(panel)
    panel.onSelect = p => {
      removeItem(this.panels, x => x === p)
      this.panels.push(p)
    }
    return panel
  }
  
  input (ev: GameEvent, owner: { cursor: string }) {
    this.panels.forEach(p => p.input(ev, owner))
  }

  keyPressed (keys: Keys) {
    this.panels.forEach(p => p.keyPressed(keys))
  }

  draw (surface: Surface) {
    this.panels.forEach(p => p.draw(surface))
  }
}