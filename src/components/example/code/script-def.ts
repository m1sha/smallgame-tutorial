import { ScriptModule } from "./script-module"

export interface ScriptDef {
  name: string
  category: string
  module: (state: any) => Promise<ScriptModule>
}