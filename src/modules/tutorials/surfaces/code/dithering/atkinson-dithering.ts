import { Color, GMath } from "smallgame";
import { Pixels } from "smallgame/src/utils/pixels"

export class AtkinsonDithering {
   private static x=5
   private static readonly weights = [
        { x: 1, y: 0, weight: 1 / this.x },
        { x: 2, y: 0, weight: 1 / this.x },
        { x: -1, y: 1, weight: 1 / this.x },
        { x: 0, y: 1, weight: 1 / this.x },
        { x: 1, y: 1, weight: 1 / this.x },
    ];

  static apply (pixels: Pixels) {
    const binaryPalette = (color: Color): Color => {
      const luminance = color.luminance() // 0.299 * color.r + 0.587 * color.g + 0.114 * color.b
      const val = luminance > 0.5 ? 1 : 0
      return new Color(val, val, val, 1)
    }

   for (let y = 0; y < pixels.height; y++) {
    for (let x = 0; x < pixels.width; x++) {
      const pixel = pixels.getPixel(x, y);
      if (!pixel) continue;
        
      const old = pixel.color.dup()
      const newColor = binaryPalette(pixel.color)
      pixel.color = newColor
      const errR = old.r - newColor.r 
      const errG = old.g - newColor.g
      const errB = old.b - newColor.b
      this.weights.forEach(w => {
        const nx = x + w.x
        const ny = y + w.y
        if (nx >= 0 && nx < pixels.width && ny >= 0 && ny < pixels.height) {
          const neighbor = pixels.getPixel(nx, ny);
          if (neighbor) {
            neighbor.color = new Color(
              GMath.clamp((neighbor.color.r + errR * w.weight), 0, 1) , 
               GMath.clamp((neighbor.color.g + errG * w.weight), 0, 1), 
               GMath.clamp((neighbor.color.b  +errB * w.weight), 0, 1), 
              1)
          }
        }
      })

        
      }
    }
  }
}