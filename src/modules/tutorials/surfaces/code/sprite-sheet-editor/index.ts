import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings, UIBuilder, TelemetryBuilder, TelemetryParameter } from "../../../../../components/example"
import { Color, loadBlob, loadImage, Point, Rect, setSize, Sketch, Surface, TPoint, TSize } from "smallgame"

type Batch = {
  start: number
  count: number
  name: string
}

class DisplayParams {
  private telemetry: TelemetryBuilder
  imageSize: TelemetryParameter<TSize>
  tileSize: TelemetryParameter<TSize>
  rowcol: TelemetryParameter<TSize>
  crowcol: TelemetryParameter<TSize>

  constructor () {
    this.telemetry = new TelemetryBuilder().open()
    this.imageSize = this.telemetry.def('Image Size', setSize(0, 0))
    this.tileSize = this.telemetry.def('Tile Size', setSize(0, 0))
    this.rowcol = this.telemetry.def('Dim', setSize(0, 0))
    this.crowcol = this.telemetry.def('cDim', setSize(0, 0))
  }

  build () { return this.telemetry.build() }
}

class Editor {
  batches: Batch[] = []
  batch: Batch = this.newBatch()
  rows: number = 0
  cols: number = 0
  tileSize: TSize = setSize(0, 0)
  imageSize: TSize = setSize(0, 0)
  image: Surface | null = null

  constructor (private viewer: Viewer, private displayParams: DisplayParams) {}

  addBatch () {
    this.batches.push(this.batch)
    this.batch = this.newBatch()
  }

  setBatchName (val: string): void {
    this.batch.name = val
  }

  setBatchCell (col: number, row: number) {
    this.displayParams.crowcol.value = setSize(col, row)
    const i = this.getIndex(col, row)
    if (this.batch.start < 0) {
      this.batch.start = i
      return
    }

    if (this.batch.start === i) {
      this.batch.start = -1
      this.batch.count = 0
      return
    }

    if (this.batch.count === 0){
      this.batch.count = i - this.batch.start
      return
    }
    
    this.batch.start = i
    this.batch.count = 0
  }

  setTileW (val: number) {
    this.tileSize.width = +val
    this.tileSize.width ? this.imageSize.width / this.tileSize.width : 0
    this.displayParams.tileSize.value = this.tileSize
  }

  setTileH (val: number) {
    this.tileSize.height = +val
    this.tileSize.height ? this.imageSize.height / this.tileSize.height : 0
    this.displayParams.tileSize.value = this.tileSize
  }

  setCols (val: number) {
    this.cols = +val; 
    this.tileSize.width = this.cols ? this.imageSize.width / this.cols : 0
    this.displayParams.rowcol.value = setSize(this.cols, this.rows)
    this.displayParams.tileSize.value = this.tileSize
  }

  setRows (val: number) {
    this.rows = +val; 
    this.tileSize.height = this.rows ? this.imageSize.height / this.rows : 0
    this.displayParams.rowcol.value = setSize(this.cols, this.rows)
    this.displayParams.tileSize.value = this.tileSize
  }

  getBatchPos () {
    const { col, row } = this.getColRow(this.batch.start)
    return new Point(col * this.tileSize.width, row * this.tileSize.height)
  }

  getBatchRects () {
    const start = this.getColRow(this.batch.start)
    const end = this.getColRow(this.batch.start + this.batch.count)
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

  async loadImage (file?: File) {
    this.image = file ? await loadBlob(file) : await loadImage('sunny/Spritesheet.png')
    this.image.rect.scalesizeSelf(2)
    this.image.rect.absCenter = this.viewer.viewportRect.center
    this.imageSize = this.image.rect.size

    this.displayParams.imageSize.value = this.imageSize
    this.setCols(6)
    this.setRows(12)
    this.displayParams.tileSize.value = this.tileSize
  }

  getCell (p: TPoint) {
    const col = 0 | ((p.x - this.image.rect.x - this.viewer.offset.x) / this.tileSize.width)
    const row = 0 | ((p.y - this.image.rect.y - this.viewer.offset.y) / this.tileSize.height)
    return { col, row}
  }
 
  private newBatch (): Batch { return { start: -1, count: 0, name: '' } }
  private getIndex = (col: number, row: number) => row * this.cols + col
  private getColRow = (index: number) => ({ row: 0 | (index / this.cols), col: (index % this.cols) })
}


export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })
  viewer.ui.setCellSize(64, 64)
  const displayParams = new DisplayParams()
  const editor = new Editor(viewer, displayParams)
  await editor.loadImage()

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      if (ev.lbc) {
        const {col, row} = editor.getCell(ev.pos)
        if (col < 0 || row < 0 || col >= editor.cols || row >= editor.rows) return
        
        editor.setBatchCell(col, row)
      }
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    if (editor.image) {
      surface.blit(editor.image, editor.image.rect.shift(viewer.offset))
      Sketch
        .new()
        .rects({ stroke: '#118822' }, Rect.size(editor.tileSize).moveSelf(editor.image.rect.shift(viewer.offset)), editor.cols, editor.rows)
        .draw(surface)

      if (editor.batch.start > -1) {
        const point = editor.getBatchPos()
        const pos = Rect.size(editor.tileSize).moveSelf(editor.image.rect.shift(viewer.offset)).shiftSelf(point)
        const c = Color.from('#11882239').lerp(Color.from('#08461169'), 0.5).toString('rgba')
        Sketch
        .new()
        .rect({ fill: c }, pos)
        .draw(surface)

        if (editor.batch.count > 0) {
          
          editor.getBatchRects().forEach(
            (r,i) => !i ? {} : Sketch.new().rect({ fill: Color.from('#11882239').lerp(Color.from('#0779bb39'), (1 / editor.batch.count) * i).toString('rgba') }, r.shift(editor.image.rect.shift(viewer.offset))).draw(surface)
          )
          
        }
      }

      
    }
    displayFps(fps)
  }

  const ui = new UIBuilder()
  ui.upload('Upload Sprite Image', async file => editor.loadImage(file))
  const panels = ui.controlMap()
  ui.select('Cut Tiles', ['Width & Height', 'Cols & Rows'], name => panels.show(name), 'Cols & Rows')
  panels.set('Width & Height', ui.panel(panel => panel
    .hide()
    .input('Width',  val => { editor.setTileW(+val) }, '0')
    .input('Height', val => { editor.setTileH(+val) }, '0')
  ))
  panels.set('Cols & Rows', ui.panel(panel => panel
    .input('Cols', val => {  editor.setCols(+val) }, '0')
    .input('Rows', val => {  editor.setRows(+val) }, '0')
  ))
  ui.group('New Batch', group => group
    .open()
    .input('name', val => editor.setBatchName(val))
    .button('Add', () => editor.addBatch())
  )
  return {
    ui: ui.build(),
    telemetry: displayParams.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
