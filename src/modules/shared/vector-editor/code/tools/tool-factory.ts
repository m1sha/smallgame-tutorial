import { EditorState } from "../editor-state"
import { DrawPolygonTool } from "./draw-polygon-shape"
import { DrawRectangleTool } from "./draw-rectangle-tool"
import { MoveShapesTool } from "./move-shapes-tool"
import { SelectTool } from "./select-tool"
import { Tool } from "./tool"

export class ToolFactory {
  constructor (private state: EditorState) {}

  create (name: string): Tool {
    switch (name) {
      case 'select': return new SelectTool(this.state)
      case 'draw-rectangle': return new DrawRectangleTool(this.state)
      case 'draw-polygon': return new DrawPolygonTool(this.state)
      case "move-shapes": return new MoveShapesTool(this.state)
    }

    return new SelectTool(this.state)
  }
}