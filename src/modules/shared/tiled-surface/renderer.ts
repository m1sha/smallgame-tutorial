import { GL, GlProgram, MatrixUtils, MemSurface, Point, Rect, Size, Sketch, Surface, SurfaceGL, vec2 } from "smallgame"
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import { ITileMap } from "./tile-map"

export class Renderer {
  private gl: GL
  readonly surface: Surface
  readonly gridSurface: Surface
  private readonly glSurface: SurfaceGL
  private programm: GlProgram
  tileSheet: Surface
  //tileSize = new Point(16, 16)
  private vertexCount = 0
  private instanceCount = 0
  private vao: { use: (callback: () => void) => void }

  constructor (private containerSize: Size, readonly tileSize: Size, private zoom: number, private offset: Point) {
    this.gl = new GL(this.containerSize)
    this.glSurface = this.gl.toSurface()
    this.programm = this.gl.createProgram(vertex, fragmnet, 'assemble-and-use')
    this.surface = new MemSurface(this.containerSize)
    this.gridSurface = new MemSurface(this.containerSize)
    this.drawGrid()
  }

  data (map: ITileMap) {
    const rect = Rect.size(this.tileSize.scale(this.zoom))
    
    
    const shift = Point.zero
    const gap = 1
    const getTile = (col: number, row: number) => new Point(col * this.tileSize.width, row * this.tileSize.height).shiftYSelf(this.tileSize.height).uv(this.tileSheet.rect).arr()
      
    const tilesPositions = []
    const tiles = []
    for (let i = 0; i < map.rows; i ++) {
      for (let j = 0; j < map.cols; j ++) {
        tilesPositions.push(...[shift.x + j * rect.width + j * gap, shift.y + i * rect.height + i * gap,])
        const [row, col] = this.getRowCol(j, i, map)
        tiles.push(...getTile(col, row))
      }  
    }
    
    this.vao = this.gl.createVAO()
    this.vertexCount = 0
    this.instanceCount = 0
      
    this.gl.createTexture('uSampler', this.tileSheet, { minMag: 'nearest' })
    this.gl.uniform('uResolution', 'vec2').value = [this.containerSize.width, this.containerSize.height]
    this.gl.uniform('uProj', 'mat3').value = MatrixUtils.ortho2D(0, this.containerSize.width, this.containerSize.height, 0) as any
    this.gl.uniform('uTileSize', 'vec2').value = this.tileSize.toPoint().uv(this.tileSheet.rect).arr()
    
    this.vao.use(() => {
      this.vertexCount = this.gl.pabo('aPos', vec2)
        .push(rect.triangles())
    
      this.instanceCount = this.gl.pabo('aShift', vec2)
        .div(1)
        .push(tilesPositions)
        
      this.gl.pabo('aTexCoord', vec2)
        .div(1)
        .push(tiles)
    })
  }
  
  render () {
    this.programm.use(() => {
      this.vao.use(() => {
        this.gl.clear(0x0)
        this.gl.drawArraysInstanced('triangle-strip', 0, this.vertexCount, this.instanceCount)
      })
    })

    this.surface.blit(this.glSurface, this.glSurface.rect)
    this.surface.blit(this.gridSurface, this.gridSurface.rect)
  }

  private drawGrid () {
    const sk = new Sketch()
    sk.defineStyle('line', {  stroke: '#555555'})
    const tileSize = this.tileSize.scale(this.zoom)
    const rows = this.containerSize.height / (tileSize.height)
    const cols = this.containerSize.width / (tileSize.width)

    for (let i = 0; i < rows; i++) {
      sk.hline('line', new Point(0, i * tileSize.height), this.containerSize.width)
    }

    for (let j = 0; j < cols; j++) {
      sk.vline('line', new Point(j * tileSize.width, 0), this.containerSize.height)
    }

    sk.rect('line', Rect.size(this.containerSize).outline(1))

    sk.draw(this.gridSurface)
  }

  private getRowCol (j: number, i: number, map: ITileMap): [number, number] {
    const tsCols = this.tileSheet.width / this.tileSize.width
    //const tsRows = this.tileSheet.height / this.tileSize.y
    const index = map.data[i * map.cols + j]
    let row = 0 | (index / tsCols);
    let col = index % tsCols;
    return [row, col]
  }
}