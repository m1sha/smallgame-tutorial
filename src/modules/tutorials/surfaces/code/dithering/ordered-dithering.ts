import { Color } from "smallgame";
import { Pixels, RGBA } from "smallgame/src/utils/pixels"

export class OrderedDithering {
  static apply (pxl: Pixels) {
    const binaryPalette = (luminance: number, threshold: number):  Color => {
        const val = luminance > threshold ? 255 : 0;
        return new Color(val / 255, val / 255, val / 255)
      }
    
      const greyScalePalette = (luminance: number, threshold: number, levels: number = 5): Color => {
        const adjusted = luminance + (threshold - 0.5) * (1 / levels);
        
        // 2. Ограничиваем значение в диапазоне [0, 1]
        const clamped = Math.max(0, Math.min(1, adjusted));
        
        // 3. Квантуем: приводим к одному из N уровней
        // Например, если levels = 4, то значения будут: 0, 0.33, 0.66, 1.0
        const levelIndex = Math.round(clamped * (levels - 1));
        const finalLuminance = levelIndex / (levels - 1);
        
        // 4. Переводим обратно в 0-255
        const val = Math.round(finalLuminance * 255);
        return new Color(val / 255, val / 255, val / 255)
      }
    
     const bayerMatrix4x4 = [
            [ 0/16, 8/16, 2/16, 10/16 ],
            [ 12/16, 4/16, 14/16, 6/16 ],
            [ 3/16, 11/16, 1/16, 9/16 ],
            [ 15/16, 7/16, 13/16, 5/16 ]
        ]
    
    
  pxl.forEach(pixel => {
    const luminance = (0.299 * pixel.color.ri + 0.587 * pixel.color.gi + 0.114 * pixel.color.bi) / 255;
    const threshold = bayerMatrix4x4[pixel.y % 4][pixel.x % 4];
    const newpixel = greyScalePalette(luminance, threshold)
    // const newpixel = binaryPalette(luminance, threshold)
    pixel.color = newpixel
  })
  }
}