import { EditorState } from "../editor-state"
import { DrawPolygonTool } from "./draw-polygon-shape"
import { DrawRectangleTool } from "./draw-rectangle-tool"
import { EditPolygonPointTool } from "./edit-polygon-points-tool"
import { MoveShapesTool } from "./move-shapes-tool"
import { Tool } from "./tool"
import { VectorEditorTools } from "./tool-types"

export class ToolFactory {
  constructor (private state: EditorState) {}

  create (name: VectorEditorTools): Tool {
    switch (name) {
      case 'draw-rectangle': return new DrawRectangleTool(this.state)
      case 'draw-polygon': return new DrawPolygonTool(this.state)
      case "move-shapes": return new MoveShapesTool(this.state)
      case 'edit-polygon-points': return new EditPolygonPointTool(this.state)
    }
  }
}