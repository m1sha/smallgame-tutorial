interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Options {
  alphaThreshold?: number;
  connectivity?: 4 | 8;
  minSize?: number;
}

export function findSpriteBoundingBoxes(
  imageData: ImageData,
  options: Options = {}
): BoundingBox[] {
  const { alphaThreshold = 0, connectivity = 8, minSize = 1 } = options;
  const { width, height, data } = imageData;

  const visited = new Uint8Array(width * height);
  const boxes: BoundingBox[] = [];

  const isOpaque = (x: number, y: number): boolean => {
    const idx = (y * width + x) * 4;
    return data[idx + 3] > alphaThreshold;
  };

  const neighbors4 = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];
  const neighbors8 = [
    ...neighbors4,
    [1, 1], [1, -1], [-1, 1], [-1, -1],
  ];
  const neighbors = connectivity === 8 ? neighbors8 : neighbors4;

  const stackX = new Int32Array(width * height);
  const stackY = new Int32Array(width * height);

  for (let startY = 0; startY < height; startY++) {
    for (let startX = 0; startX < width; startX++) {
      const startIdx = startY * width + startX;

      if (visited[startIdx] || !isOpaque(startX, startY)) {
        continue;
      }
      
      let stackLen = 0;
      stackX[stackLen] = startX;
      stackY[stackLen] = startY;
      stackLen++;
      visited[startIdx] = 1;

      let minX = startX, maxX = startX;
      let minY = startY, maxY = startY;

      while (stackLen > 0) {
        stackLen--;
        const cx = stackX[stackLen];
        const cy = stackY[stackLen];

        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;

        for (const [dx, dy] of neighbors) {
          const nx = cx + dx;
          const ny = cy + dy;

          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;

          const nIdx = ny * width + nx;
          if (visited[nIdx]) continue;
          if (!isOpaque(nx, ny)) continue;

          visited[nIdx] = 1;
          stackX[stackLen] = nx;
          stackY[stackLen] = ny;
          stackLen++;
        }
      }

      const w = maxX - minX + 1;
      const h = maxY - minY + 1;

      if (w >= minSize && h >= minSize) {
        boxes.push({ x: minX, y: minY, width: w, height: h });
      }
    }
  }

  return boxes;
}


export function filterSmallBoundingBoxes(
  boxes: BoundingBox[],
  threshold: number = 10
): BoundingBox[] {
  if (boxes.length === 0) return [];

  const area = (b: BoundingBox) => b.width * b.height;
  
  const maxArea = boxes.reduce((max, b) => Math.max(max, area(b)), 0);

  if (maxArea === 0) return [];

  const minAllowedArea = maxArea * (threshold / 100);

  return boxes.filter((b) => area(b) >= minAllowedArea);
}