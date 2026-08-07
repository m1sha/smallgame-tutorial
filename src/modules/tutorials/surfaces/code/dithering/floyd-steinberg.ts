import { Pixels } from "smallgame/src/utils/pixels"

export class FloydSteinberg {
  static apply (pixels: Pixels) {
    const data = pixels.imageData.data
    const lum = pixels.map(pixel => pixel.color.gray().ri)

    for (let y = 0; y < pixels.height; y++) {
      for (let x = 0; x < pixels.width; x++) {
        const i = y * pixels.width + x;
        const oldLum = lum[i]
        const newLum = oldLum < 128 ? 0 : 255
        const err = oldLum - newLum

        lum[i] = newLum

        const pIdx = i * 4
        data[pIdx] = data[pIdx + 1] = data[pIdx + 2] = newLum
        

        if (x + 1 < pixels.width) {
          lum[i + 1] += err * (7 / 16)
        }
        if (y + 1 < pixels.height) {
          if (x > 0) {
            lum[i + pixels.width - 1] += err * (3 / 16)
          }
          lum[i + pixels.width] += err * (5 / 16)
          if (x + 1 < pixels.width) {
            lum[i + pixels.width + 1] += err * (1 / 16)
          }
        }
      }
    }
  }

  
}