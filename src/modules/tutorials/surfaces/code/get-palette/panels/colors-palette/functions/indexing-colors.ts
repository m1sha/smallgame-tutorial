import { Color, GMath, Surface } from "smallgame"
import { replaceColors } from "./replace-color"

export function indexingColors (img: Surface, colors: Color[], count: number) {
  const pixels = img.pixels
  const c = indexColors(pixels.imageData, count, 0.001, (a, b) => {
    const conv = (v: number) => GMath.clamp(v / 225, 0, 1)
    const aa = new Color(conv(a.r), conv(a.g), conv(a.b)).toOklab()
    const bb = new Color(conv(b.r), conv(b.g), conv(b.b)).toOklab()
    return Math.pow(bb[0] - aa[0], 2) + Math.pow(bb[1] - aa[1], 2) + Math.pow(bb[2] - aa[2], 2)
  })
  colors.push(...c)
  return replaceColors(img, colors.map(p => p.toString()), colors.map(p => p.toOklab()), 0.1)
}



type ColorCluster =  {
  r: number
  g: number
  b: number
  weight: number
};

type ColorDistance = (a: { r: number, g: number, b: number }, b: { r: number, g: number, b: number }) => number

export function indexColors(
  imageData: ImageData,
  maxColorCount: number,
  threshold: number,
  colorDistance: ColorDistance,
): Color[] {
  if (!Number.isInteger(maxColorCount) || maxColorCount <= 0) {
    return [];
  }
  
  const bins = new Map<number, ColorCluster>();
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha === 0) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const weight = alpha / 255;

    const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    const bin = bins.get(key) ?? { r: 0, g: 0, b: 0, weight: 0 };

    bin.r += r * weight;
    bin.g += g * weight;
    bin.b += b * weight;
    bin.weight += weight;

    bins.set(key, bin);
  }

  const sourceColors = [...bins.values()]
    .map(({ r, g, b, weight }) => ({
      r: r / weight,
      g: g / weight,
      b: b / weight,
      weight,
    }))
    .sort((a, b) => b.weight - a.weight);

  const clusters: ColorCluster[] = [];

  for (const color of sourceColors) {
    let closestCluster: ColorCluster | undefined;
    let closestDistance = Infinity;

    for (const cluster of clusters) {
      const distance = colorDistance(color, cluster);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCluster = cluster;
      }
    }
    
    if (closestCluster && closestDistance <= threshold) {
      const totalWeight = closestCluster.weight + color.weight;

      closestCluster.r =
        (closestCluster.r * closestCluster.weight + color.r * color.weight) /
        totalWeight;
      closestCluster.g =
        (closestCluster.g * closestCluster.weight + color.g * color.weight) /
        totalWeight;
      closestCluster.b =
        (closestCluster.b * closestCluster.weight + color.b * color.weight) /
        totalWeight;
      closestCluster.weight = totalWeight;
    } else {
      clusters.push({ ...color });
    }
  }

  return clusters
    .sort((a, b) => b.weight - a.weight)
    .slice(0, maxColorCount)
    .map(toHex);
}

function toHex({ r, g, b }: any): Color {
  return new Color(r / 255, g / 255, b / 255)
}