import { Surface } from "smallgame"
import { ImageObject } from "../../objects"

export function drawImage (img: ImageObject, surface: Surface) {
  surface.blit(img.image, img.image.rect)
}