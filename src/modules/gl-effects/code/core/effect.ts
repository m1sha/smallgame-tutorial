import { Game, gameloop, GL, GlProgram, Primitive2D, Size, TexCoord, Time, u_float, u_vec2, u_vec4, vec2 } from "smallgame"
import { displayFps } from "../../../../utils/display-fps"
import { ScriptSettings } from "../../../../components/example"

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

  constructor (private settings: ScriptSettings) {
    this.gl = new GL(new Size(settings.width, settings.height))
  }

  create (fragmnet: string) {
    this.prog = this.gl.createProgram(ver, fragmnet, 'assemble-and-use')
  
    this.time = this.gl.uniform('time', 'float')
    this.gl.uniform('iResolution', 'vec2').value = [this.settings.width * 1.0, this.settings.height * 1.0]
    this.iMouse = this.gl.uniform('iMouse', 'vec4')
    this.iMouseShift = this.gl.uniform('iMouseShift', 'vec2')
    this.iEndPos = this.gl.uniform('iEndPos', 'vec2')

    this.vertexCount = this.gl
      .vbo('static', 'float', { aPosition: vec2, a_TexCoord: vec2 })
      .push(Primitive2D.rect(), TexCoord.rect())
  }

  play () {
    const { screen, game } = Game.create(this.settings.width, this.settings.height, this.settings.container)
  
    let dTime = 0
    let wheelRotates = 0
    gameloop(() => {
      this.gl.clear(0x0)
      this.gl.drawArrays('triangle-strip', this.vertexCount)
      const s = this.gl.toSurface()
    
      screen.fill('#e9e9e9')
      screen.blit(s, s.rect)
      this.time!.value = dTime 
    
      displayFps(this.settings.fps)
      dTime += Time.deltaTime

      for (const event of game.event.get()) {
        if (event.type === 'MOUSEUP'){
          this.iEndPos!.value = [event.pos.x * 1.0, event.pos.y * 1.0]
        }
        if (event.type === 'MOUSEMOVE') {
          
          this.iMouse!.value = [event.pos.x * 1.0, event.pos.y * 1.0, event.button * 1.0, wheelRotates * 1.0]
          this.iMouseShift!.value = [event.shift.x * 1.0, event.shift.y * 1.0]
        }

        if (event.type === 'WHEEL') {
          wheelRotates += event.deltaY > 0 ? 1: -1
          this.iMouse!.value = [event.pos.x * 1.0, event.pos.y * 1.0, -1.0, wheelRotates * 1.0]
        }
      }

      
    })
  }

  dispose () {
    if (this.prog) this.prog.remove()
  }

  [Symbol.dispose]() {
    this.dispose()
    console.log('Effect Disposed')
  }
}