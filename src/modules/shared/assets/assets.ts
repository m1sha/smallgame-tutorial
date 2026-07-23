import { ImageNames, img } from "./img"
import { vfx } from "./vfx"

const Assets = {
  img: (name: ImageNames) => img(name),
  vfx: vfx
}

export { Assets}