import { EventController, MemSurface, Size } from "smallgame"
import { Scene } from "./scene"

export abstract class GameApp {
  private _frame: MemSurface | null = null
  readonly resolution: Size
  readonly scenes: Scene[] = []
  sceneIndex = 0
  loaded = true
  onQuit: (() => void) | null = null
  
  constructor (readonly eventBus: EventController, readonly screenResolution: Size) {
    this.resolution = screenResolution
  }

  get scene () {
    return this.scenes[this.sceneIndex]
  }

  get frame () {
    if (this._frame) return this._frame
    return this._frame = new MemSurface(this.resolution)
  }

  
  update (): void {
    for (const ev of this.eventBus.event.get()) {
      this.scene.input(ev)
    }

    this.scene.keyInput(this.eventBus.key)
    
    this.scene.frameChanged(this.frame)
  }

  protected exit () { this.onQuit?.() }
}