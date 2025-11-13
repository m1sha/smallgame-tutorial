import { GL, SurfaceBase, SurfaceGL, TSize } from "smallgame"
import { EditorState } from "../../editor-state"
import { BaseProgram, GridProgram } from "./programs"

export class Renderer {
  private surface: SurfaceGL
  private context: GL
  private programs: BaseProgram[]
  
  constructor (size: TSize) {
    this.surface = new SurfaceGL(size.width, size.height, { useOffscreen: true })
    this.context = this.surface.context
    this.programs = [ GridProgram.create(this.context) ]
  }

  render (state: EditorState): SurfaceBase {
    
    this.programs.forEach(program => {
      program.execute(state)
    })

    return this.surface
  }
}