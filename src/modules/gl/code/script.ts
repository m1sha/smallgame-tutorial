import { killgameloop } from "smallgame";

export type GLScriptSettings = {
  container: HTMLDivElement
  fps: HTMLDivElement
}

export class GLScript {
  name: string = ''
  action: (settings: GLScriptSettings) => Promise<void>

  constructor (name: string, action: (settings: GLScriptSettings) => Promise<void>) {
    this.name = name
    this.action = action
  }

  settings: GLScriptSettings | null = null

  async run () {
    if (this.settings) await this.action(this.settings)
  }

  stop () {
    killgameloop()
  }
}

let gLScriptList: GLScript[] = []


export function createGLScript (name: string, action: (settings: GLScriptSettings) => Promise<void>) {
  gLScriptList.push(new GLScript(name, action))
}

export { gLScriptList }

