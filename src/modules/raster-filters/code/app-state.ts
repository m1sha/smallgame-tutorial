
import {  Surface } from 'smallgame'

class AppState {
  file: File | string = 'mag.jpg'
  sourceImage: Surface | null = null
  workImage: Surface | null = null
  setWorkImage() {
    return this.workImage = this.sourceImage?.clone() ?? null
  }

  applyFilter () {
    this.sourceImage = this.workImage?.clone() ?? null
  }
}


export default new AppState()