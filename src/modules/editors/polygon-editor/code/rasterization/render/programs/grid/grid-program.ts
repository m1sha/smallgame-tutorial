import { GL, Primitive2D, TexCoord, vec2 } from "smallgame"
import { EditorState } from "../../../../editor-state"
import { BaseProgram } from "../base-program"
import fs from "./shaders/fs"
import { GlVertexArrayObject } from "smallgame/src/gl/gl-vertex-array-object"
//import vs from "./shaders/vs"

const vs = /*glsl*/`
in vec4 aPosition;
in  vec2 a_TexCoord;
out vec2 v_TexCoord;
out vec4 vPosition;

void main()
{
  v_TexCoord = a_TexCoord;
  gl_Position = aPosition;
}
`

export class GridProgram extends BaseProgram {
  protected get fss(): string { return fs }
  protected get vss(): string { return vs }

  private vao: GlVertexArrayObject | null = null

  create (): void {
    const program = this.program
    const gl = this.gl

    program.use(() => {
      this.vao = gl.vao('static', 'float', { aPosition: vec2, a_TexCoord: vec2 }, Primitive2D.rect(), TexCoord.rect())
      gl.uniform('iResolution', 'vec2').value = [this.gl.canvas.width, this.gl.canvas.height]
    })
  }

  execute (state: EditorState): void {
    const program = this.program

    program.use(() => {
      this.vao!.use(() => {
        this.gl.drawArrays('triangle-strip', this.vao!.vertexCount)
      })
    })
  }

  static create (gl: GL) {
    const result = new GridProgram(gl)
    result.create()
    return result
  }
}