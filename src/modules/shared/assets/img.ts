import { loadImage } from "smallgame"

export type ImageNames = 
| 'green-mountains_612x384_61K.jpg'
| 'lake_1280x720_264K.jpg'
| 'bedstead_192x320_8K.png'
| 'tritubebuilding_640x960_120K.jpg'
| 'cyan-sea_3948x5272_4M.jpg'
| 'pattern-metropolitan_640x840_180K.jpg'
| 'platformer-screenshot_1693x974_422K.jpg'
| 'space_4991x3469_3M.jpg'
| 'Xbox-Controller-PNG_458x281_44K.png'
| 'solder-1_221x42_12K.png'

export async function img (name: ImageNames) {
  return await loadImage('img/' + name)
}