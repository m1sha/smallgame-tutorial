import { GlProgram, GlSurface, Primitive2D, Surface, TexCoord, u_float, vec2 } from "smallgame"
import { GlTexture } from "smallgame/src/gl/gl-texture"

export class Effect {
  private frameCounter: number = 0
  private readonly program: GlProgram
  private readonly vertexCount: number
  private readonly texure: GlTexture
  private readonly u_time: u_float
  public readonly surface: GlSurface
  
  constructor (public readonly width: number, public readonly height: number, fragmnet: string, vertex: string) {
    this.surface = new GlSurface(width, height)
    this.program = this.surface.createDefaultProgram(vertex, fragmnet)
    this.texure = this.program.createTexture('u_sampler2D', new Surface(width, height))
    this.u_time = this.program.uniform('u_time', 'float')
    this.program.uniform('iResolution', 'vec2').value = [width * 1.0, height * 1.0]
    this.vertexCount = this.program
        .vbo('static', 'float', { a_Position: vec2, a_TexCoord: vec2 })
        .push(Primitive2D.rect(), TexCoord.rect())
  }

  applyEffect (surface: Surface | GlSurface) {
    this.texure.update(surface)
    this.program.clear()
    this.program.drawArrays('triangle-strip', this.vertexCount)
    this.tick()
  }

  tick () {
    this.frameCounter += 0.01
    this.u_time.value = this.frameCounter
  }
}