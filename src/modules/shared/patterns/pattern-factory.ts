import { loadImage } from "smallgame"

export type PatternNames = 'chess-tex.jpg' | 'cross-4-dec-tex.bmp' | 'cross-dec-tex.bmp' | 'cross-dec-tex-light.bmp'

export async function createPattern (name: PatternNames, repetition: "repeat" | "repeat-x" | "repeat-y" | "no-repeat") {
  const image = await loadImage('/patterns/' + name, { useSmooth: false })
  const pattern = image.toPattern(repetition)
  return {
    image, pattern
  }
}