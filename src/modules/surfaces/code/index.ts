import { scriptList, type BaseScript } from "./script"
import './scripts'

export class App {
  container: HTMLDivElement | null = null
  fps: HTMLDivElement | null = null
  width: number = 0
  height: number = 0
  names: string[] = []
  scripts: BaseScript[]
  current: BaseScript

  constructor (index: number) {
    this.names = scriptList.map(p => p.name)
    this.scripts = scriptList
    this.current = this.scripts[index]
  }

  set (container: HTMLDivElement, fps: HTMLDivElement, w: number, h: number) {
    this.container = container
    this.fps = fps
    this.width = w
    this.height = h
    
  }

  async run () {
    this.current.settings = { container: this.container!, fps: this.fps!, width: this.width, height: this.height, useShaders: true }
    await this.current.run()
  }

  change (name: string) {
    this.current.stop()
    
    while(true) {
      const child = this.container!.children[0]
      if (!child) break
      this.container!.removeChild(child)
    }

    return this.scripts.findIndex(p => p.name === name)
  }

  dispose () {
    this.current.stop()
  }
}