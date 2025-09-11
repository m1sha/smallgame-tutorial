import { killgameloop } from "smallgame"

export type BaseScriptSettings = {
  container: HTMLDivElement
  fps: HTMLDivElement
  width: number
  height: number
  useShaders: boolean
}

export class BaseScript {
  name: string = ''
  action: (settings: BaseScriptSettings) => Promise<void>

  constructor (name: string, action: (settings: BaseScriptSettings) => Promise<void>) {
    this.name = name
    this.action = action
  }

  settings: BaseScriptSettings | null = null

  async run () {
    if (this.settings) await this.action(this.settings)
  }

  stop () {
    killgameloop()
  }
}

let scriptList: BaseScript[] = []


export function createScript (name: string, action: (settings: BaseScriptSettings) => Promise<void>) {
  scriptList.push(new BaseScript(name, action))
}

export { scriptList }

