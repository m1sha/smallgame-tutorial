import appState from "../app-state"
import { ColorBox } from "../color-box"

export class DepletePaletteFilter {
  change (size: number) {
    
    //api.changeFilterValue = async value => {
      if (!appState.sourceImage) return
      const image = appState.setWorkImage()
      if (!image) return
  //
      const imageData = image.getPixels()
      const colorBox = new ColorBox()
       const newImageData = colorBox.squeeze(imageData, size)
    //  const newImageData = colorBox.eraseColor(imageData, value, [255, 255, 255, 0])
     image.setPixels(newImageData)
    //
    //  
  //
    ////   const colors = colorBox.uniqColors(newImageData)
    ////   pal.innerHTML = colors.map(p => foo(p)).join('')
  //
    ////   function foo (c: RGBA) {
    ////     return `<div style="width: 24px; height: 24px; background-color: rgb(${c[0]}, ${c[1]}, ${c[2]})"></div>`
    ////   }
    //}
  }

  applyFilter () {
    appState.applyFilter()
  }
}