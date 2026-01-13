import { Color, MemSurface, Point, Rect, setSize, Sketch, Surface, TSize } from "smallgame"
import { DrawableObject } from "../core/drawable-object"
import { DisplaySpriteSheetObject } from "./sprite-sheet-display-object"
export type Batch = { name: string, start: number, count: number }
const emptyBatch  = (): Batch => ({ name: '', start: -1, count: 0 })
export class SpriteSheetObject extends DrawableObject {
  cols: number = 0
  rows: number = 0
  batch: Batch = emptyBatch()
  batches: Batch[] = []

  constructor (private image: Surface, viewportSize: TSize, private name: string) {
    super ()
    this.surface = new MemSurface(image.rect.size)
    this.rect = this.surface.rect
    this.rect.absCenter = Rect.size(viewportSize).center
  }

  setGrid (cols: number, rows: number) {
    this.cols = cols; this.rows = rows
  }

  get tileSize (): TSize {
    const rect = this.rect.scale(this.zoom, 'center-center')
    return setSize(0 | (rect.width / this.cols), 0 | (rect.height / this.rows))
  }

  selectCell (pos: Point) {
    const point = pos.shift(this.rect.scale(this.zoom, 'center-center').topLeft.neg()).scale(1 / this.tileSize.width, 1 / this.tileSize.height).int()
    if (point.x < 0 || point.x >= this.cols || point.y < 0 || point.y >= this.rows) return

    const index = this.cols * point.y + point.x

    if (this.batch.start < 0) {
      this.batch.start = index
      return
    }

    if (this.batch.start === index) {
      this.batch.start = -1
      this.batch.count = 0
      return
    }

    if (this.batch.count === 0){
      this.batch.count = index - this.batch.start
      return
    }
    
    this.batch.start = index
    this.batch.count = 0
  }

  draw (screen: Surface) {
    const rect = this.rect.scale(this.zoom, 'center-center')
    screen.blit(this.image, rect)

     if (this.cols && this.rows)
       Sketch
         .new()
         .rects({ stroke: '#089436ff'}, Rect.size(this.tileSize).move(rect), this.cols, this.rows)
         .draw(screen)

      if (this.batch.start > -1) {

      }

      if (this.batch.start > -1) {
        const point = this.getBatchPos()
        const pos = Rect.size(this.tileSize).moveSelf(rect)
        const r = pos.shiftSelf(point)
        const c = Color.from('#11882239').lerp(Color.from('#08461169'), 0.5).toString('rgba')
        
        Sketch
          .new()
          .rect({ fill: c }, r)
          .draw(screen)

        if (this.batch.count > 0) { 
            this.getBatchRects(this.batch).forEach((r,i) => {
              if (!i) return
              const c = Color.from('#11882239').lerp(Color.from('#0779bb39'), (1 / this.batch.count) * i).toString('rgba')
              const pos0 = Rect.size(this.tileSize).moveSelf(rect)
              const r2 = pos0.shiftSelf(r)
              Sketch
                .new()
                .rect({ fill: c }, r2)
                .draw(screen)
            })
        }
      }

      for (const batch of this.batches) {
        const rects = this.getBatchRects(batch)
       
        rects.forEach((r,i) => {
              const c = Color.from('#b36c0339').lerp(Color.from('#814e0139'), (1 / batch.count) * i).toString('rgba')
              const pos0 = Rect.size(this.tileSize).moveSelf(rect)
              const r2 = pos0.shiftSelf(r)
              Sketch
                .new()
                .rect({ fill: c, stroke: '#814e01ff' }, r2)
                .draw(screen)
            })

          Sketch
                 .new()
                 .rect({ stroke: '#dda147ff', lineWidth: 1 }, Rect.merge(rects).shift(rect))
                 .draw(screen)
      }
  }

  toDisplay (): DisplaySpriteSheetObject {
    return {
      type: 'sprite-sheet-object',
      id: this.id,
      name: this.name,
      rect: this.rect.clone(),
      tileSize: setSize(this.image.rect.width / this.cols, this.image.rect.height / this.rows),
      cols: this.cols,
      rows: this.rows,
      batches: this.batches,
      batch: this.batch,
      playingBatchIndex: -1
    }
  }

  addBatch() {
    this.batches.push(this.batch)
    this.batch = emptyBatch()
  }

  private getBatchPos () {
    const { col, row } = this.getColRow(this.batch.start)
    return new Point(col * this.tileSize.width, row * this.tileSize.height)
  }

  private getBatchRects (batch: Batch) {
    const start = this.getColRow(batch.start)
    const end = this.getColRow(batch.start + batch.count)
    const result: Rect[] = []
    for (let i = start.row - 1; i < end.row ; i++) {
      for (let j = start.col - 1; j < end.col; j++) {
        result.push(
          Rect.size(this.tileSize).moveSelf(new Point((j + 1) * this.tileSize.width, (i + 1) * this.tileSize.height))
        )
      } 
    }
    return result
  }

  private getColRow = (index: number) => ({ row: 0 | (index / this.cols), col: (index % this.cols) })
}