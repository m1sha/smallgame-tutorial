import { Pixels, type RGBA } from "smallgame/src/utils/pixels";


export class ColorBox {


  constructor () {

  }

  squeeze (src: ImageData, size: number): ImageData {
    const dist = new ImageData(src.width, src.height)
    const srcPixels = new Pixels(src)
    const distPixels = new Pixels(dist)
    const d = 256 / size

    const getValue = (v: number) => {
      const i = 0 | v / d
      const g1 = i * d 
      const g2 = (i + 1) * d
      return (g1 + g2) >> 1
    } 

    for (let i = 0; i < src.height; i++) {
      for (let j = 0; j < src.height; j++) {
        const [r, g, b, a] = srcPixels.getPixel(j, i)
        distPixels.setPixel(j, i, [getValue(r), getValue(g), getValue(b), a])
        //this.space.add(r, g, b)
      }  
    }

    return dist
  }

  uniqColors (src: ImageData) {
    const srcPixels = new Pixels(src)
    const arr: RGBA[] = []
    const exits = (c: RGBA) => arr.some(p => p[0] === c[0] && p[1] === c[1] && p[2] === c[2])
    for (let i = 0; i < src.height; i++) {
      for (let j = 0; j < src.height; j++) {
        const color = srcPixels.getPixel(j, i)
        if (exits(color)) continue
        arr.push(color)
      }
    }

    return arr
  }

  eraseColor (src: ImageData, size: number, color: RGBA) {
    const dist = new ImageData(src.width, src.height)
    const srcPixels = new Pixels(src)
    const distPixels = new Pixels(dist)

    const comp = (x: RGBA, y: RGBA) => {

      const f = (a: number, b: number) => (a - b) * (a - b)
      const r = f(x[0], y[0]) +  f(x[1], y[1]) + f(x[2], y[2])

      return r < size
    }

    for (let i = 0; i < src.height; i++) {
      for (let j = 0; j < src.height; j++) {
        const colorO = srcPixels.getPixel(j, i)
        if (comp(colorO, color))
          distPixels.setPixel(j, i, [255, 255, 255, 0])
        else
          distPixels.setPixel(j, i, colorO)
        //this.space.add(r, g, b)
      }  
    }

    return dist
  }
}