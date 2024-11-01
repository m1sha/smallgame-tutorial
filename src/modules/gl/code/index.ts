import { gLScriptList, type GLScript } from "./script";

import './hello-world'
import './uniform-attribute'
import './vertex-buffer'
import './vertex-buffer2'
import './texure'
import './texure2'
import './shaders-effect'
import './shaders-effect2'

export class App {
  current: GLScript
  container: HTMLDivElement | null = null
  fps: HTMLDivElement | null = null
  names: string[]
  scripts: GLScript[]

  constructor (index: number) {
    this.names = gLScriptList.map(p => p.name)
    this.scripts = gLScriptList
    this.current = this.scripts[index]
  }

  async run () {
    this.current.settings = { container: this.container!, fps: this.fps! }
    await this.current.run()
  }

  set (container: HTMLDivElement, fps: HTMLDivElement) {
    this.container = container
    this.fps = fps
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