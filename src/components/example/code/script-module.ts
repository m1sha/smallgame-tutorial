import { type IContextMenu } from "./context-menu"
import { IEnityList } from "./enity-list"
import { type AnyParameter } from "./parameters"
import { type ITelemetry } from "./telemetry"
import { type IUI } from "./ui"
import { type IViewer } from "./viewer"

export interface ScriptModule {
  parameters?: AnyParameter[]
  dispose?: () => void
  ui?: IUI
  telemetry?: ITelemetry
  contextMenu?: IContextMenu
  viewer?: IViewer
  entities?: IEnityList
}