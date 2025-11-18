import { UIBuilder } from "../../../../../components/example/code/ui"
import { EditorState } from "./editor-state"

export function createUI (state: EditorState) {
  const ui = new UIBuilder()
  
  ui.toolbar(toolbar => toolbar
    .upload('Upload Image', async file => await state.uploadImage(file), { icon: 'upload' })
    .button('Download Image', () => {}, { icon: 'download' })
  )

  ui.group('Canvas', group => group
    .open()
    .color('Background Color', c => {}, '#b3b3b3')
    .color('Canvas Color', c => {}, '#ffffff')
    .tracker('Width', 8, 4096, 1, val => state.setCanvasWidth(val), state.canvas.rect.width)
    .tracker('Height', 8, 4096, 1, val => state.setCanvasHeight(val), state.canvas.rect.height)
  )

  ui.group('View', group => group
    .tracker('X', -10000, 10000, 1, val => state.offeset.x = val, state.offeset.x)
    .tracker('Y', -10000, 10000, 1, val => state.offeset.y = val, state.offeset.y)
    .tracker('Zoom', -8, 8, 1, val => state.zoom = val, state.zoom)
    .open()
  )

  ui.group('Tools', group => group
    .open()
    .toolbar(toolbar => toolbar
      .button('Select', btn => { btn.selected = true }, { icon: 'arrow-pointer', selected: true })
      .button('Move', btn => { btn.selected = true }, { icon: 'arrows-up-down-left-right' })
    )
  )

  ui.group('Grid', group => group
    //.open()
    .select('Show Grid', ['Yes', 'No'], val => {}, 'No')
    .tracker('Cell Width', 1, 512, 1, val => {}, 32)
    .tracker('Cell Height', 1, 512, 1, val => {}, 32)
    .select('Use Snap', ['Yes', 'No'], val => {}, 'No')
    .tracker('Snap Width', 1, 512, 1, val => {}, 32)
    .tracker('Snap Height', 1, 512, 1, val => {}, 32)
  )

  return ui.build()
}