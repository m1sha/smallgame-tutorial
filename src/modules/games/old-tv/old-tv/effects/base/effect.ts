import { Primitive2D, Surface, SurfaceBase, SurfaceGL, TexCoord, u_float, vec2 } from "smallgame"
import { GlTexture } from "smallgame/src/gl/textures"

export class Effect {
  private frameCounter: number = 0
  private readonly vertexCount: number
  private readonly texure: GlTexture
  private readonly u_time: u_float
  public readonly surface: SurfaceGL
  
  constructor (public readonly width: number, public readonly height: number, fragmnet: string, vertex: string) {
    this.surface = new SurfaceGL(width, height)
    const context = this.surface.context
    context.createProgram(vertex, fragmnet, 'assemble-and-use')
    this.texure = context.createTexture('u_sampler2D', new Surface(width, height))
    this.u_time = context.uniform('u_time', 'float')
    context.uniform('iResolution', 'vec2').value = [width * 1.0, height * 1.0]
    this.vertexCount = context
        .vbo('static', 'float', { a_Position: vec2, a_TexCoord: vec2 })
        .push(Primitive2D.rect(), TexCoord.rect())
  }

  applyEffect (surface: SurfaceBase) {
    const cxt = this.surface.context
    this.texure.update(surface)
    cxt.clear(0x0)
    cxt.drawArrays('triangle-strip', this.vertexCount)
    this.tick()
  }

  tick () {
    this.frameCounter += 0.01
    this.u_time.value = this.frameCounter
  }
}