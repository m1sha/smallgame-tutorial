import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { GlSurface, Primitive2D, Surface, TexCoord, vec2, u_float, GlProgram } from 'smallgame'

export class OldTVEffectController {
  private a: any
  
  constructor (
    public readonly surface: GlSurface, 
    public readonly time: u_float, 
    public readonly vertexCount: number,
    private readonly program: GlProgram
  ) {}
  
  applyEffect (surface: Surface) {
    this.a = this.program.createTexture('u_sampler2D', surface)
    this.surface.context.clear()
    this.surface.context.drawArrays('triangle-strip', this.vertexCount)
    if (this.a) this.a.delete()
  }

  tick (iTime: number) {
    this.time.value = iTime
  }
}

export function createOldTVEffect (w: number, h: number) {
    const glSurface = new GlSurface(w, h)
    const program = glSurface.createDefaultProgram(vertex, fragmnet)
    const x = program.createTexture('u_sampler2D', new Surface(w, h))
    const u_time = program.uniform('u_time', 'float')
    
    x.delete()
      
    const vertexCount = program
        .vbo('static', 'float', { a_Position: vec2, a_TexCoord: vec2 })
        .push(Primitive2D.rect(), TexCoord.rect())

    return new OldTVEffectController(glSurface, u_time, vertexCount, program)
  }
