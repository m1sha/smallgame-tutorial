import { Screen, GL, GlProgram, Primitive2D, Size, TexCoord, Time, u_float, u_vec2, u_vec4, vec2, GameEvent, TSize } from "smallgame"

const ver = /*glsl*/`
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

export class Effect {
  readonly gl: GL
  private prog: GlProgram | null = null
  private time: u_float | null = null
  private iMouse: u_vec4 | null = null
  private iMouseShift: u_vec2 | null = null
  private iEndPos: u_vec2 | null = null
  private vertexCount = 0

  private dTime = 0
  private wheelRotates = 0

  constructor (private viewportSize: TSize) {
    this.gl = new GL(new Size(viewportSize.width, viewportSize.height))
  }

  create (fragmnet: string) {
    this.prog = this.gl.createProgram(ver, fragmnet, 'assemble-and-use')
  
    this.time = this.gl.uniform('time', 'float')
    this.gl.uniform('iResolution', 'vec2').value = [this.viewportSize.width * 1.0, this.viewportSize.height * 1.0]
    this.iMouse = this.gl.uniform('iMouse', 'vec4')
    this.iMouseShift = this.gl.uniform('iMouseShift', 'vec2')
    this.iEndPos = this.gl.uniform('iEndPos', 'vec2')

    this.vertexCount = this.gl
      .vbo('static', 'float', { aPosition: vec2, a_TexCoord: vec2 })
      .push(Primitive2D.rect(), TexCoord.rect())
  }

  tick (screen: Screen) {
    this.gl.clear(0x111111f0)
    this.gl.drawArrays('triangle-strip', this.vertexCount)
    const s = this.gl.toSurface()
    
    screen.fill('#111')
    screen.blit(s, s.rect)
    this.time!.value = this.dTime 
    this.dTime += Time.deltaTime
  }

  input (event: GameEvent) {
      if (event.type === 'MOUSEUP'){
        this.iEndPos!.value = [event.pos.x * 1.0, event.pos.y * 1.0]
      }
      if (event.type === 'MOUSEMOVE') {
        this.iMouse!.value = [event.pos.x * 1.0, event.pos.y * 1.0, event.button * 1.0, this.wheelRotates * 1.0]
        this.iMouseShift!.value = [event.shift.x * 1.0, event.shift.y * 1.0]
      }
      if (event.type === 'WHEEL') {
        this.wheelRotates += event.deltaY > 0 ? 1: -1
        this.iMouse!.value = [event.pos.x * 1.0, event.pos.y * 1.0, -1.0, this.wheelRotates * 1.0]
      }
  }

  dispose () {
    if (this.prog) this.prog.remove()
  }

  [Symbol.dispose]() {
    this.dispose()
  }
}