import {  Surface } from 'smallgame'

export function createBg(width: number, height: number) {
  const backgroundImage = new Surface(width, height)
  backgroundImage.draw.beginPath()
  backgroundImage.draw.fillStyle = '#555'

  let i = 0, j = 0
  const size = 12
  let odd = true

  while (true) {
    j = odd ? 0 : size
    odd = !odd
    while (true) {
      backgroundImage.draw.rect(j, i, size, size)
      j += size * 2
      if (j > width) break
    }
    i += size 
    if (i > height) break
  }
      
  backgroundImage.draw.fill()
  return backgroundImage
}