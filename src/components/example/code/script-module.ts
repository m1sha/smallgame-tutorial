import { type AnyParameter } from "./parameters"
import { type ITelemetry } from "./telemetry"
import { type IUI } from "./ui"

export interface ScriptModule {
  parameters?: AnyParameter[]
  dispose?: () => void
  ui?: IUI
  telemetry?: ITelemetry
}