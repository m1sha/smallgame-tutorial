import { Pixels, RGBA } from "smallgame/src/utils/pixels";

function luminance(color: RGBA): number {
  return (
    0.2126 * color[0] +
    0.7152 * color[1] +
    0.0722 * color[2]
  );
}

export class BlueNoiseGray {

   static noise: Pixels
   static palette: number[]


  static apply (pixels: Pixels) { 
    const data = pixels.imageData.data

     const sortedPalette = [...this.palette].sort((a, b) => a - b);
    //const out = new Uint8Array(data.length);

  for (let y = 0; y < pixels.height; y++) {
    for (let x = 0; x < pixels.width; x++) {
      const index = y * pixels.width + x;
      const value = data[index * 4]//luminance([data[index * 4] ,  data[(index * 4) + 1] , data[(index * 4) + 2], 255]) //(data[index * 4] +  data[(index * 4) + 1] + data[(index * 4) + 2]) / 3;

      let lowerIndex = 0;

      while (
        lowerIndex < sortedPalette.length - 2 &&
        value >= sortedPalette[lowerIndex + 1]
      ) {
        lowerIndex++;
      }

      const lower = sortedPalette[lowerIndex];
      const upper = sortedPalette[lowerIndex + 1];

      let result: number;

      if (value <= sortedPalette[0]) {
        result = sortedPalette[0];
      } else if (value >= sortedPalette[sortedPalette.length - 1]) {
        result = sortedPalette[sortedPalette.length - 1];
      } else {
        const amount = (value - lower) / (upper - lower);

        const noiseX = x % this.noise.width;
        const noiseY = y % this.noise.height;
        const threshold = this.noise.imageData.data[noiseY * this.noise.width + noiseX] / 255;

        result = amount >= threshold ? upper : lower;
      }

      data[index * 4] = clamp(Math.round(result), 0, 255);
      data[(index * 4) + 1] = clamp(Math.round(result), 0, 255);
      data[(index * 4) + 2] = clamp(Math.round(result), 0, 255);
    }
  }

 //  const size = pixels.width * pixels.height;
 //  for (let i = 0; i < size; i++) {
 // const idx = i * 4
 // pixels.imageData.data[idx] = out[idx]
 // pixels.imageData.data[idx + 1] = out[idx + 1]
 // pixels.imageData.data[idx+ 2] = out[idx + 2]
 //}

  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
