import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings, UIBuilder } from "../../../../../components/example"
import { NumericTable } from "smallgame/src/utils"
import { MemSurface, Point, Rect, Size, Sketch, Text } from "smallgame"

export default async ({ container, containerSize, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  let columnCount = 8
  let rowCount = 8
  const defaultValue = -1
  let cellSize = 48
  let gap = 4

  const table = new NumericTable(rowCount, columnCount, defaultValue, 'i8')
  let tableSurface: MemSurface | null = null


  const defaultFill = () => {
    //table.cell(0, 0, 1)
    //table.cell(0, 1, 2)
    //table.cell(1, 1, 1)

    table.cell(2, 3, 2)
    table.cell(3, 3, 2)
    table.cell(4, 3, 3)
    table.cell(5, 3, 2)
    table.cell(6, 3, 2)

    table.cell(4, 1, 2)
    table.cell(4, 2, 2)
    table.cell(4, 4, 2)
    table.cell(4, 5, 2)
    table.cell(4, 6, 2)
    table.cell(4, 7, 1)


    table.set(
      0, 5,
      [
        -1, 1, -1,
        1,  2,  1,
        -1, 1, -1
      ], 
      3, 3
    )
  }

  const drawTable = () => {
    const s = cellSize + gap
    const surface = new MemSurface(new Size(s * table.cols + 1, s * table.rows + 1))
    
    const sketch = Sketch.new()
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        const rect = Rect.size(cellSize, cellSize).moveSelf(j * s + 1, i * s + 1)

        const val = table.cell(i, j)
        let fillColor = '#2d4743'
        if (val == 1) fillColor = '#18344e'
        if (val == 2) fillColor = '#585021'
        if (val == 3) fillColor = '#552847'

        
        sketch.roundedrect({ fill: fillColor }, rect, 8)
        sketch.line({ stroke: '#286855', lineWidth: 2 }, rect.bottomLeft, rect.topRight)
        
      }  
    }
    sketch.draw(surface)

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        const rect = Rect.size(cellSize, cellSize).moveSelf(j * s, i * s)
        const indexText = new Text(table.getIndex(i, j) + '', { fontSize: '14px', color: '#ac4c4c', bold: '600', fontName: 'Bedstead' })
        indexText.pos = new Point(rect.x + 4, rect.y + 4)
        indexText.draw(surface)

        const valueText = new Text(table.cell(i, j) + '', { fontSize: '16px', color: '#5987ad', bold: '600', fontName: 'Bedstead' })
        valueText.pos = new Point(rect.bottomRight.x - 24, rect.bottomRight.y - 20)
        valueText.draw(surface)
      }  
    }

    if (tableSurface) tableSurface.clear()

    tableSurface = surface
    tableSurface.rect.absCenter = Rect.size(containerSize).center
  }

  defaultFill()
  drawTable()

  viewer.onFrameChanged = surface => {
    surface.clear()

    if (tableSurface) {
      surface.blit(tableSurface, tableSurface.rect)
    }
    displayFps(fps)
  }

  //----------- UI
  const ui = new UIBuilder()
  let val = 0
  let col = 0
  let row = 0
  ui.group('Set Value', gr => gr
    .open()
    .input('Row', v => row = +v, row + '')
    .input('Col', v => col = +v, col + '')
    .input('Value', v => val = +v, '')
    .button('Set', () => { 
      table.cell(row, col, val)
      debugger
      drawTable()
    })
  )
  //----------- Append
  let rows = 1
  ui.group('Append Rows', gr => gr
    //.open()
    .input('Row', v => rows = +v, rows + '')
    .button('Add', () => { 
      table.appendRows(rows, defaultValue)
      rowCount = table.rows
      drawTable()
    })
  )

  let cols = 1
  ui.group('Append Cols', gr => gr
    //.open()
    .input('Cols', v => cols = +v, cols + '')
    .button('Add', () => { 
      table.appendColumns(cols, defaultValue)
      columnCount = table.cols
      drawTable()
    })
  )
  //---------- Insert
  let insertRows = 1
  let insertRowStart = 1
  let inserDefVal = -1
  ui.group('Insert Rows', gr => gr
    //.open()
    .input('Start', v => insertRowStart = +v, insertRowStart + '')
    .input('Rows', v => insertRows = +v, insertRows + '')
    .input('Default Value', v => inserDefVal = +v, inserDefVal + '')
    .button('Insert', () => { 
      table.insertRows(insertRowStart, insertRows, inserDefVal)
      rowCount = table.rows
      drawTable()
    })
  )

  let insertCols = 1
  let insertColStart = 1
  ui.group('Insert Cols', gr => gr
    //.open()
    .input('Start', v => insertColStart = +v, insertColStart + '')
    .input('Cols', v => insertCols = +v, insertCols + '')
    .button('Insert', () => { 
      debugger
      table.insertColumns(insertColStart, insertCols, 3)
      columnCount = table.cols
      drawTable()
    })
  )
  //---------- Delete
  let delRows = 1
  let delRowStart = 0
  ui.group('Remove Rows', gr => gr
    //.open()
    .input('Start', v => delRowStart = +v, delRowStart + '')
    .input('Rows', v => delRows = +v, delRows + '')
    .button('Delete', () => { 
      table.deleteRows(delRowStart, delRows)
      //table.deleteLastRows(delRows)
      rowCount = table.rows
      drawTable()
    })
  )

  let delCols = 1
  let delColStart = 0
  ui.group('Remove Cols', gr => gr
    //.open()
    .input('Start', v => delColStart = +v, delColStart + '')
    .input('Cols', v => delCols = +v, delCols + '')
    .button('Delete', () => { 
      table.deleteColumns(delColStart, delCols)
      //table.deleteLastColumns(delCols)
      columnCount = table.cols
      drawTable()
    })
  )

  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
