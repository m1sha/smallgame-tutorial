import { Surface } from "smallgame"
import { BaseObject, ImageObject } from "../../objects"

export function drawImage (img: ImageObject, surface: Surface, currentObject: BaseObject | null) {
  surface.blit(img.image, img.image.rect)
}