import { GL, SurfaceBase, SurfaceGL, TSize } from "smallgame"
import { EditorState } from "../../editor-state"

export class Renderer {
  private surface: SurfaceGL
  private context: GL
  constructor (size: TSize) {
    this.surface = new SurfaceGL(size.width, size.height, { useOffscreen: true })
    this.context = this.surface.context
  }

  render (state: EditorState): SurfaceBase {
    
    //surface.

    return this.surface
  }
}