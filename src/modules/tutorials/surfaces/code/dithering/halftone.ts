import { Pixels } from "smallgame/src/utils/pixels"

export interface HalftoneOptions {
  cellSize?: number;
  dotColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  contrast?: number;
  invert?: boolean;
}

export class Halftone {
  static options: HalftoneOptions = {
    cellSize: 1,
    dotColor: [20, 20, 20],
    backgroundColor: [245, 245, 245],
    contrast: 1,
    invert: false
  }

  static apply (pixels: Pixels) {
    const { cellSize, backgroundColor, invert, dotColor, contrast } = this.options

    if (cellSize < 1) {
      throw new Error('cellSize must be greater than 0');
    }

    const { width, height, data: srcData } = pixels.imageData;
    const output = new ImageData(width, height);
    const dstData = output.data;

    for (let i = 0; i < dstData.length; i += 4) {
      dstData[i] = backgroundColor[0];
      dstData[i + 1] = backgroundColor[1];
      dstData[i + 2] = backgroundColor[2];
      dstData[i + 3] = 255;
    }
for (let cellY = 0; cellY < height; cellY += cellSize) {
      for (let cellX = 0; cellX < width; cellX += cellSize) {
        
        // Определяем реальный размер ячейки (для краев изображения)
        const currentCellW = Math.min(cellSize, width - cellX);
        const currentCellH = Math.min(cellSize, height - cellY);

        let totalLuminance = 0;
        let totalAlpha = 0;
        let count = 0;

        // Считаем среднюю яркость в ячейке
        for (let y = 0; y < currentCellH; y++) {
          for (let x = 0; x < currentCellW; x++) {
            const idx = ((cellY + y) * width + (cellX + x)) * 4;
            
            // Формула яркости Rec.709
            const lum = (0.2126 * srcData[idx] + 0.7152 * srcData[idx + 1] + 0.0722 * srcData[idx + 2]) / 255;
            totalLuminance += lum;
            totalAlpha += srcData[idx + 3] / 255;
            count++;
          }
        }

        const avgLum = totalLuminance / count;
        const avgAlpha = totalAlpha / count;

        if (avgAlpha <= 0) continue;

        // Рассчитываем "темноту" (0 = белый, 1 = черный)
        let darkness = 1 - avgLum;
        if (invert) darkness = 1 - darkness;

        // Применяем контраст (смещение относительно 0.5)
        darkness = 0.5 + (darkness - 0.5) * contrast;
        darkness = Math.max(0, Math.min(1, darkness));

        // Если ячейка слишком светлая, пропускаем отрисовку точки
        if (darkness <= 0.01) continue;

        // Отрисовка
        if (cellSize === 1) {
          // Для cellSize=1 просто красим пиксель, если он достаточно темный
          if (darkness > 0.5) {
            const idx = (cellY * width + cellX) * 4;
            this.blendColor(dstData, idx, dotColor, avgAlpha);
          }
        } else {
          // Для cellSize > 1 рисуем полноценный круг
          const centerX = cellX + currentCellW / 2;
          const centerY = cellY + currentCellH / 2;
          const maxRadius = Math.min(currentCellW, currentCellH) / 2;
          const radius = Math.sqrt(darkness) * maxRadius;

          this.drawCircle(dstData, width, height, centerX, centerY, radius, dotColor, avgAlpha);
        }
      }
    }
   

   pixels.imageData.data.set(dstData)

  }

  private static drawCircle(
    data: Uint8ClampedArray, 
    width: number, 
    height: number, 
    cx: number, 
    cy: number, 
    r: number, 
    color: [number, number, number], 
    alpha: number
  ) {
    const rSq = r * r;
    const xMin = Math.max(0, Math.floor(cx - r));
    const xMax = Math.min(width - 1, Math.ceil(cx + r));
    const yMin = Math.max(0, Math.floor(cy - r));
    const yMax = Math.min(height - 1, Math.ceil(cy + r));

    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        const dx = x + 0.5 - cx;
        const dy = y + 0.5 - cy;
        if (dx * dx + dy * dy <= rSq) {
          const idx = (y * width + x) * 4;
          this.blendColor(data, idx, color, alpha);
        }
      }
    }
  }

  private static blendColor(data: Uint8ClampedArray, idx: number, color: [number, number, number], alpha: number) {
    // Линейная интерполяция между цветом точки и текущим цветом фона
    data[idx] = Math.round(color[0] * alpha + data[idx] * (1 - alpha));
    data[idx + 1] = Math.round(color[1] * alpha + data[idx + 1] * (1 - alpha));
    data[idx + 2] = Math.round(color[2] * alpha + data[idx + 2] * (1 - alpha));
    data[idx + 3] = 255;
  }
}

function drawCircle(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  centerX: number,
  centerY: number,
  radius: number,
  color: [number, number, number],
  alpha: number
): void {
  const minX = Math.max(0, Math.floor(centerX - radius));
  const maxX = Math.min(width - 1, Math.ceil(centerX + radius));
  const minY = Math.max(0, Math.floor(centerY - radius));
  const maxY = Math.min(height - 1, Math.ceil(centerY + radius));

  const radiusSquared = radius * radius;

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const dx = x + 0.5 - centerX;
      const dy = y + 0.5 - centerY;

      if (dx * dx + dy * dy <= radiusSquared) {
        const index = (y * width + x) * 4;

        const a = alpha;
        const inverseAlpha = 1 - a;
        
        data[index] = Math.round(color[0] * a + data[index] * inverseAlpha);
        data[index + 1] = Math.round(color[1] * a + data[index + 1] * inverseAlpha);
        data[index + 2] = Math.round(color[2] * a + data[index + 2] * inverseAlpha);
        data[index + 3] = 255;
      }
    }
  }
}