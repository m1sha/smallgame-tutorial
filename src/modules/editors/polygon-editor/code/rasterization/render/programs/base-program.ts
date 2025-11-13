import { GL, GlProgram } from "smallgame"
import { EditorState } from "../../../editor-state"

export abstract class BaseProgram {
  private _glProgram: GlProgram | null = null
  
  constructor(protected gl: GL) {
   
  }
  
  protected abstract get fss (): string
  protected abstract get vss (): string

  protected get program () {
    if (this._glProgram) return this._glProgram
    return this._glProgram = this.gl.createProgram(this.vss, this.fss, 'assemble')
  }

  abstract create (): void
  abstract execute (state: EditorState): void
}