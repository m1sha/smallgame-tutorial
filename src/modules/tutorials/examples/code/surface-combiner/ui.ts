import { TSize } from "smallgame"
import { UIBuilder } from "../../../../../components/example/code/ui"

export function createUI (canvasSize: TSize, uploadImage: (file: File) => Promise<void>) {
  const ui = new UIBuilder()
  
  ui.toolbar(toolbar => toolbar
    .upload('Upload Image', async file => await uploadImage(file), { icon: 'upload' })
    .button('Download Image', () => {}, { icon: 'download' })
  )

  ui.group('Canvas Size', group => group
    .open()
    .tracker('Width', 8, 4096, 1, val => canvasSize.width = val, canvasSize.width)
    .tracker('Height', 8, 4096, 1, val => canvasSize.height = val, canvasSize.height)
  )

  ui.group('Tools', group => group
    .open()
    .toolbar(toolbar => toolbar
      .button('Select', btn => { btn.selected = true }, { icon: 'arrow-pointer', selected: true })
      .button('Move', btn => { btn.selected = true }, { icon: 'arrows-up-down-left-right' })
      .button('Zoom In', btn => { btn.selected = true }, { icon: 'magnifying-glass-plus' })
      .button('Zoom Out', btn => { btn.selected = true }, { icon: 'magnifying-glass-minus' })
    )
  )

  return ui.build()
}