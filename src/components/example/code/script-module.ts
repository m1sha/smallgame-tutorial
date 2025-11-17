import { type AnyParameter } from "./parameters"
import { type IUI } from "./ui"

export interface ScriptModule {
  parameters?: AnyParameter[]
  dispose?: () => void
  ui?: IUI
}