import { Color, Surface } from "smallgame"

export function replaceColors (img: Surface, replaceColors: string[], oklabs: [number, number, number][], threshold: number) {
  const pixels = img.pixels
  const colors2 = replaceColors.map(p => Color.from(p))
  pixels.forEach(pixel => {
    if (pixel.color.a === 0) return
      
    const dists = []
    for (const okLab of oklabs) {
      const other = pixel.color.toOklab()
      const dist = Math.pow(other[0] - okLab[0], 2) + Math.pow(other[1] - okLab[1], 2) + Math.pow(other[2] - okLab[2], 2)
      dists.push(dist)
    }

    const val = Math.min.apply(null, dists)
    if (val > threshold) {
      return
    }

    const index = dists.findIndex(p => p == val)
    const c = colors2[index]
    pixel.color = c
  })

  

  const surface = new Surface(img.width, img.height)
  surface.pixels = pixels
  return surface
}