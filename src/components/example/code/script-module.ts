import { AnyParameter } from "./parameters"

export interface ScriptModule {
  parameters?: AnyParameter[]
  dispose?: () => void
}