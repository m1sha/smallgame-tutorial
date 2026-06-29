import { ScriptModule } from "./script-module"

export interface ScriptDef {
  name: string
  category: string
  subCategory?: string
  module: (state: any) => Promise<ScriptModule | void>
  codeDir: string
}