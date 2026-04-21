import { type IContextMenu } from "./context-menu"
import { IEnityList } from "./enity-list"
import { type ITelemetry } from "./telemetry"
import { type IUI } from "./ui"
import { type IViewer } from "./viewer"

export interface ScriptModule {
  dispose?: () => void
  ui?: IUI
  telemetry?: ITelemetry
  contextMenu?: IContextMenu
  viewer?: IViewer
  entities?: IEnityList
}