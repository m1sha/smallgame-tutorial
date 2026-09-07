import { uuidv4 } from "../../../utils"

export abstract class Plugin {
  id: string = uuidv4()
  title: string

  workspace: any
  panels: any[]
}