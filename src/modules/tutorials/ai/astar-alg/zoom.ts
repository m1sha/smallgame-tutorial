import { GMath } from "smallgame"

export class Zoom {
  zoomSteps = 10          
  minZoom = 0.25
  maxZoom = 4
  zoomStep = 5
  

  constructor (public objOriginSize = 16) {

  }

  get value () { return 0 | (this.objOriginSize * GMath.logZoom(this.zoomStep, this.zoomSteps, this.minZoom, this.maxZoom)) }

  inc () {
    if (this.zoomStep < 10) this.zoomStep += 1
  }

  dec () {
    if (this.zoomStep > 0) this.zoomStep -= 1
  }
}