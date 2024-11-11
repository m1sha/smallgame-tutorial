import { gLScriptList, type GLScript } from "./script";

import './scripts'

export class App {
  current: GLScript
  container: HTMLDivElement | null = null
  fps: HTMLDivElement | null = null
  names: string[]
  scripts: GLScript[]
  width: number = 0
  height: number = 0

  constructor (index: number) {
    this.names = gLScriptList.map(p => p.name)
    this.scripts = gLScriptList
    this.current = this.scripts[index]
  }

  async run () {
    this.current.settings = { container: this.container!, fps: this.fps!, width: this.width, height: this.height }
    await this.current.run()
  }

  set (container: HTMLDivElement, fps: HTMLDivElement, w: number, h: number) {
    this.container = container
    this.fps = fps
    this.width = w
    this.height = h
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

}